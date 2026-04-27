"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowUp } from "lucide-react"

// Imágenes del catálogo S1 a S15 desde GitHub
const catalogImages = [
  { id: 1, title: "Beneficio 1", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S1.png" },
  { id: 2, title: "Beneficio 2", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S2.png" },
  { id: 3, title: "Beneficio 3", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S3.png" },
  { id: 4, title: "Beneficio 4", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S4.png" },
  { id: 5, title: "Beneficio 5", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S5.png" },
  { id: 6, title: "Beneficio 6", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S6.png" },
  { id: 7, title: "Beneficio 7", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S7.png" },
  { id: 8, title: "Beneficio 8", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S8.png" },
  { id: 9, title: "Beneficio 9", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S9.png" },
  { id: 10, title: "Beneficio 10", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S10.png" },
  { id: 11, title: "Beneficio 11", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S11.png" },
  { id: 12, title: "Beneficio 12", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S12.png" },
  { id: 13, title: "Beneficio 13", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S13.png" },
  { id: 14, title: "Beneficio 14", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S14.png" },
  { id: 15, title: "Beneficio 15", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S15.png" },
]

// Componente de caja de imagen 3D con borde animado tipo manecillas de reloj
function AnimatedImageBox({ 
  image, 
  index, 
  onZoom,
  isVisible 
}: { 
  image: typeof catalogImages[0]
  index: number
  onZoom: () => void
  isVisible: boolean
}) {
  const isFirstHalf = index < 8 // Primera mitad: verde, sentido horario
  const borderColor = isFirstHalf ? "#22c55e" : "#3b82f6"
  const animationClass = isFirstHalf ? "animate-border-clockwise" : "animate-border-counterclockwise"
  
  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-700 perspective-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ 
        transitionDelay: `${index * 1000}ms`,
        perspective: "1000px",
      }}
      onClick={onZoom}
    >
      {/* Contenedor 3D */}
      <div 
        className="relative transition-all duration-500 transform-gpu group-hover:scale-105"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(5deg) rotateY(-5deg)",
          transition: "transform 0.5s ease-out, box-shadow 0.5s ease-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(20px)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "rotateX(5deg) rotateY(-5deg)"
        }}
      >
        {/* Borde animado con efecto de manecillas de reloj */}
        <div 
          className={`absolute inset-0 rounded-xl pointer-events-none z-10 ${animationClass}`}
          style={{
            background: `conic-gradient(from 0deg, ${borderColor} 0deg, ${borderColor} 90deg, transparent 90deg, transparent 360deg)`,
            padding: "3px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        
        {/* Borde estático suave de fondo */}
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            border: `2px solid ${borderColor}30`,
          }}
        />

        {/* Sombra 3D inferior */}
        <div 
          className="absolute -bottom-2 left-2 right-2 h-4 rounded-xl blur-md opacity-40 transition-opacity duration-300 group-hover:opacity-60"
          style={{
            background: `linear-gradient(to bottom, ${borderColor}, transparent)`,
            transform: "rotateX(90deg) translateZ(-10px)",
          }}
        />

        {/* Contenedor de imagen con efecto 3D */}
        <div 
          className="relative bg-white rounded-xl overflow-hidden transition-all duration-300"
          style={{
            boxShadow: `
              0 10px 30px ${borderColor}40,
              0 5px 15px rgba(0,0,0,0.2),
              inset 0 1px 0 rgba(255,255,255,0.5),
              0 -2px 5px rgba(0,0,0,0.05)
            `,
            transform: "translateZ(0)",
          }}
        >
          {/* Reflejo superior 3D */}
          <div 
            className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none z-30 opacity-20"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)",
            }}
          />

          {/* Imagen */}
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Overlay de zoom */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300 z-20">
            <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
          </div>

          {/* Borde inferior 3D */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-2"
            style={{
              background: `linear-gradient(to top, ${borderColor}40, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

// Componente Modal de Zoom
function ZoomModal({ 
  image, 
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}: { 
  image: typeof catalogImages[0] | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) {
  if (!image) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-50"
      >
        <X className="w-8 h-8" />
      </button>

      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-50"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-50"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      <div 
        className="relative max-w-4xl max-h-[90vh] w-full mx-4 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={image.src}
            alt={image.title}
            fill
            className="object-contain bg-white"
          />
        </div>
        <h3 className="text-center text-white text-2xl font-bold mt-4">{image.title}</h3>
      </div>
    </div>
  )
}

export default function CosechandoBienestarPage() {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())
  const [zoomedImage, setZoomedImage] = useState<typeof catalogImages[0] | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const brochureRef = useRef<HTMLDivElement>(null)

  // Mostrar imágenes con intervalo de 1 segundo
  useEffect(() => {
    catalogImages.forEach((_, index) => {
      setTimeout(() => {
        setVisibleImages(prev => new Set([...prev, index]))
      }, index * 1000)
    })
  }, [])

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleZoom = (image: typeof catalogImages[0]) => {
    setZoomedImage(image)
  }

  const handlePrevImage = () => {
    if (!zoomedImage) return
    const currentIndex = catalogImages.findIndex(img => img.id === zoomedImage.id)
    if (currentIndex > 0) {
      setZoomedImage(catalogImages[currentIndex - 1])
    }
  }

  const handleNextImage = () => {
    if (!zoomedImage) return
    const currentIndex = catalogImages.findIndex(img => img.id === zoomedImage.id)
    if (currentIndex < catalogImages.length - 1) {
      setZoomedImage(catalogImages[currentIndex + 1])
    }
  }

  const currentIndex = zoomedImage ? catalogImages.findIndex(img => img.id === zoomedImage.id) : -1

  return (
    <main 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)
        `
      }}
    >
      {/* Marca de agua S15 de fondo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="relative w-[80vw] h-[80vh] opacity-5">
          <Image
            src="https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S15.png"
            alt="Marca de agua"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Header */}
      <header 
        className="sticky top-0 z-40 px-6 py-4"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #15803d 50%, #1e40af 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/comparativo-convencion"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
            Cosechando Bienestar
          </h1>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
          >
            Inicio
          </Link>
        </div>
      </header>

      {/* Brochure Section */}
      <section className="relative z-10 py-12 px-4" ref={brochureRef}>
        <div className="max-w-7xl mx-auto">
          {/* Título de sección */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-emerald-600">Cosechando </span>
              <span className="text-blue-600">Bienestar</span>
              <span className="text-gray-700"> 2026 - 2027</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explora todos los beneficios que tenemos para ti. Haz clic en cualquier imagen para verla en detalle.
            </p>
          </div>

          {/* Grid horizontal tipo brochure */}
          <div className="overflow-x-auto pb-8">
            <div 
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(5, minmax(280px, 1fr))",
                gridTemplateRows: "repeat(3, auto)",
              }}
            >
              {catalogImages.map((image, index) => (
                <AnimatedImageBox
                  key={image.id}
                  image={image}
                  index={index}
                  onZoom={() => handleZoom(image)}
                  isVisible={visibleImages.has(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Zoom */}
      <ZoomModal
        image={zoomedImage}
        onClose={() => setZoomedImage(null)}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < catalogImages.length - 1}
      />

      {/* Botón volver arriba */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full text-white transition-all duration-300 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          boxShadow: "0 10px 30px rgba(34,197,94,0.4)"
        }}
        aria-label="Volver al inicio"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Estilos para la animación del borde tipo manecillas de reloj */}
      <style jsx global>{`
        @keyframes rotate-clockwise {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes rotate-counterclockwise {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        
        .animate-border-clockwise {
          animation: rotate-clockwise 3s linear infinite;
        }
        
        .animate-border-counterclockwise {
          animation: rotate-counterclockwise 3s linear infinite;
        }
      `}</style>
    </main>
  )
}
