"use client"

import { useState, useEffect } from "react"
import { ModernNavbar } from "@/components/modern-navbar"

// Imágenes del carrusel desde GitHub
const carrusel1Images = [
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S1.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S2.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S3.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S4.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S5.png",
]

const carrusel2Images = [
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S6.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S7.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S8.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S9.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S10.png",
]

const carrusel3Images = [
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S11.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S12.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S13.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S14.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S15.png",
]

// Colores de borde para cada carrusel
const borderColors = {
  1: "#9333ea", // Morado
  2: "#22c55e", // Verde
  3: "#3b82f6", // Azul
}

// Componente de borde animado que se llena por segmentos
function AnimatedBorder({ color, isActive }: { color: string; isActive: boolean }) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    if (!isActive) {
      setProgress(0)
      return
    }
    
    // Animar el borde en 4 segundos (1 segundo por lado)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return prev + 2.5 // 100% en 4 segundos (40 intervalos de 100ms)
      })
    }, 100)
    
    return () => clearInterval(interval)
  }, [isActive])
  
  // Calcular qué segmentos mostrar basado en el progreso
  const topWidth = Math.min(progress * 4, 100)
  const rightHeight = Math.min(Math.max((progress - 25) * 4, 0), 100)
  const bottomWidth = Math.min(Math.max((progress - 50) * 4, 0), 100)
  const leftHeight = Math.min(Math.max((progress - 75) * 4, 0), 100)
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Borde superior */}
      <div 
        className="absolute top-0 left-0 h-1 rounded-full"
        style={{ 
          width: `${topWidth}%`, 
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
          transition: 'width 0.1s linear'
        }}
      />
      {/* Borde derecho */}
      <div 
        className="absolute top-0 right-0 w-1 rounded-full"
        style={{ 
          height: `${rightHeight}%`, 
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
          transition: 'height 0.1s linear'
        }}
      />
      {/* Borde inferior */}
      <div 
        className="absolute bottom-0 right-0 h-1 rounded-full"
        style={{ 
          width: `${bottomWidth}%`, 
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
          transition: 'width 0.1s linear'
        }}
      />
      {/* Borde izquierdo */}
      <div 
        className="absolute bottom-0 left-0 w-1 rounded-full"
        style={{ 
          height: `${leftHeight}%`, 
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
          transition: 'height 0.1s linear'
        }}
      />
    </div>
  )
}

