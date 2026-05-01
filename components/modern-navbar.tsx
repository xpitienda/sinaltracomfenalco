"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Home, Play, GitCompare, Leaf, Phone, Search } from "lucide-react"

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  color: string
}

const navItems: NavItem[] = [
  { id: "presentacion", label: "Presentación", href: "/", icon: <Home className="w-5 h-5" />, color: "#22c55e" },
  { id: "video", label: "Video", href: "/comparativo-convencion?showVideo=true", icon: <Play className="w-5 h-5" />, color: "#3b82f6" },
  { id: "comparativo", label: "Comparativo", href: "/comparativo-convencion?section=comparativo", icon: <GitCompare className="w-5 h-5" />, color: "#f59e0b" },
  { id: "bienestar", label: "Bienestar", href: "/cosechando-bienestar", icon: <Leaf className="w-5 h-5" />, color: "#10b981" },
  { id: "consulta", label: "Consulta", href: "/consulta.html", icon: <Search className="w-5 h-5" />, color: "#f97316" },
  { id: "contactos", label: "Contactos", href: "/?contactos=true", icon: <Phone className="w-5 h-5" />, color: "#8b5cf6" },
]

interface ModernNavbarProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export function ModernNavbar({ activeSection = "presentacion", onSectionChange }: ModernNavbarProps) {
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [indicatorPosition, setIndicatorPosition] = useState(0)
  const [fillProgress, setFillProgress] = useState(100)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const prevIndexRef = useRef<number>(0)
  
  const activeIndex = navItems.findIndex(item => item.id === activeSection)
  const currentIndex = activeIndex >= 0 ? activeIndex : selectedIndex
  const currentColor = navItems[currentIndex]?.color || "#22c55e"

  // Efecto de llenado cuando cambia de posicion
  useEffect(() => {
    if (prevIndexRef.current !== currentIndex) {
      setFillProgress(0)
      
      // Animacion de llenado en 1 segundo
      const startTime = Date.now()
      const duration = 1000 // 1 segundo
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min((elapsed / duration) * 100, 100)
        setFillProgress(progress)
        
        if (progress < 100) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
      prevIndexRef.current = currentIndex
    }
  }, [currentIndex])

  useEffect(() => {
    const currentItem = itemRefs.current[currentIndex]
    if (currentItem && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const itemRect = currentItem.getBoundingClientRect()
      const centerPosition = itemRect.left - navRect.left + itemRect.width / 2
      setIndicatorPosition(centerPosition)
    }
  }, [currentIndex])

  const handleClick = (item: NavItem) => {
    // Si es un archivo .html, abrir en nueva ventana
    if (item.href.endsWith('.html')) {
      window.open(item.href, '_blank')
      return
    }
    router.push(item.href)
    if (onSectionChange) {
      onSectionChange(item.id)
    }
  }

  const itemWidth = 70

  return (
    <div className="relative pt-10 pb-2">
      {/* Esfera indicador con efecto de llenado en la linea */}
      <div 
        className="absolute z-30 transition-all duration-500 ease-out"
        style={{
          left: `${indicatorPosition}px`,
          transform: "translateX(-50%)",
          top: "-2px",
        }}
      >
        <div className="relative w-14 h-14">
          {/* Circulo base (fondo gris claro) */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="25"
              fill="white"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
          </svg>
          
          {/* Circulo de llenado animado */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="25"
              fill="transparent"
              stroke={currentColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 25}`}
              strokeDashoffset={`${2 * Math.PI * 25 * (1 - fillProgress / 100)}`}
              className="transition-colors duration-300"
            />
          </svg>
          
          {/* Icono central */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-colors duration-500"
            style={{ color: currentColor }}
          >
            {navItems[currentIndex]?.icon}
          </div>
        </div>
        
        {/* Etiqueta */}
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs font-bold whitespace-nowrap transition-colors duration-500"
          style={{ color: currentColor }}
        >
          {navItems[currentIndex]?.label}
        </div>
      </div>

      {/* Barra contenedora - Borde verde, fondo naranja con blanco */}
      <div 
        ref={navRef}
        className="relative h-14 rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #f97316 0%, #fdba74 50%, #ffffff 100%)",
          border: "3px solid #22c55e",
        }}
      >
        {/* Items de navegacion - Estaticos sin efectos hover */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 gap-1">
          {navItems.map((item, index) => {
            const isCurrent = index === currentIndex
            
            return (
              <button
                key={item.id}
                ref={el => { itemRefs.current[index] = el }}
                onClick={() => {
                  setSelectedIndex(index)
                  handleClick(item)
                }}
                className="relative flex items-center justify-center rounded-lg"
                style={{
                  width: `${itemWidth}px`,
                  height: "44px",
                  opacity: isCurrent ? 0.3 : 1,
                }}
              >
                <div style={{ color: "#1f2937" }}>
                  {item.icon}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
