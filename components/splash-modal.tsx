"use client"

import { useState } from "react"
import Image from "next/image"

interface SplashModalProps {
  onEnter: () => void
}

export function SplashModal({ onEnter }: SplashModalProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(() => {
      onEnter()
    }, 500)
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundColor: "transparent",
      }}
    >
      {/* Contenedor del splash flotante 3D - 64x56 rem (4 veces el tamaño original) */}
      <div
        className={`relative overflow-hidden transition-all duration-500 ${
          isExiting ? "scale-90 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{
          width: "36rem",
          height: "32rem",
          maxWidth: "90vw",
          maxHeight: "90vh",
          borderRadius: "1.5rem",
          transform: "perspective(1000px) rotateX(2deg)",
          boxShadow: `
            0 50px 100px -20px rgba(0, 0, 0, 0.8),
            0 30px 60px -30px rgba(0, 0, 0, 0.7),
            0 -8px 20px -5px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            0 0 80px rgba(34, 197, 94, 0.15)
          `,
        }}
      >
        {/* Marco 3D superior */}
        <div 
          className="absolute top-0 left-0 right-0 h-3 z-10"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
            borderTopLeftRadius: "1.5rem",
            borderTopRightRadius: "1.5rem",
          }}
        />
        
        {/* Marco 3D izquierdo */}
        <div 
          className="absolute top-0 left-0 bottom-0 w-3 z-10"
          style={{
            background: "linear-gradient(to right, rgba(255,255,255,0.3), transparent)",
            borderTopLeftRadius: "1.5rem",
            borderBottomLeftRadius: "1.5rem",
          }}
        />
        
        {/* Marco 3D derecho (sombra) */}
        <div 
          className="absolute top-0 right-0 bottom-0 w-3 z-10"
          style={{
            background: "linear-gradient(to left, rgba(0,0,0,0.4), transparent)",
            borderTopRightRadius: "1.5rem",
            borderBottomRightRadius: "1.5rem",
          }}
        />
        
        {/* Marco 3D inferior (sombra) */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-3 z-10"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
            borderBottomLeftRadius: "1.5rem",
            borderBottomRightRadius: "1.5rem",
          }}
        />

        {/* Imagen de fondo que cubre todo el splash */}
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Splah-GmTjUexrTE91LwtLIKIRHjI1gKdMWk.png"
          alt="SINALTRACOMFENALCO - Somos Alianza para tu Bienestar"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay sutil para mejorar legibilidad */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* Botón de Bienvenidos */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center z-20">
          <button
            onClick={handleEnter}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="px-12 py-4 font-bold text-xl uppercase tracking-widest transition-all duration-300"
            style={{
              background: isHovered 
                ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                : "linear-gradient(135deg, #1a5c1a 0%, #22c55e 100%)",
              color: "#ffffff",
              borderRadius: "3rem",
              boxShadow: isHovered
                ? "0 15px 40px rgba(34, 197, 94, 0.6), 0 0 30px rgba(34, 197, 94, 0.4), inset 0 -3px 10px rgba(0,0,0,0.2)"
                : "0 8px 25px rgba(0, 0, 0, 0.4), inset 0 -3px 10px rgba(0,0,0,0.2)",
              transform: isHovered ? "scale(1.08) translateY(-3px)" : "scale(1)",
              border: "3px solid rgba(255,255,255,0.3)",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Bienvenidos
          </button>
        </div>

        {/* Copyright */}
        <div 
          className="absolute bottom-4 left-0 right-0 text-center z-20"
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "0.75rem",
            fontWeight: "500",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            letterSpacing: "0.05em",
          }}
        >
          SinaltraComfenalco, version 1.0 Derechos reservados 2026, creado por xpi Proyects
        </div>
      </div>
    </div>
  )
}
