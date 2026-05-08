"use client"

import { useState, useEffect } from "react"
import { ModernNavbar } from "@/components/modern-navbar"

// Datos de los bloques de la feria con colores para reloj y antireloj
const feriaBlocks = [
  {
    id: 1,
    title: "Bono D1 - Productos de Aseo y Cuidado Personal",
    description: "Bono D1 por $40.000 pesos para 410 afiliados. Canjeable en Tiendas D1 para productos de aseo y cuidado personal.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bono%20D1%201-uIQpIViYFKzCanecDQnjBfwZJ4XMXL.jpeg",
    borderColorClock: "#8B5CF6", // Morado (reloj)
    borderColorAnti: "#EC4899", // Rosa (antireloj)
  },
  {
    id: 2,
    title: "BR Comunicaciones - Productos de Belleza y Bienestar",
    description: "Productos para el cuidado de la salud y bienestar. Convenio exclusivo con BR Comunicaciones para productos de belleza y milagros.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bono%20BR%20Comunicaciones-14iQj698ChgY8zT13WPQbxbjNioZ64.jpeg",
    borderColorClock: "#22C55E", // Verde (reloj)
    borderColorAnti: "#14B8A6", // Teal (antireloj)
  },
  {
    id: 3,
    title: "Óptica PrismaLens - Servicios de Salud Visual",
    description: "Servicios de óptica, salud preventiva y promoción de hábitos saludables. Examen visual completo gratuito, asesoría profesional en lentes y talleres de prevención.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bono%20Prisma%20Lens-gTRMTciMjGpWebWGjJE5WF4FAMaxuk.jpeg",
    borderColorClock: "#3B82F6", // Azul (reloj)
    borderColorAnti: "#6366F1", // Indigo (antireloj)
  },
  {
    id: 4,
    title: "Bono Parques, Hoteles y Servicios de Caja",
    description: "382 bonos por valor de $60.000 pesos para parques, hoteles y/o servicios de Caja. Corte al 30 de abril, de acuerdo a política de afiliados a 31/10/2025.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bono%20Parques%20y%20Hoteles-kdyRAKGCHSIoyzmiTA7UU33R9UMzbs.jpeg",
    borderColorClock: "#F59E0B", // Oro (reloj)
    borderColorAnti: "#EF4444", // Rojo (antireloj)
  },
  {
    id: 5,
    title: "Fondo de Bienestar Social - Bono Mutual ASMUCOM",
    description: "Bono de $60.000 pesos para afiliados con mínimo 1 año de antigüedad continua en SINALTRACOMFENALCO y la Asociación Mutual Comfraternidad ASMUCOM. Corte 30/08/2025.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bono%20Mutual-HojlWUTzVfDG9LVa3ufAhsQGHW8wRf.jpeg",
    borderColorClock: "#D97706", // Ocre (reloj)
    borderColorAnti: "#A855F7", // Violeta (antireloj)
  },
]

// Componente de borde animado: gira como reloj y luego antireloj con colores diferentes
function AnimatedBorderBlock({ colorClock, colorAnti, delay }: { colorClock: string; colorAnti: string; delay: number }) {
  const [phase, setPhase] = useState<'clockwise' | 'counterclockwise'>('clockwise')
  const [progress, setProgress] = useState(0)
  
  const currentColor = phase === 'clockwise' ? colorClock : colorAnti
  
  useEffect(() => {
    let animationId: number
    let timeoutId: NodeJS.Timeout
    
    const startAnimation = () => {
      const startTime = Date.now()
      const duration = 4000 // 4 segundos (1s por lado)
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const newProgress = Math.min((elapsed / duration) * 100, 100)
        setProgress(newProgress)
        
        if (newProgress < 100) {
          animationId = requestAnimationFrame(animate)
        } else {
          // Cambiar de fase
          setTimeout(() => {
            setProgress(0)
            setPhase(prev => prev === 'clockwise' ? 'counterclockwise' : 'clockwise')
          }, 500)
        }
      }
      
      animationId = requestAnimationFrame(animate)
    }
    
    timeoutId = setTimeout(startAnimation, delay)
    
    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationId)
    }
  }, [delay, phase])
  
  // Calcular segmentos segun la fase (cada 25% es un lado, 1 segundo cada uno)
  let topWidth = 0, rightHeight = 0, bottomWidth = 0, leftHeight = 0
  let topLeft = true, rightTop = true, bottomRight = true, leftBottom = true
  
  if (phase === 'clockwise') {
    // Sentido horario: arriba (izq->der), derecha (arr->abajo), abajo (der->izq), izquierda (abajo->arr)
    topWidth = Math.min(progress * 4, 100)
    rightHeight = Math.min(Math.max((progress - 25) * 4, 0), 100)
    bottomWidth = Math.min(Math.max((progress - 50) * 4, 0), 100)
    leftHeight = Math.min(Math.max((progress - 75) * 4, 0), 100)
    topLeft = true; rightTop = true; bottomRight = true; leftBottom = true
  } else {
    // Sentido antihorario: arriba (der->izq), izquierda (arr->abajo), abajo (izq->der), derecha (abajo->arr)
    topWidth = Math.min(progress * 4, 100)
    leftHeight = Math.min(Math.max((progress - 25) * 4, 0), 100)
    bottomWidth = Math.min(Math.max((progress - 50) * 4, 0), 100)
    rightHeight = Math.min(Math.max((progress - 75) * 4, 0), 100)
    topLeft = false; rightTop = false; bottomRight = false; leftBottom = false
  }
  
  return (
    <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
      {/* Borde superior */}
      <div 
        className="absolute top-0 h-1"
        style={{ 
          width: `${topWidth}%`, 
          left: topLeft ? 0 : 'auto',
          right: topLeft ? 'auto' : 0,
          backgroundColor: currentColor,
          boxShadow: `0 0 15px ${currentColor}, 0 0 30px ${currentColor}`,
        }}
      />
      {/* Borde derecho */}
      <div 
        className="absolute right-0 w-1"
        style={{ 
          height: `${rightHeight}%`, 
          top: rightTop ? 0 : 'auto',
          bottom: rightTop ? 'auto' : 0,
          backgroundColor: currentColor,
          boxShadow: `0 0 15px ${currentColor}, 0 0 30px ${currentColor}`,
        }}
      />
      {/* Borde inferior */}
      <div 
        className="absolute bottom-0 h-1"
        style={{ 
          width: `${bottomWidth}%`, 
          right: bottomRight ? 0 : 'auto',
          left: bottomRight ? 'auto' : 0,
          backgroundColor: currentColor,
          boxShadow: `0 0 15px ${currentColor}, 0 0 30px ${currentColor}`,
        }}
      />
      {/* Borde izquierdo */}
      <div 
        className="absolute left-0 w-1"
        style={{ 
          height: `${leftHeight}%`, 
          bottom: leftBottom ? 0 : 'auto',
          top: leftBottom ? 'auto' : 0,
          backgroundColor: currentColor,
          boxShadow: `0 0 15px ${currentColor}, 0 0 30px ${currentColor}`,
        }}
      />
    </div>
  )
}

