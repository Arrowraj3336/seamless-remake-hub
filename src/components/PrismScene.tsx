import * as THREE from 'three'
import { useRef, useCallback, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import { Beam } from './prism/Beam'
import { Rainbow } from './prism/Rainbow'
import { Prism } from './prism/Prism'
import { Flare } from './prism/Flare'
import { calculateRefractionAngle, lerp, lerpV3 } from './prism/util'

function Scene() {
  const [isPrismHit, hitPrism] = useState(true)
  const flare = useRef<THREE.Group>(null)
  const ambient = useRef<THREE.AmbientLight>(null)
  const spot = useRef<THREE.SpotLight>(null)
  const boxreflect = useRef<any>(null)
  const rainbow = useRef<THREE.Mesh>(null)
  const autoAngle = useRef(0)

  const rayOut = useCallback(() => {}, [])
  const rayOver = useCallback((e: any) => {
    e.stopPropagation()
    hitPrism(true)
    if (rainbow.current) {
      (rainbow.current.material as any).speed = 1;
      (rainbow.current.material as any).emissiveIntensity = 20
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

  useFrame((state) => {
    // Slower continuous animation (reduced from 0.008 to 0.003)
    autoAngle.current += 0.003
    const autoX = Math.cos(autoAngle.current) * 2
    const autoY = Math.sin(autoAngle.current) * 1.5

    if (boxreflect.current) {
      const mouseX = (state.pointer.x * state.viewport.width) / 2
      const mouseY = (state.pointer.y * state.viewport.height) / 2
      const isIdle = Math.abs(state.pointer.x) < 0.01 && Math.abs(state.pointer.y) < 0.01
      const x = isIdle ? autoX : mouseX
      const y = isIdle ? autoY : mouseY
      boxreflect.current.setRay([x, y, 0], [0, 0, 0])
    }
    
    if (rainbow.current) {
      lerp(rainbow.current.material, 'emissiveIntensity', 2.5, 0.1)
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
      <spotLight ref={spot} intensity={1} distance={7} angle={1} penumbra={1} position={[0, 0, 1]} />
      <Beam ref={boxreflect} bounce={10} far={20}>
        <Prism position={[0, -0.5, 0]} onRayOver={rayOver} onRayOut={rayOut} onRayMove={rayMove} />
      </Beam>
      <Rainbow ref={rainbow} startRadius={0} endRadius={0.5} fade={0} />
      <Flare ref={flare} visible={isPrismHit} renderOrder={10} scale={1.25} streak={[12.5, 20, 1]} />
    </>
  )
}

export default function PrismScene() {
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    // Delay title entrance for dramatic effect
    const timer = setTimeout(() => setTitleVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleScrollDown = () => {
    const heroSection = document.getElementById('hero')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-black">
          <div className="text-white/60 text-lg">Loading...</div>
        </div>
      }>
        <Canvas orthographic gl={{ antialias: false }} camera={{ position: [0, 0, 100], zoom: 70 }}>
          <color attach="background" args={['black']} />
          <Scene />
          <EffectComposer>
            <Bloom mipmapBlur levels={9} intensity={1.5} luminanceThreshold={1} luminanceSmoothing={1} />
          </EffectComposer>
        </Canvas>
      </Suspense>
      
      {/* Hero Title Overlay - PC: single line, positioned lower | Mobile: two lines */}
      <div className={`absolute top-[12%] sm:top-[16%] md:top-[18%] left-0 right-0 flex flex-col items-center pointer-events-none z-10 px-4 transition-all duration-1000 ease-out ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <h1 className="text-center font-bold tracking-tight leading-[1.1]">
          {/* Mobile: Two lines */}
          <span className={`block sm:hidden text-white text-xl drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-700 delay-100 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Expand the spectrum
          </span>
          <span className={`block sm:hidden mt-2 bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent text-xl drop-shadow-[0_0_50px_rgba(167,139,250,0.5)] transition-all duration-700 delay-300 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            of Storytelling
          </span>
          {/* PC: Single line, forced nowrap */}
          <span className={`hidden sm:block whitespace-nowrap text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-700 delay-100 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Expand the spectrum <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">of Storytelling</span>
          </span>
        </h1>
      </div>

      {/* Floating AI Feature Tags - Left Side (Hidden on Mobile) */}
      <div className={`hidden sm:flex absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 flex-col gap-4 pointer-events-none z-10 transition-all duration-1000 delay-500 ${titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
        {['4K Ultra HD', 'AI Upscaling', 'Neural Engine'].map((tag, i) => (
          <div 
            key={tag}
            className={`flex items-center gap-2 transition-all duration-700`}
            style={{ transitionDelay: `${600 + i * 150}ms` }}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 animate-pulse" />
            <span className="text-white/40 text-xs font-medium tracking-wider uppercase">{tag}</span>
          </div>
        ))}
      </div>

      {/* Floating AI Feature Tags - Right Side (Hidden on Mobile) */}
      <div className={`hidden sm:flex absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 flex-col items-end gap-4 pointer-events-none z-10 transition-all duration-1000 delay-500 ${titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
        {['Cinematic FX', 'Motion AI', 'Frame Perfect'].map((tag, i) => (
          <div 
            key={tag}
            className={`flex items-center gap-2 transition-all duration-700`}
            style={{ transitionDelay: `${750 + i * 150}ms` }}
          >
            <span className="text-white/40 text-xs font-medium tracking-wider uppercase">{tag}</span>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Mobile-Only Floating Orbs - Positioned below prism with glow animation */}
      <div className={`flex sm:hidden absolute left-0 right-0 bottom-[42%] justify-center gap-6 pointer-events-none z-10 transition-all duration-1000 delay-600 ${titleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        {[
          { icon: '✦', label: 'Create', color: 'from-violet-500 to-violet-400' },
          { icon: '◈', label: 'Generate', color: 'from-pink-500 to-pink-400' },
          { icon: '❖', label: 'Transform', color: 'from-orange-500 to-orange-400' }
        ].map((item, i) => (
          <div 
            key={item.label}
            className="flex flex-col items-center gap-1.5 transition-all duration-700"
            style={{ transitionDelay: `${700 + i * 120}ms` }}
          >
            <div className="relative group">
              {/* Animated glow ring */}
              <div 
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.color} opacity-40 blur-md animate-pulse`}
                style={{ animationDelay: `${i * 0.3}s`, animationDuration: '2s' }}
              />
              {/* Secondary glow layer */}
              <div 
                className={`absolute -inset-1 rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-lg animate-pulse`}
                style={{ animationDelay: `${i * 0.3 + 0.5}s`, animationDuration: '2.5s' }}
              />
              {/* Main orb */}
              <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg shadow-black/20">
                <span className="text-white/80 text-sm drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{item.icon}</span>
              </div>
            </div>
            <span className="text-white/50 text-[9px] font-medium tracking-widest uppercase mt-1">{item.label}</span>
          </div>
        ))}
      </div>


      {/* Bottom Info Section */}
      <div className={`absolute bottom-24 sm:bottom-28 left-0 right-0 flex flex-col items-center pointer-events-none z-10 px-4 transition-all duration-1000 delay-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-white/50 text-[10px] sm:text-xs md:text-sm font-light tracking-widest uppercase mb-3">
          AI-Powered Video Creation
        </p>
        <div className="flex items-center gap-4 sm:gap-6">
          {['Text to Video', 'Image to Video', 'Video Enhancement'].map((feature, i) => (
            <div 
              key={feature}
              className="flex items-center gap-1.5 sm:gap-2"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-1 h-1 rounded-full bg-violet-400/60" />
              <span className="text-white/30 text-[8px] sm:text-[10px] md:text-xs font-medium tracking-wide">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
      <button 
        onClick={handleScrollDown}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 cursor-pointer group transition-all duration-500 hover:scale-105 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '900ms' }}
      >
        <span className="text-white/50 text-[10px] sm:text-xs font-medium tracking-wider uppercase group-hover:text-white/70 transition-colors">Explore</span>
        <div className="w-5 h-8 sm:w-6 sm:h-9 border border-white/20 rounded-full flex justify-center pt-1.5 group-hover:border-white/40 transition-colors">
          <div className="w-1 h-2 sm:w-1.5 sm:h-2.5 bg-white/50 rounded-full animate-bounce group-hover:bg-white/70" />
        </div>
      </button>
    </section>
  )
}
