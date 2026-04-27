"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowUp } from "lucide-react"

// Imágenes del catálogo S1 a S15 desde GitHub con títulos específicos
const catalogImages = [
  { id: 1, title: "Convención Colectiva 2026-2027", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S1.png" },
  { id: 2, title: "Resumen de la Negociación", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S2.png" },
  { id: 3, title: "Beneficios Salariales", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S3.png" },
  { id: 4, title: "Auxilios Educativos", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S4.png" },
  { id: 5, title: "Bonificaciones", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S5.png" },
  { id: 6, title: "Primas Extralegales", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S6.png" },
  { id: 7, title: "Auxilios de Vivienda", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S7.png" },
  { id: 8, title: "Beneficios de Salud", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S8.png" },
  { id: 9, title: "Permisos y Licencias", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S9.png" },
  { id: 10, title: "Recreación y Deporte", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S10.png" },
  { id: 11, title: "Capacitación y Formación", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S11.png" },
  { id: 12, title: "Auxilios por Fallecimiento", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S12.png" },
  { id: 13, title: "Préstamos y Créditos", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S13.png" },
  { id: 14, title: "Bienestar Familiar", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S14.png" },
  { id: 15, title: "Resumen General", src: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/S15.png" },
]

// Componente de caja de imagen 3D con borde animado tipo manecillas de reloj y título
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
      className={`relative group cursor-pointer transition-all duration-700 ${
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
        className="relative transition-all duration-500 transform-gpu"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(8deg) rotateY(-5deg)",
          transition: "transform 0.5s ease-out, box-shadow 0.5s ease-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(30px) scale(1.05)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "rotateX(8deg) rotateY(-5deg)"
        }}
      >
        {/* Borde animado con efecto de manecillas de reloj */}
        <div 
          className={`absolute -inset-1 rounded-2xl pointer-events-none z-10 ${animationClass}`}
          style={{
            background: `conic-gradient(from 0deg, ${borderColor} 0deg, ${borderColor} 90deg, transparent 90deg, transparent 360deg)`,
            padding: "4px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        
        {/* Borde estático suave de fondo */}
        <div 
          className="absolute -inset-1 rounded-2xl pointer-events-none"
          style={{
            border: `3px solid ${borderColor}40`,
          }}
        />

        {/* Sombra 3D inferior */}
        <div 
          className="absolute -bottom-4 left-4 right-4 h-8 rounded-2xl blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-70"
          style={{
            background: borderColor,
          }}
        />

        {/* Contenedor principal con título y imagen */}
        <div 
          className="relative bg-white rounded-xl overflow-hidden transition-all duration-300"
          style={{
            boxShadow: `
              0 20px 40px ${borderColor}50,
              0 10px 20px rgba(0,0,0,0.25),
              inset 0 2px 0 rgba(255,255,255,0.8),
              0 -3px 8px rgba(0,0,0,0.1)
            `,
            transform: "translateZ(0)",
            width: "280px",
          }}
        >
          {/* Título superior */}
          <div 
            className="relative z-20 px-3 py-2 text-center font-bold text-white text-xs leading-tight"
            style={{
              background: `linear-gradient(135deg, ${borderColor} 0%, ${isFirstHalf ? '#16a34a' : '#2563eb'} 100%)`,
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              minHeight: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {image.title}
          </div>

          {/* Reflejo superior 3D */}
          <div 
            className="absolute top-9 left-0 right-0 h-1/4 pointer-events-none z-30 opacity-15"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.9), transparent)",
            }}
          />

          {/* Imagen - contenida completamente con altura fija */}
          <div 
            className="relative w-full bg-gray-50"
            style={{ height: "360px" }}
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105 p-2"
            />
          </div>

          {/* Overlay de zoom */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-20">
            <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
          </div>

          {/* Borde inferior 3D decorativo */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(to right, ${borderColor}, ${isFirstHalf ? '#16a34a' : '#2563eb'})`,
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

          {/* Grid 3 columnas x 5 filas tipo brochure */}
          <div className="pb-8 flex justify-center">
            <div 
              className="grid gap-8 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
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
