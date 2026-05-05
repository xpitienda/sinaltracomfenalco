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

// Componente de carrusel 3D giratorio
function Carrusel3D({ 
  images, 
  initialDelay, 
  pauseDuration,
  orbitPosition 
}: { 
  images: string[]
  initialDelay: number // segundos antes de mostrar primera imagen
  pauseDuration: number // segundos que se pausa en cada imagen
  orbitPosition: number // posición orbital (0, 1, 2) para distribuir alrededor del logo
}) {
  const [rotationY, setRotationY] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [currentFace, setCurrentFace] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  const anglePerImage = 360 / images.length // 72 grados por imagen (5 imágenes)
  const radius = 80 // Radio del carrusel 3D

  useEffect(() => {
    // Delay inicial antes de empezar
    const startTimeout = setTimeout(() => {
      setHasStarted(true)
    }, initialDelay * 1000)

    return () => clearTimeout(startTimeout)
  }, [initialDelay])

  useEffect(() => {
    if (!hasStarted) return

    let animationFrame: number
    let lastTime = performance.now()
    const rotationSpeed = 0.5 // grados por frame cuando gira

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      
      if (!isPaused) {
        setRotationY(prev => {
          const newRotation = prev + rotationSpeed
          
          // Detectar cuando una imagen está al frente (cada 72 grados)
          const normalizedRotation = newRotation % 360
          const faceIndex = Math.round(normalizedRotation / anglePerImage) % images.length
          
          if (faceIndex !== currentFace && Math.abs(normalizedRotation - faceIndex * anglePerImage) < 2) {
            setCurrentFace(faceIndex)
            setIsPaused(true)
            
            // Pausar por la duración especificada
            setTimeout(() => {
              setIsPaused(false)
            }, pauseDuration * 1000)
          }
          
          return newRotation
        })
      }
      
      lastTime = currentTime
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [hasStarted, isPaused, currentFace, anglePerImage, images.length, pauseDuration])

  // Calcular posición orbital alrededor del logo
  const orbitAngle = (orbitPosition * 120) - 90 // 0°, 120°, 240° distribuidos
  const orbitRadius = 180 // Radio de la órbita alrededor del logo
  const orbitX = Math.cos((orbitAngle * Math.PI) / 180) * orbitRadius
  const orbitY = Math.sin((orbitAngle * Math.PI) / 180) * orbitRadius

  return (
    <div 
      className="absolute"
      style={{
        left: `calc(50% + ${orbitX}px)`,
        top: `calc(50% + ${orbitY}px)`,
        transform: 'translate(-50%, -50%)',
        perspective: '1000px',
        zIndex: 20,
      }}
    >
      <div
        className="relative"
        style={{
          width: '120px',
          height: '160px',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotationY}deg)`,
          transition: isPaused ? 'none' : 'transform 0.1s linear',
        }}
      >
        {images.map((src, index) => {
          const angle = index * anglePerImage
          return (
            <div
              key={index}
              className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border-2 border-white/50 bg-white"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-contain bg-white"
                loading="eager"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function InicioPage() {
  const [gradientAngle, setGradientAngle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle((prev) => (prev + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Fondo animado azul claro a verde claro con matices */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(${gradientAngle}deg, 
              rgba(147, 197, 253, 0.9) 0%, 
              rgba(255, 255, 255, 0.7) 25%,
              rgba(167, 243, 208, 0.8) 50%,
              rgba(196, 181, 253, 0.6) 75%,
              rgba(147, 197, 253, 0.9) 100%
            )
          `,
        }}
      />
      
      {/* Capa de matices radiales */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(147, 197, 253, 0.6) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(167, 243, 208, 0.6) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(196, 181, 253, 0.5) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 30%)
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
      <div className="flex-1 flex items-center justify-center relative p-4 min-h-[600px]">
        
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
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-xl"
            loading="eager"
          />
        </div>

        {/* Carrusel 1 - Muestra imagen cada 1 segundo de delay inicial, pausa 2 segundos */}
        <Carrusel3D 
          images={carrusel1Images} 
          initialDelay={1}
          pauseDuration={2}
          orbitPosition={0}
        />

        {/* Carrusel 2 - Muestra imagen después de 2 segundos de delay, pausa 2 segundos */}
        <Carrusel3D 
          images={carrusel2Images} 
          initialDelay={2}
          pauseDuration={2}
          orbitPosition={1}
        />

        {/* Carrusel 3 - Muestra imagen cada 3 segundos, pausa 2 segundos */}
        <Carrusel3D 
          images={carrusel3Images} 
          initialDelay={3}
          pauseDuration={2}
          orbitPosition={2}
        />
      </div>

      {/* Texto decorativo inferior */}
      <div className="relative z-30 text-center pb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 drop-shadow-md">
          Convención Colectiva 2026 - 2027
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          15 Años Construyendo Bienestar, Juntos
        </p>
      </div>
    </main>
  )
}
