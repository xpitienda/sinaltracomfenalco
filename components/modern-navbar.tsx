"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Home, FileText, GitCompare, Leaf, Phone } from "lucide-react"

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  color: string
}

const navItems: NavItem[] = [
  { id: "presentacion", label: "Presentación", href: "/", icon: <Home className="w-5 h-5" />, color: "#22c55e" },
  { id: "convencion", label: "Convención", href: "/comparativo-convencion?section=convencion", icon: <FileText className="w-5 h-5" />, color: "#3b82f6" },
  { id: "comparativo", label: "Comparativo", href: "/comparativo-convencion?section=comparativo", icon: <GitCompare className="w-5 h-5" />, color: "#f59e0b" },
  { id: "bienestar", label: "Bienestar", href: "/cosechando-bienestar", icon: <Leaf className="w-5 h-5" />, color: "#10b981" },
  { id: "contactos", label: "Contactos", href: "/contacto", icon: <Phone className="w-5 h-5" />, color: "#8b5cf6" },
]

interface ModernNavbarProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export function ModernNavbar({ activeSection = "presentacion", onSectionChange }: ModernNavbarProps) {
  const router = useRouter()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [indicatorPosition, setIndicatorPosition] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  
  const activeIndex = navItems.findIndex(item => item.id === activeSection)
  const currentIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex >= 0 ? activeIndex : 0)
  const currentColor = navItems[currentIndex]?.color || "#22c55e"

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
    router.push(item.href)
    if (onSectionChange) {
      onSectionChange(item.id)
    }
  }

  const itemWidth = 70
  const notchRadius = 35

  return (
    <div className="relative pt-8 pb-2">
      {/* Esfera indicador - Simple con linea de circulo y color dinamico */}
      <div 
        className="absolute z-30 transition-all duration-500 ease-out"
        style={{
          left: `${indicatorPosition}px`,
          transform: "translateX(-50%)",
          top: "-5px",
        }}
      >
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            background: currentColor,
            border: "4px solid #0a2540",
            boxShadow: `0 4px 15px ${currentColor}60`,
          }}
        >
          <div className="text-white">
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

      {/* Barra contenedora con hendidura ondulada */}
      <div 
        ref={navRef}
        className="relative h-16 overflow-visible"
      >
        {/* SVG que dibuja el rectangulo con la hendidura ondulada hacia adentro */}
        <svg 
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="navbarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#e0e0e0" />
            </linearGradient>
            <clipPath id="notchClip">
              <path 
                d={`
                  M 0,0 
                  L ${Math.max(0, indicatorPosition - notchRadius - 10)},0 
                  Q ${indicatorPosition - notchRadius},0 ${indicatorPosition - notchRadius + 5},${notchRadius * 0.3}
                  Q ${indicatorPosition - notchRadius * 0.5},${notchRadius * 0.8} ${indicatorPosition},${notchRadius}
                  Q ${indicatorPosition + notchRadius * 0.5},${notchRadius * 0.8} ${indicatorPosition + notchRadius - 5},${notchRadius * 0.3}
                  Q ${indicatorPosition + notchRadius},0 ${indicatorPosition + notchRadius + 10},0
                  L 100%,0 
                  L 100%,100% 
                  L 0,100% 
                  Z
                `}
              />
            </clipPath>
          </defs>
          
          {/* Fondo del rectangulo con hendidura */}
          <rect 
            x="0" 
            y="0" 
            width="100%" 
            height="100%" 
            rx="12" 
            fill="url(#navbarGradient)"
            clipPath="url(#notchClip)"
            className="transition-all duration-500"
          />
          
          {/* Borde superior con la curva de hendidura */}
          <path 
            d={`
              M 12,0 
              L ${Math.max(12, indicatorPosition - notchRadius - 10)},0 
              Q ${indicatorPosition - notchRadius},0 ${indicatorPosition - notchRadius + 5},${notchRadius * 0.3}
              Q ${indicatorPosition - notchRadius * 0.5},${notchRadius * 0.8} ${indicatorPosition},${notchRadius}
              Q ${indicatorPosition + notchRadius * 0.5},${notchRadius * 0.8} ${indicatorPosition + notchRadius - 5},${notchRadius * 0.3}
              Q ${indicatorPosition + notchRadius},0 ${indicatorPosition + notchRadius + 10},0
              L calc(100% - 12),0
            `}
            fill="none"
            stroke="#0a2540"
            strokeWidth="3"
            className="transition-all duration-500"
          />
          
          {/* Bordes laterales e inferior */}
          <path 
            d="M 12,0 Q 0,0 0,12 L 0,calc(100% - 12) Q 0,100% 12,100% L calc(100% - 12),100% Q 100%,100% 100%,calc(100% - 12) L 100%,12 Q 100%,0 calc(100% - 12),0"
            fill="none"
            stroke="#0a2540"
            strokeWidth="3"
          />
        </svg>

        {/* Items de navegacion */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 gap-1">
          {navItems.map((item, index) => {
            const isActive = index === activeIndex
            const isCurrent = index === currentIndex
            
            return (
              <button
                key={item.id}
                ref={el => { itemRefs.current[index] = el }}
                onClick={() => handleClick(item)}
                className="relative flex items-center justify-center transition-all duration-300 rounded-lg hover:bg-white/30"
                style={{
                  width: `${itemWidth}px`,
                  height: "50px",
                  opacity: isCurrent ? 0.3 : 1,
                  transform: isCurrent ? "translateY(5px) scale(0.85)" : "translateY(0) scale(1)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  className="transition-colors duration-300"
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