// Componente de carrusel 3D giratorio
function Carrusel3D({ 
  images, 
  initialDelay, 
  pauseDuration,
  orbitPosition,
  carruselNumber,
  onImageClick
}: { 
  images: string[]
  initialDelay: number
  pauseDuration: number
  orbitPosition: number
  carruselNumber: 1 | 2 | 3
  onImageClick: (src: string) => void
}) {
  const [rotationY, setRotationY] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [currentFace, setCurrentFace] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [borderActive, setBorderActive] = useState(false)

  const anglePerImage = 360 / images.length
  const radius = 90

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true)
    }, initialDelay * 1000)

    return () => clearTimeout(startTimeout)
  }, [initialDelay])

  useEffect(() => {
    if (!hasStarted) return

    let animationFrame: number
    const rotationSpeed = 0.6

    const animate = () => {
      if (!isPaused) {
        setRotationY(prev => {
          const newRotation = prev + rotationSpeed
          const normalizedRotation = newRotation % 360
          const faceIndex = Math.round(normalizedRotation / anglePerImage) % images.length
          
          if (faceIndex !== currentFace && Math.abs(normalizedRotation - faceIndex * anglePerImage) < 3) {
            setCurrentFace(faceIndex)
            setIsPaused(true)
            setBorderActive(true)
            
            setTimeout(() => {
              setIsPaused(false)
              setBorderActive(false)
            }, pauseDuration * 1000)
          }
          
          return newRotation
        })
      }
      
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [hasStarted, isPaused, currentFace, anglePerImage, images.length, pauseDuration])

  const orbitAngle = (orbitPosition * 120) - 90
  const orbitRadius = 200
  const orbitX = Math.cos((orbitAngle * Math.PI) / 180) * orbitRadius
  const orbitY = Math.sin((orbitAngle * Math.PI) / 180) * orbitRadius

  const borderColor = borderColors[carruselNumber]

  return (
    <div 
      className="absolute"
      style={{
        left: `calc(50% + ${orbitX}px)`,
        top: `calc(50% + ${orbitY}px)`,
        transform: 'translate(-50%, -50%)',
        perspective: '1200px',
        zIndex: 20,
      }}
    >
      <div
        className="relative"
        style={{
          width: '140px',
          height: '180px',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotationY}deg)`,
        }}
      >
        {images.map((src, index) => {
          const angle = index * anglePerImage
          const isFront = index === currentFace && isPaused
          
          return (
            <div
              key={index}
              className={`absolute inset-0 rounded-xl overflow-hidden shadow-2xl bg-white ${isFront ? 'cursor-pointer' : ''}`}
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
                border: `3px solid ${borderColor}40`,
              }}
              onClick={() => isFront && onImageClick(src)}
            >
              {/* Borde animado solo en la imagen frontal cuando está pausado */}
              {isFront && <AnimatedBorder color={borderColor} isActive={borderActive} />}
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-contain bg-white p-1"
                loading="eager"
              />
            </div>
          )
        })}
      </div>
      
      {/* Etiqueta del carrusel */}
      <div 
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-white text-xs font-bold"
        style={{ backgroundColor: borderColor }}
      >
        Carrusel {carruselNumber}
      </div>
    </div>
  )
}

export default function InicioPage() {
  const [gradientAngle, setGradientAngle] = useState(0)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle((prev) => (prev + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const handleImageClick = (src: string) => {
    setZoomedImage(src)
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Fondo animado morado con verde */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(${gradientAngle}deg, 
              rgba(147, 51, 234, 0.7) 0%, 
              rgba(34, 197, 94, 0.6) 25%,
              rgba(167, 139, 250, 0.5) 50%,
              rgba(74, 222, 128, 0.6) 75%,
              rgba(147, 51, 234, 0.7) 100%
            )
          `,
        }}
      />
      
      {/* Capa de matices radiales */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(167, 139, 250, 0.7) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(74, 222, 128, 0.7) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(192, 132, 252, 0.6) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.5) 0%, transparent 30%)
          `,
        }}
      />

      {/* Header con Navbar */}
      <header 
        className="sticky top-0 z-50 px-2 md:px-6 py-1"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #15803d 50%, #1e40af 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
        }}
      >
        <div className="max-w-7xl mx-auto">
          <ModernNavbar activeSection="carrusel" compact={true} />
        </div>
      </header>

      {/* Contenido principal con logo al fondo y carruseles girando alrededor */}
      <div className="flex-1 flex items-center justify-center relative p-4 min-h-[650px]">
        
        {/* Logo SINALTRACOMFENALCO al fondo (detrás de los carruseles) */}
        <div 
          className="absolute z-10"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Sinaltracomfenalco_Libre-Sin-Fondo-fJt75CzVWSrdW4pwclX3vOdmtZ1B1Z.png"
            alt="SINALTRACOMFENALCO - 15 Años"
            className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 object-contain drop-shadow-xl"
            loading="eager"
          />
        </div>

        {/* Carrusel 1 - Morado */}
        <Carrusel3D 
          images={carrusel1Images} 
          initialDelay={1}
          pauseDuration={2}
          orbitPosition={0}
          carruselNumber={1}
          onImageClick={handleImageClick}
        />

        {/* Carrusel 2 - Verde */}
        <Carrusel3D 
          images={carrusel2Images} 
          initialDelay={2}
          pauseDuration={2}
          orbitPosition={1}
          carruselNumber={2}
          onImageClick={handleImageClick}
        />

        {/* Carrusel 3 - Azul */}
        <Carrusel3D 
          images={carrusel3Images} 
          initialDelay={3}
          pauseDuration={2}
          orbitPosition={2}
          carruselNumber={3}
          onImageClick={handleImageClick}
        />
      </div>

      {/* Texto decorativo inferior */}
      <div className="relative z-30 text-center pb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
          Convención Colectiva 2026 - 2027
        </h2>
        <p className="text-white/80 text-sm mt-1 drop-shadow">
          15 Años Construyendo Bienestar, Juntos
        </p>
      </div>

      {/* Modal de imagen ampliada */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={() => setZoomedImage(null)}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="rounded-lg overflow-hidden bg-white max-w-full max-h-full shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={zoomedImage}
                alt="Imagen ampliada"
                style={{ maxWidth: '95vw', maxHeight: '90vh', width: 'auto', height: 'auto', display: 'block' }}
                loading="eager"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
