"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Home, FileText, GitCompare, Leaf, Phone } from "lucide-react"

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: "presentacion", label: "Presentación", href: "/", icon: <Home className="w-5 h-5" /> },
  { id: "convencion", label: "Convención", href: "/comparativo-convencion?section=convencion", icon: <FileText className="w-5 h-5" /> },
  { id: "comparativo", label: "Comparativo", href: "/comparativo-convencion?section=comparativo", icon: <GitCompare className="w-5 h-5" /> },
  { id: "bienestar", label: "Bienestar", href: "/cosechando-bienestar", icon: <Leaf className="w-5 h-5" /> },
  { id: "contactos", label: "Contactos", href: "/contacto", icon: <Phone className="w-5 h-5" /> },
]

interface ModernNavbarProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export function ModernNavbar({ activeSection = "presentacion", onSectionChange }: ModernNavbarProps) {
  const router = useRouter()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [indicatorLeft, setIndicatorLeft] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  
  const activeIndex = navItems.findIndex(item => item.id === activeSection)
  const currentIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex >= 0 ? activeIndex : 0)

  // Actualizar posicion del indicador
  useEffect(() => {
    const currentItem = itemRefs.current[currentIndex]
    if (currentItem && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const itemRect = currentItem.getBoundingClientRect()
      setIndicatorLeft(itemRect.left - navRect.left + itemRect.width / 2)
    }
  }, [currentIndex])

  const handleClick = (item: NavItem) => {
    router.push(item.href)
    if (onSectionChange) {
      onSectionChange(item.id)
    }
  }

  return (
    <div className="relative">
      {/* Contenedor principal con la hendidura */}
      <div 
        ref={navRef}
        className="relative flex items-center justify-center rounded-2xl px-3 h-16 overflow-visible"
        style={{
          background: "linear-gradient(155deg, #00d4ff 0%, #e8e8e8 50%, #00d4ff 100%)",
          boxShadow: "0 8px 32px rgba(0, 212, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {/* SVG para crear la hendidura curva en la parte superior */}
        <svg 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ overflow: "visible" }}
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id="navbarClip">
              <path 
                d={`
                  M 0,16 
                  L ${indicatorLeft - 40},16 
                  Q ${indicatorLeft - 20},16 ${indicatorLeft - 15},0 
                  Q ${indicatorLeft - 10},-20 ${indicatorLeft},- 25
                  Q ${indicatorLeft + 10},-20 ${indicatorLeft + 15},0 
                  Q ${indicatorLeft + 20},16 ${indicatorLeft + 40},16 
                  L 100%,16 
                  L 100%,100% 
                  L 0,100% 
                  Z
                `}
                style={{ transition: "d 0.5s ease-out" }}
              />
            </clipPath>
          </defs>
        </svg>

        {/* Curva de hendidura visual */}
        <div 
          className="absolute -top-6 transition-all duration-500 ease-out z-10 pointer-events-none"
          style={{
            left: `${indicatorLeft}px`,
            transform: "translateX(-50%)",
          }}
        >
          {/* Fondo de la hendidura */}
          <svg width="90" height="50" viewBox="0 0 90 50" className="absolute -top-2 left-1/2 -translate-x-1/2">
            <path 
              d="M 0 50 Q 0 25 20 18 Q 35 10 45 0 Q 55 10 70 18 Q 90 25 90 50 Z" 
              fill="url(#hendiduraGradient)"
            />
            <defs>
              <linearGradient id="hendiduraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="50%" stopColor="#b8e8f0" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Circulo indicador incrustado */}
          <div 
            className="relative w-14 h-14 rounded-full flex items-center justify-center z-20"
            style={{
              background: "linear-gradient(180deg, #e8f4f8 0%, #00fffc 50%, #00d4ff 100%)",
              border: "4px solid #0a2540",
              boxShadow: "inset 0 4px 8px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(255,255,255,0.5), 0 4px 12px rgba(0, 255, 252, 0.5)",
            }}
          >
            <div className="text-gray-800">
              {navItems[currentIndex]?.icon}
            </div>
          </div>
          
          {/* Etiqueta del item activo */}
          <div 
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap tracking-wide text-cyan-900 bg-white/80 shadow-md"
          >
            {navItems[currentIndex]?.label}
          </div>
        </div>

        {/* Sombra interior para efecto de hendidura */}
        <div 
          className="absolute -top-2 w-20 h-8 rounded-b-full transition-all duration-500 ease-out pointer-events-none"
          style={{
            left: `${indicatorLeft}px`,
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse at center top, rgba(0,0,0,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Items de navegacion */}
        <div className="flex items-center relative z-5 gap-2">
          {navItems.map((item, index) => {
            const isActive = index === activeIndex
            const isCurrent = index === currentIndex
            
            return (
              <button
                key={item.id}
                ref={el => { itemRefs.current[index] = el }}
                onClick={() => handleClick(item)}
                className="relative flex flex-col items-center justify-center rounded-xl transition-all duration-300 px-4 py-2 hover:bg-white/30"
                style={{
                  opacity: isCurrent ? 0 : 1,
                  transform: isCurrent ? "scale(0.8) translateY(5px)" : "scale(1)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  className="transition-all duration-300"
                  style={{
                    color: isActive ? "#0a2540" : "#4a5568",
                  }}
                >
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