// Componente de bloque de feria con intercalado de imagen/texto
function FeriaBlock({ block, index }: { block: typeof feriaBlocks[0]; index: number }) {
  const [imageOpen, setImageOpen] = useState(false)
  const isImageFirst = index % 2 === 0 // Pares: imagen primero, Impares: texto primero
  
  return (
    <>
      <div 
        className="relative rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-2xl"
        style={{ minHeight: '300px' }}
      >
        <AnimatedBorderBlock colorClock={block.borderColorClock} colorAnti={block.borderColorAnti} delay={index * 500} />
        
        <div className={`p-6 flex flex-col md:flex-row gap-6 ${!isImageFirst ? 'md:flex-row-reverse' : ''}`}>
          {/* Imagen */}
          <div 
            className="w-full md:w-1/2 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => setImageOpen(true)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.image}
              alt={block.title}
              className="w-full h-auto rounded-xl shadow-lg"
              style={{ border: `3px solid ${block.borderColorClock}` }}
            />
          </div>
          
          {/* Contenido */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: block.borderColorClock }}
            >
              {block.title}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {block.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Modal de imagen ampliada */}
      {imageOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setImageOpen(false)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setImageOpen(false)}
              className="absolute -top-12 right-0 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
            >
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.image}
              alt={block.title}
              className="w-full h-auto rounded-xl"
              style={{ maxHeight: '90vh', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default function FeriaEconomiaPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fondo animado morado y verde */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(34, 197, 94, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 70%),
            linear-gradient(135deg, #7C3AED 0%, #22C55E 50%, #8B5CF6 100%)
          `
        }}
      />
      
      {/* Logo SINALTRACOMFENALCO como fondo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none -z-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Sinaltracomfenalco_Libre-Sin-Fondo-fJt75CzVWSrdW4pwclX3vOdmtZ1B1Z.png"
          alt="SINALTRACOMFENALCO"
          className="w-[600px] h-auto opacity-20"
        />
      </div>
      
      {/* Header con Navbar */}
      <header 
        className="sticky top-0 z-40 px-2 md:px-6 py-1"
        style={{
          background: "linear-gradient(135deg, #7C3AED 0%, #22C55E 50%, #166534 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
        }}
      >
        <div className="max-w-7xl mx-auto">
          <ModernNavbar activeSection="feria" compact={true} />
        </div>
      </header>
      
      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Titulo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            FERIA DE ECONOMÍA FAMILIAR
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-300 drop-shadow-md">
            SINALTRACOMFENALCO
          </h2>
          <p className="text-white/90 text-lg mt-4 max-w-3xl mx-auto">
            Cronograma de beneficios exclusivos para nuestros afiliados
          </p>
        </div>
        
        {/* Bloques de la feria */}
        <div className="space-y-8">
          {feriaBlocks.map((block, index) => (
            <FeriaBlock key={block.id} block={block} index={index} />
          ))}
        </div>
        
        {/* Nota informativa */}
        <div className="mt-12 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold text-purple-700 mb-4 text-center">
            Productos y Servicios Adicionales
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="w-3 h-3 mt-2 rounded-full bg-purple-500 flex-shrink-0"></span>
              <span><strong>BR Comunicaciones:</strong> Electrodomésticos, Portátiles, Celulares, Patinetas eléctricas y más.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-3 h-3 mt-2 rounded-full bg-green-500 flex-shrink-0"></span>
              <span><strong>Productos de aseo y cuidado personal</strong> disponibles en la feria.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-3 h-3 mt-2 rounded-full bg-blue-500 flex-shrink-0"></span>
              <span><strong>Productos para el bienestar del hogar</strong> a precios especiales para afiliados.</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
