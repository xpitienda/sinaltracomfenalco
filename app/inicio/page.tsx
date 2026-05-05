"use client"

import { useState, useEffect } from "react"
import { ModernNavbar } from "@/components/modern-navbar"
import Image from "next/image"

// Imágenes del carrusel desde GitHub
const carrusel1 = [
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S1.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S2.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S3.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S4.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S5.png",
]

const carrusel2 = [
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S6.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S7.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S8.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S9.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S10.png",
]

const carrusel3 = [
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S11.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S12.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S13.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S14.png",
  "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S15.png",
]

// Componente de carrusel individual
function Carrusel({ images, position, rotation }: { images: string[], position: string, rotation: number }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div 
      className={`absolute ${position} w-32 h-44 md:w-48 md:h-64 lg:w-56 lg:h-72`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 bg-white/10 backdrop-blur-sm">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ))}
        {/* Indicadores */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-3' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function InicioPage() {
  const [gradientAngle, setGradientAngle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle((prev) => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Fondo animado azul claro a verde claro con matices */}
      <div 
        className="absolute inset-0 transition-all duration-100"
        style={{
          background: `
            linear-gradient(${gradientAngle}deg, 
              rgba(147, 197, 253, 0.8) 0%, 
              rgba(255, 255, 255, 0.6) 20%,
              rgba(167, 243, 208, 0.7) 40%,
              rgba(196, 181, 253, 0.5) 60%,
              rgba(255, 255, 255, 0.6) 80%,
              rgba(147, 197, 253, 0.8) 100%
            )
          `,
        }}
      />
      
      {/* Capa de matices adicionales */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(147, 197, 253, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(167, 243, 208, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(196, 181, 253, 0.4) 0%, transparent 40%)
          `,
        }}
      />

      {/* Header con Navbar */}
      <header 
        className="sticky top-0 z-40 px-2 md:px-6 py-1"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #15803d 50%, #1e40af 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
        }}
      >
        <div className="max-w-7xl mx-auto">
          <ModernNavbar activeSection="carrusel" compact={true} />
        </div>
      </header>

      {/* Contenido principal con logo central y carruseles */}
      <div className="flex-1 flex items-center justify-center relative p-4">
        {/* Logo central */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full bg-white/80 backdrop-blur-md shadow-2xl flex items-center justify-center border-4 border-white/50 overflow-hidden">
            <Image
              src="/images/Logo_Sinaltracomfenalco.png"
              alt="SINALTRACOMFENALCO"
              width={250}
              height={250}
              className="w-32 h-32 md:w-44 md:h-44 lg:w-56 lg:h-56 object-contain"
              priority
            />
          </div>
          <h1 className="mt-4 text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 text-center drop-shadow-lg">
            SINALTRACOMFENALCO
          </h1>
          <p className="text-sm md:text-base text-gray-600 text-center mt-2">
            15 Años Construyendo Bienestar
          </p>
        </div>

        {/* Carrusel 1 - Arriba izquierda */}
        <Carrusel 
          images={carrusel1} 
          position="top-8 left-4 md:top-16 md:left-16 lg:top-20 lg:left-32" 
          rotation={-15} 
        />

        {/* Carrusel 2 - Arriba derecha */}
        <Carrusel 
          images={carrusel2} 
          position="top-8 right-4 md:top-16 md:right-16 lg:top-20 lg:right-32" 
          rotation={15} 
        />

        {/* Carrusel 3 - Abajo centro */}
        <Carrusel 
          images={carrusel3} 
          position="bottom-8 left-1/2 -translate-x-1/2 md:bottom-16 lg:bottom-20" 
          rotation={0} 
        />
      </div>

      {/* Texto decorativo inferior */}
      <div className="relative z-10 text-center pb-4">
        <p className="text-gray-600 text-sm">
          Convención Colectiva 2026 - 2027
        </p>
      </div>
    </main>
  )
}
