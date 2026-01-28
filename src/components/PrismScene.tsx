import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useFBO, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Vertex shader for dispersion effect
const vertexShader = `
varying vec3 worldNormal;
varying vec3 eyeVector;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec4 mvPosition = viewMatrix * worldPos;
  
  gl_Position = projectionMatrix * mvPosition;
  
  eyeVector = normalize(worldPos.xyz - cameraPosition);
  
  vec3 transformedNormal = normalMatrix * normal;
  worldNormal = normalize(transformedNormal);
}
`;

// Fragment shader with 6-channel dispersion (RYGCBV)
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
uniform float uFresnelPower;
uniform float uShininess;
uniform float uDiffuseness;
uniform vec3 uLight;
uniform vec2 winResolution;
uniform sampler2D uTexture;

varying vec3 worldNormal;
varying vec3 eyeVector;

vec3 sat(vec3 rgb, float adjustment) {
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  vec3 intensity = vec3(dot(rgb, W));
  return mix(intensity, rgb, adjustment);
}

float fresnel(vec3 eyeVector, vec3 worldNormal, float power) {
  float fresnelFactor = abs(dot(eyeVector, worldNormal));
  float inversefresnelFactor = 1.0 - fresnelFactor;
  return pow(inversefresnelFactor, power);
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
  color.rgb += f * vec3(1.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

// Background grid of icosahedrons for dispersion effect
const BackgroundGeometries = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const range = (start: number, end: number, step: number) => {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  };

  const columns = range(-7.5, 7.5, 2.5);
  const rows = range(-7.5, 7.5, 2.5);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {columns.map((col, i) =>
        rows.map((row, j) => (
          <mesh key={`${i}-${j}`} position={[col, row, -4]}>
            <icosahedronGeometry args={[0.333, 8]} />
            <meshStandardMaterial color="white" />
          </mesh>
        ))
      )}
    </group>
  );
};

// Main dispersion mesh with custom shader
const DispersionMesh = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const backMesh = useRef<THREE.Mesh>(null);
  const mainRenderTarget = useFBO();
  const backRenderTarget = useFBO();
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
    uIorB: { value: 1.22 },
    uIorP: { value: 1.22 },
    uRefractPower: { value: 0.3 },
    uChromaticAberration: { value: 1.0 },
    uSaturation: { value: 1.08 },
    uShininess: { value: 40.0 },
    uDiffuseness: { value: 0.2 },
    uFresnelPower: { value: 8.0 },
    uLight: { value: new THREE.Vector3(-1.0, 1.0, 1.0) },
  }), [size]);

  const backUniforms = useMemo(() => ({
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
    uIorB: { value: 1.22 },
    uIorP: { value: 1.22 },
    uRefractPower: { value: 0.3 },
    uChromaticAberration: { value: 1.0 },
    uSaturation: { value: 1.08 },
    uShininess: { value: 40.0 },
    uDiffuseness: { value: 0.2 },
    uFresnelPower: { value: 8.0 },
    uLight: { value: new THREE.Vector3(-1.0, 1.0, 1.0) },
  }), [size]);

  useFrame((state) => {
    const { gl, scene, camera } = state;

    if (!mesh.current || !backMesh.current) return;

    // Update light position based on mouse
    const lightX = -1.0 + mousePosition.x * 2;
    const lightY = 1.0 + mousePosition.y * 2;
    uniforms.uLight.value.set(lightX, lightY, 1.0);
    backUniforms.uLight.value.set(lightX, lightY, 1.0);

    // Subtle rotation based on mouse
    mesh.current.rotation.y = mousePosition.x * 0.5 + state.clock.elapsedTime * 0.1;
    mesh.current.rotation.x = mousePosition.y * 0.3;
    backMesh.current.rotation.copy(mesh.current.rotation);

    // Hide both meshes
    mesh.current.visible = false;
    backMesh.current.visible = false;

    // Render scene for back FBO (backside)
    gl.setRenderTarget(backRenderTarget);
    gl.render(scene, camera);

    // Show back mesh and set its texture
    backMesh.current.visible = true;
    (backMesh.current.material as THREE.ShaderMaterial).uniforms.uTexture.value = backRenderTarget.texture;

    // Render for main FBO (with backside visible)
    gl.setRenderTarget(mainRenderTarget);
    gl.render(scene, camera);

    // Hide back mesh, show front mesh
    backMesh.current.visible = false;
    mesh.current.visible = true;
    (mesh.current.material as THREE.ShaderMaterial).uniforms.uTexture.value = mainRenderTarget.texture;

    gl.setRenderTarget(null);
  });

  return (
    <>
      {/* Backside mesh */}
      <mesh ref={backMesh}>
        <icosahedronGeometry args={[2.84, 20]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={backUniforms}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Frontside mesh */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[2.84, 20]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          side={THREE.FrontSide}
        />
      </mesh>
    </>
  );
};

// Scene component
const Scene = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={1.0} />
      
      <BackgroundGeometries />
      <DispersionMesh mousePosition={mousePosition} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 2.5}
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
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
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
