import * as THREE from 'three'
import { useRef, useCallback, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Sparkles, Wand2, Zap } from 'lucide-react'

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
      // Detect mobile/touch device - always use auto animation on mobile
      const isMobile = window.innerWidth < 640
      const mouseX = (state.pointer.x * state.viewport.width) / 2
      const mouseY = (state.pointer.y * state.viewport.height) / 2
      const isIdle = Math.abs(state.pointer.x) < 0.01 && Math.abs(state.pointer.y) < 0.01
      // On mobile, always use auto animation; on desktop, switch based on pointer activity
      const x = isMobile || isIdle ? autoX : mouseX
      const y = isMobile || isIdle ? autoY : mouseY
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
      
      {/* Hero Title Overlay - PC: single line, positioned lower | Mobile: two lines, moved down */}
      <div className={`absolute top-[18%] sm:top-[16%] md:top-[18%] left-0 right-0 flex flex-col items-center pointer-events-none z-10 px-4 transition-all duration-1000 ease-out ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <h1 className="text-center font-bold tracking-tight leading-[1.1]">
          {/* Mobile: Two lines - slightly larger text */}
          <span className={`block sm:hidden text-white text-2xl drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-700 delay-100 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Expand the spectrum
          </span>
          <span className={`block sm:hidden mt-2 bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent text-2xl drop-shadow-[0_0_50px_rgba(167,139,250,0.5)] transition-all duration-700 delay-300 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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

      {/* Mobile-Only Floating Orbs - Compact size, positioned lower */}
      <div className={`flex sm:hidden absolute left-0 right-0 bottom-[28%] justify-center gap-5 pointer-events-none z-10 transition-all duration-1000 delay-600 ${titleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        {[
          { icon: Sparkles, label: 'Create', color: 'from-violet-500/25 to-violet-400/25' },
          { icon: Wand2, label: 'Generate', color: 'from-pink-500/25 to-pink-400/25' },
          { icon: Zap, label: 'Transform', color: 'from-orange-500/25 to-orange-400/25' }
        ].map((item, i) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={item.label}
              className="flex flex-col items-center gap-1 transition-all duration-700"
              style={{ transitionDelay: `${700 + i * 120}ms` }}
            >
              {/* Main orb - compact size */}
              <div 
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 flex items-center justify-center`}
              >
                <IconComponent className="w-3 h-3 text-white/60" strokeWidth={1.5} />
              </div>
              <span className="text-white/40 text-[7px] font-medium tracking-widest uppercase">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Mobile-Only Bottom Info Section */}
      <div className={`flex sm:hidden absolute bottom-20 left-0 right-0 flex-col items-center pointer-events-none z-10 px-6 transition-all duration-1000 delay-800 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-white/30 text-[9px] font-light tracking-[0.2em] uppercase">Next-Gen AI</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/20" />
        </div>
        <div className="flex items-center gap-4">
          {['Text to Video', 'Image to Video'].map((feature, i) => (
            <div key={feature} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-violet-400/40" />
              <span className="text-white/25 text-[8px] font-medium tracking-wide">{feature}</span>
            </div>
          ))}
        </div>
      </div>


      {/* Bottom Info Section - Hidden on mobile */}
      <div className={`hidden sm:flex absolute bottom-24 sm:bottom-28 left-0 right-0 flex-col items-center pointer-events-none z-10 px-4 transition-all duration-1000 delay-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-white/50 text-xs md:text-sm font-light tracking-widest uppercase mb-3">
          AI-Powered Video Creation
        </p>
        <div className="flex items-center gap-6">
          {['Text to Video', 'Image to Video', 'Video Enhancement'].map((feature, i) => (
            <div 
              key={feature}
              className="flex items-center gap-2"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-1 h-1 rounded-full bg-violet-400/60" />
              <span className="text-white/30 text-[10px] md:text-xs font-medium tracking-wide">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
      <button 
        onClick={handleScrollDown}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-1.5 z-10 cursor-pointer group transition-all duration-500 hover:scale-105 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '900ms' }}
      >
        <span className="text-white/60 sm:text-white/50 text-xs sm:text-xs font-medium tracking-wider uppercase group-hover:text-white/70 transition-colors">Explore</span>
        <div className="w-7 h-10 sm:w-6 sm:h-9 border-2 sm:border border-white/30 sm:border-white/20 rounded-full flex justify-center pt-2 sm:pt-1.5 group-hover:border-white/40 transition-colors">
          <div className="w-1.5 h-2.5 sm:w-1.5 sm:h-2.5 bg-white/60 sm:bg-white/50 rounded-full animate-bounce group-hover:bg-white/70" />
        </div>
      </button>
    </section>
  )
}
