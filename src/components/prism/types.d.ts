import { Object3DNode } from '@react-three/fiber'
import * as THREE from 'three'

// Extend mesh props with custom ray events used by the Reflect system
declare module '@react-three/fiber' {
  interface ThreeElements {
    mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh> & {
      onRayOver?: (e: any) => void
      onRayOut?: (e: any) => void
      onRayMove?: (e: any) => void
    }
  }
}

export {}
