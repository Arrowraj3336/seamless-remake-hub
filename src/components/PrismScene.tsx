import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useFBO, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Vertex shader
const vertexShader = `
varying vec3 worldNormal;
varying vec3 eyeVector;
varying vec3 vPosition;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec4 mvPosition = viewMatrix * worldPos;
  
  gl_Position = projectionMatrix * mvPosition;
  
  eyeVector = normalize(worldPos.xyz - cameraPosition);
  
  vec3 transformedNormal = normalMatrix * normal;
  worldNormal = normalize(transformedNormal);
  
  vPosition = position;
}
`;

// Fragment shader with dispersion
const fragmentShader = `
uniform float uIorR;
uniform float uIorY;
uniform float uIorG;
uniform float uIorC;
uniform float uIorB;
uniform float uIorP;
uniform float uSaturation;
uniform float uChromaticAberration;
uniform float uRefractPower;
uniform float uShininess;
uniform float uDiffuseness;
uniform float uFresnelPower;
uniform vec3 uLight;
uniform vec2 winResolution;
uniform sampler2D uTexture;

varying vec3 worldNormal;
varying vec3 eyeVector;
varying vec3 vPosition;

vec3 sat(vec3 rgb, float adjustment) {
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  vec3 intensity = vec3(dot(rgb, W));
  return mix(intensity, rgb, adjustment);
}

float specular(vec3 light, float shininess, float diffuseness) {
  vec3 normal = worldNormal;
  vec3 lightVector = normalize(-light);
  vec3 halfVector = normalize(eyeVector + lightVector);
  
  float NdotL = dot(normal, lightVector);
  float NdotH = dot(normal, halfVector);
  float kDiffuse = max(0.0, NdotL);
  float NdotH2 = NdotH * NdotH;
  
  float kSpecular = pow(NdotH2, shininess);
  return kSpecular + kDiffuse * diffuseness;
}

float fresnel(vec3 eyeVector, vec3 worldNormal, float power) {
  float fresnelFactor = abs(dot(eyeVector, worldNormal));
  float inversefresnelFactor = 1.0 - fresnelFactor;
  return pow(inversefresnelFactor, power);
}

const int LOOP = 16;

void main() {
  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  vec3 normal = worldNormal;
  vec3 color = vec3(0.0);
  
  for (int i = 0; i < LOOP; i++) {
    float slide = float(i) / float(LOOP) * 0.1;
    
    vec3 refractVecR = refract(eyeVector, normal, 1.0/uIorR);
    vec3 refractVecY = refract(eyeVector, normal, 1.0/uIorY);
    vec3 refractVecG = refract(eyeVector, normal, 1.0/uIorG);
    vec3 refractVecC = refract(eyeVector, normal, 1.0/uIorC);
    vec3 refractVecB = refract(eyeVector, normal, 1.0/uIorB);
    vec3 refractVecP = refract(eyeVector, normal, 1.0/uIorP);
    
    float r = texture2D(uTexture, uv + refractVecR.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 0.5;
    
    float y = (texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 +
               texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y * 2.0 -
               texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z) / 6.0;
    
    float g = texture2D(uTexture, uv + refractVecG.xy * (uRefractPower + slide * 2.0) * uChromaticAberration).y * 0.5;
    
    float c = (texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).y * 2.0 +
               texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).z * 2.0 -
               texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).x) / 6.0;
    
    float b = texture2D(uTexture, uv + refractVecB.xy * (uRefractPower + slide * 3.0) * uChromaticAberration).z * 0.5;
    
    float p = (texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z * 2.0 +
               texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 -
               texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y) / 6.0;
    
    float R = r + (2.0*p + 2.0*y - c)/3.0;
    float G = g + (2.0*y + 2.0*c - p)/3.0;
    float B = b + (2.0*c + 2.0*p - y)/3.0;
    
    color.r += R;
    color.g += G;
    color.b += B;
    
    color = sat(color, uSaturation);
  }
  
  color /= float(LOOP);
  
  // Specular lighting
  float specularLight = specular(uLight, uShininess, uDiffuseness);
  color += specularLight;
  
  // Fresnel reflection
  float f = fresnel(eyeVector, worldNormal, uFresnelPower);
  color.rgb += f * vec3(0.6, 0.3, 0.8);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

// Background particles for dispersion effect
const BackgroundParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 4;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) - 5;
      
      // Rainbow colors
      const hue = Math.random();
      const color = new THREE.Color().setHSL(hue, 1, 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
};

// Light beam coming into the prism
const LightBeam = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const beamRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (beamRef.current) {
      beamRef.current.rotation.z = mousePosition.y * 0.1;
      beamRef.current.position.y = mousePosition.y * 0.3;
    }
  });
  
  return (
    <mesh ref={beamRef} position={[-4, 0, 0]} rotation={[0, 0, 0]}>
      <boxGeometry args={[3, 0.08, 0.08]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
    </mesh>
  );
};

// Rainbow beam exiting the prism
const RainbowBeam = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const rainbowRef = useRef<THREE.Group>(null);
  const rainbowColors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
  
  useFrame(() => {
    if (rainbowRef.current) {
      rainbowRef.current.rotation.z = -mousePosition.y * 0.15;
      rainbowRef.current.position.y = -mousePosition.y * 0.2;
    }
  });
  
  return (
    <group ref={rainbowRef} position={[3.5, 0, 0]}>
      {rainbowColors.map((color, index) => (
        <mesh 
          key={index} 
          position={[1.5, (index - 3) * 0.12, 0]}
          rotation={[0, 0, (index - 3) * 0.04]}
        >
          <boxGeometry args={[4, 0.06, 0.06]} />
          <meshBasicMaterial color={color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
};

// Main prism component with dispersion shader
const Prism = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const mainRenderTarget = useFBO();
  const { size } = useThree();
  
  const uniforms = useMemo(() => ({
    uTexture: { value: null },
    winResolution: {
      value: new THREE.Vector2(
        size.width,
        size.height
      ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
    },
    uIorR: { value: 1.15 },
    uIorY: { value: 1.16 },
    uIorG: { value: 1.18 },
    uIorC: { value: 1.22 },
    uIorB: { value: 1.25 },
    uIorP: { value: 1.28 },
    uRefractPower: { value: 0.3 },
    uChromaticAberration: { value: 0.5 },
    uSaturation: { value: 1.08 },
    uShininess: { value: 40.0 },
    uDiffuseness: { value: 0.2 },
    uFresnelPower: { value: 8.0 },
    uLight: { value: new THREE.Vector3(-1.0, 1.0, 1.0) },
  }), [size]);
  
  useFrame((state) => {
    const { gl, scene, camera } = state;
    
    if (!mesh.current) return;
    
    // Update light position based on mouse
    uniforms.uLight.value.set(
      -1.0 + mousePosition.x * 2,
      1.0 + mousePosition.y * 2,
      1.0
    );
    
    // Subtle rotation
    mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + mousePosition.x * 0.2;
    mesh.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05 + mousePosition.y * 0.1;
    
    // Render FBO
    mesh.current.visible = false;
    gl.setRenderTarget(mainRenderTarget);
    gl.render(scene, camera);
    
    if (mesh.current.material && 'uniforms' in mesh.current.material) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.uTexture.value = mainRenderTarget.texture;
    }
    
    gl.setRenderTarget(null);
    mesh.current.visible = true;
  });
  
  // Create triangular prism geometry
  const prismGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const size = 1.2;
    shape.moveTo(0, size);
    shape.lineTo(-size * 0.866, -size * 0.5);
    shape.lineTo(size * 0.866, -size * 0.5);
    shape.lineTo(0, size);
    
    const extrudeSettings = {
      depth: 1.5,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    };
    
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    return geometry;
  }, []);
  
  return (
    <mesh ref={mesh} geometry={prismGeometry}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

// Scene component
const Scene = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <>
      <color attach="background" args={['#050208']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#7c3aed" />
      
      <BackgroundParticles />
      <LightBeam mousePosition={mousePosition} />
      <Prism mousePosition={mousePosition} />
      <RainbowBeam mousePosition={mousePosition} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.2}
      />
    </>
  );
};

// Main component
const PrismScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050208 0%, #0a0510 100%)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
      
      {/* Gradient overlay at bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/60 text-sm font-medium tracking-wider uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default PrismScene;
