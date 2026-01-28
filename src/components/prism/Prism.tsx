import { useLoader } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { GLTFLoader } from 'three-stdlib'

interface PrismProps {
  position?: [number, number, number]
  onRayOver?: (e: any) => void
  onRayOut?: () => void
  onRayMove?: (e: any) => void
}

export function Prism({ onRayOver, onRayOut, onRayMove, ...props }: PrismProps) {
  const { nodes } = useLoader(GLTFLoader, '/gltf/prism.glb') as any
  return (
    <group {...props}>
      {/* A low-res, invisible representation of the prism that gets hit by the raycaster */}
      <mesh 
        visible={false} 
        scale={1.9} 
        rotation={[Math.PI / 2, Math.PI, 0]} 
        {...{ onRayOver, onRayOut, onRayMove } as any}
      >
        <cylinderGeometry args={[1, 1, 1, 3, 1]} />
      </mesh>
      {/* The visible hi-res prism */}
      <mesh position={[0, 0, 0.6]} renderOrder={10} scale={2} dispose={null} geometry={nodes.Cone.geometry}>
        <MeshTransmissionMaterial clearcoat={1} transmission={1} thickness={0.9} roughness={0} anisotropy={0.1} chromaticAberration={1} toneMapped={false} />
      </mesh>
    </group>
  )
}
