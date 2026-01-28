import { useRef, useMemo, useEffect, MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Vertex shader for prism
const vertexShader = `
varying vec3 vWorldNormal;
varying vec3 vViewDirection;
varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vViewDirection = normalize(cameraPosition - worldPosition.xyz);
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

// Fragment shader with rainbow dispersion effect
const fragmentShader = `
uniform vec3 uLightPosition;
uniform float uTime;
uniform vec2 uResolution;

varying vec3 vWorldNormal;
varying vec3 vViewDirection;
varying vec3 vWorldPosition;
varying vec2 vUv;

// Rainbow color function
vec3 rainbowGradient(float t) {
  vec3 c;
  if (t < 0.16667) {
    c = vec3(1.0, t * 6.0, 0.0);
  } else if (t < 0.33333) {
    c = vec3(1.0 - (t - 0.16667) * 6.0, 1.0, 0.0);
  } else if (t < 0.5) {
    c = vec3(0.0, 1.0, (t - 0.33333) * 6.0);
  } else if (t < 0.66667) {
    c = vec3(0.0, 1.0 - (t - 0.5) * 6.0, 1.0);
  } else if (t < 0.83333) {
    c = vec3((t - 0.66667) * 6.0, 0.0, 1.0);
  } else {
    c = vec3(1.0, 0.0, 1.0 - (t - 0.83333) * 6.0);
  }
  return c;
}

void main() {
  vec3 normal = normalize(vWorldNormal);
  vec3 viewDir = normalize(vViewDirection);
  vec3 lightDir = normalize(uLightPosition - vWorldPosition);
  
  // Fresnel effect
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
  
  // Light refraction calculation
  float ior = 1.45; // Index of refraction for glass-like material
  vec3 refracted = refract(-viewDir, normal, 1.0 / ior);
  
  // Calculate dispersion based on angle
  float angle = dot(lightDir, normal);
  float dispersion = abs(angle);
  
  // Rainbow effect based on position and light angle
  float rainbowT = fract(vUv.x * 2.0 + vUv.y + dispersion * 0.5 + uTime * 0.1);
  vec3 rainbow = rainbowGradient(rainbowT);
  
  // Edge glow
  float edgeGlow = pow(fresnel, 1.5) * 2.0;
  
  // Specular highlight
  vec3 halfDir = normalize(lightDir + viewDir);
  float specular = pow(max(dot(normal, halfDir), 0.0), 64.0);
  
  // Light intensity based on distance and angle
  float lightDistance = length(uLightPosition - vWorldPosition);
  float lightIntensity = 1.0 / (1.0 + lightDistance * 0.1);
  lightIntensity *= max(dot(normal, lightDir), 0.0) + 0.3;
  
  // Base color with glass-like appearance
  vec3 baseColor = vec3(0.02, 0.02, 0.05);
  
  // Combine effects
  vec3 color = baseColor;
  color += rainbow * fresnel * 0.8 * lightIntensity;
  color += vec3(edgeGlow * 0.3) * rainbow;
  color += vec3(specular) * 1.5;
  
  // Internal refraction glow
  float internalGlow = abs(dot(refracted, lightDir));
  color += rainbow * internalGlow * 0.4;
  
  gl_FragColor = vec4(color, 0.9);
}
`;

// Mouse light that follows cursor
const MouseLight = ({ lightRef }: { lightRef: MutableRefObject<THREE.Vector3> }) => {
  const { viewport } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lightRef.current) {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        lightRef.current.set(x * viewport.width * 2, y * viewport.height * 2, 5);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport, lightRef]);
  
  return null;
};

// Prism mesh with custom shader
const Prism = ({ lightPosition }: { lightPosition: THREE.Vector3 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(() => ({
    uLightPosition: { value: lightPosition },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  }), [lightPosition]);
  
  // Create prism geometry (triangular prism)
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const size = 1.2;
    // Equilateral triangle
    shape.moveTo(0, size);
    shape.lineTo(-size * 0.866, -size * 0.5);
    shape.lineTo(size * 0.866, -size * 0.5);
    shape.closePath();
    
    const extrudeSettings = {
      depth: 2.5,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uLightPosition.value.copy(lightPosition);
    }
    
    if (meshRef.current) {
      // Subtle rotation
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, -1.25]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Rainbow light rays emanating from prism
const LightRays = ({ lightPosition }: { lightPosition: THREE.Vector3 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const rays = useMemo(() => {
    const rayColors = [
      '#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'
    ];
    return rayColors.map((color, i) => ({
      color,
      angle: (i / rayColors.length) * Math.PI * 0.3 + Math.PI * 0.35,
      length: 3 + Math.random() * 2,
    }));
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle movement based on light position
      groupRef.current.rotation.z = Math.atan2(lightPosition.y, lightPosition.x) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef} position={[0.5, 0, 0]}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(ray.angle) * ray.length * 0.5 + 0.5,
            Math.sin(ray.angle) * ray.length * 0.5,
            0
          ]}
          rotation={[0, 0, ray.angle]}
        >
          <planeGeometry args={[ray.length, 0.08]} />
          <meshBasicMaterial
            color={ray.color}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

// Floating particles for ambient effect
const AmbientParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      
      // Rainbow colors
      const hue = Math.random();
      const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

// Scene content
const SceneContent = () => {
  const lightPosition = useRef(new THREE.Vector3(3, 3, 5));
  
  return (
    <>
      <MouseLight lightRef={lightPosition} />
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <Prism lightPosition={lightPosition.current} />
      <LightRays lightPosition={lightPosition.current} />
      <AmbientParticles />
    </>
  );
};

const PrismScene = () => {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
        style={{ background: '#000000' }}
      >
        <SceneContent />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
    </section>
  );
};

export default PrismScene;
