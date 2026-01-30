import * as THREE from 'three'
import { useRef, useCallback, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import { Beam } from './prism/Beam'
import { Rainbow } from './prism/Rainbow'
import { Prism } from './prism/Prism'
import { Flare } from './prism/Flare'
import { Box } from './prism/Box'
import { calculateRefractionAngle, lerp, lerpV3 } from './prism/util'

function Scene() {
  const [isPrismHit, hitPrism] = useState(true) // Always true for continuous effect
  const flare = useRef<THREE.Group>(null)
  const ambient = useRef<THREE.AmbientLight>(null)
  const spot = useRef<THREE.SpotLight>(null)
  const boxreflect = useRef<any>(null)
  const rainbow = useRef<THREE.Mesh>(null)
  const showmirrors = false
  const time = useRef(0)

  // Auto-activate rainbow on mount
  useEffect(() => {
    if (rainbow.current) {
      (rainbow.current.material as any).speed = 1;
      (rainbow.current.material as any).emissiveIntensity = 2.5
    }
  }, [])

  const rayOver = useCallback((e: any) => {
    e.stopPropagation()
    hitPrism(true)
    if (rainbow.current) {
      (rainbow.current.material as any).speed = 1;
      (rainbow.current.material as any).emissiveIntensity = 20
    }
  }, [])

  const rayOut = useCallback(() => {
    // Keep it active but reduce intensity slightly
    if (rainbow.current) {
      (rainbow.current.material as any).emissiveIntensity = 2.5
    }
  }, [])

  const vec = new THREE.Vector3()
  const rayMove = useCallback(({ api, position, direction, normal }: any) => {
    if (!normal) return
    vec.toArray(api.positions, api.number++ * 3)
    if (flare.current) {
      flare.current.position.set(position.x, position.y, -0.5)
      flare.current.rotation.set(0, 0, -Math.atan2(direction.x, direction.y))
    }
    let angleScreenCenter = Math.atan2(-position.y, -position.x)
    const normalAngle = Math.atan2(normal.y, normal.x)
    const incidentAngle = angleScreenCenter - normalAngle
    const refractionAngle = calculateRefractionAngle(incidentAngle) * 6
    angleScreenCenter += refractionAngle
    if (rainbow.current) rainbow.current.rotation.z = angleScreenCenter
    if (spot.current) {
      lerpV3(spot.current.target.position, [Math.cos(angleScreenCenter), Math.sin(angleScreenCenter), 0], 0.05)
      spot.current.target.updateMatrixWorld()
    }
  }, [])

  useFrame((state, delta) => {
    time.current += delta
    
    // Continuous gentle animation when not hovering
    const autoX = Math.sin(time.current * 0.3) * 2
    const autoY = Math.cos(time.current * 0.2) * 1.5
    
    if (boxreflect.current) {
      // Use mouse position if available, otherwise use auto-animation
      const mouseX = (state.pointer.x * state.viewport.width) / 2
      const mouseY = (state.pointer.y * state.viewport.height) / 2
      
      // Blend between auto and mouse based on mouse activity
      const useAuto = Math.abs(state.pointer.x) < 0.01 && Math.abs(state.pointer.y) < 0.01
      const x = useAuto ? autoX : mouseX
      const y = useAuto ? autoY : mouseY
      
      boxreflect.current.setRay([x, y, 0], [0, 0, 0])
    }
    
    if (rainbow.current) {
      // Keep rainbow always visible with minimum intensity
      const targetIntensity = isPrismHit ? 2.5 : 1.5
      lerp(rainbow.current.material, 'emissiveIntensity', targetIntensity, 0.1)
      if (spot.current) spot.current.intensity = (rainbow.current.material as any).emissiveIntensity
    }
    if (ambient.current) lerp(ambient.current, 'intensity', 0, 0.025)
  })

  return (
    <>
      <ambientLight ref={ambient} intensity={0} />
      <pointLight position={[10, -10, 0]} intensity={0.05} />
      <pointLight position={[0, 10, 0]} intensity={0.05} />
      <pointLight position={[-10, 0, 0]} intensity={0.05} />
      <spotLight ref={spot} intensity={2.5} distance={7} angle={1} penumbra={1} position={[0, 0, 1]} />
      <Beam ref={boxreflect} bounce={10} far={20}>
        <Prism position={[0, -0.5, 0]} onRayOver={rayOver} onRayOut={rayOut} onRayMove={rayMove} />
        {showmirrors && (
          <>
            <Box position={[2.25, -3.5, 0]} rotation={[0, 0, Math.PI / 3.5]} />
            <Box position={[-2.5, -2.5, 0]} rotation={[0, 0, Math.PI / 4]} />
            <Box position={[-3, 1, 0]} rotation={[0, 0, Math.PI / 4]} />
          </>
        )}
      </Beam>
      <Rainbow ref={rainbow} startRadius={0} endRadius={0.5} fade={0} />
      <Flare ref={flare} visible={isPrismHit} renderOrder={10} scale={1.25} streak={[12.5, 20, 1]} />
    </>
  )
}

export default function PrismScene() {
  const handleScrollToNext = () => {
    const nextSection = document.getElementById('hero-section')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-full h-screen min-h-screen bg-black" style={{ touchAction: 'pan-y' }}>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-black">
          <div className="text-white/60 text-lg">Loading...</div>
        </div>
      }>
        <Canvas orthographic gl={{ antialias: false }} camera={{ position: [0, 0, 100], zoom: 70 }} style={{ touchAction: 'none' }}>
          <color attach="background" args={['black']} />
          <Scene />
          <EffectComposer>
            <Bloom mipmapBlur levels={9} intensity={1.5} luminanceThreshold={1} luminanceSmoothing={1} />
          </EffectComposer>
        </Canvas>
      </Suspense>
      
      {/* Hero Title Overlay - Inspired by reference: Large, bold typography with gradient fade */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 sm:pt-20 md:pt-24 lg:pt-28 pointer-events-none z-10">
        <div className="text-center px-4">
          {/* Main Title - Large, cinematic typography like reference */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
            <span className="text-white/90">Dynamic without </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(168,85,247,0.9) 25%, rgba(236,72,153,0.9) 50%, rgba(251,146,60,0.9) 75%, rgba(251,146,60,0.7) 100%)'
              }}
            >
              Limits
            </span>
          </h1>
        </div>
      </div>

      {/* Gradient overlay for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      
      {/* CTA Input - Like reference style */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <button 
          onClick={handleScrollToNext}
          className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
        >
          <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-white/70 text-sm font-medium tracking-wide group-hover:text-white/90 transition-colors">
            Enter email to claim ticket & explore.
          </span>
          <svg className="w-4 h-4 text-white/50 group-hover:text-white/70 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  )
}
