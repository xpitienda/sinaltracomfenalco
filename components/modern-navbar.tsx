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
  const [indicatorPosition, setIndicatorPosition] = useState(0)
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

  return (
    <div className="relative pt-10 pb-2">
      {/* Circulo indicador - Simple, sin efectos extra */}
      <div 
        className="absolute z-30 transition-all duration-500 ease-out"
        style={{
          left: `${indicatorPosition}px`,
          transform: "translateX(-50%)",
          top: "0px",
        }}
      >
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(0deg, #eee 0%, #00fffc 100%)",
            border: "5px solid #0a2540",
          }}
        >
          <div className="text-gray-800">
            {navItems[currentIndex]?.icon}
          </div>
        </div>
        
        {/* Etiqueta */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs font-bold whitespace-nowrap text-cyan-800">
          {navItems[currentIndex]?.label}
        </div>
      </div>

      {/* Barra contenedora con hendidura - La curva esta aqui */}
      <div 
        ref={navRef}
        className="relative h-16 rounded-xl overflow-visible"
        style={{
          background: "linear-gradient(155deg, #00fffc 0%, #eee 100%)",
        }}
      >
        {/* SVG que crea la hendidura en el borde superior del rectangulo */}
        <svg 
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00fffc" />
              <stop offset="100%" stopColor="#eee" />
            </linearGradient>
          </defs>
          <path 
            d={`
              M 0,12 
              L ${Math.max(0, indicatorPosition - 38)},12 
              C ${indicatorPosition - 30},12 ${indicatorPosition - 28},-8 ${indicatorPosition - 22},-18
              Q ${indicatorPosition - 15},-28 ${indicatorPosition},-30
              Q ${indicatorPosition + 15},-28 ${indicatorPosition + 22},-18
              C ${indicatorPosition + 28},-8 ${indicatorPosition + 30},12 ${indicatorPosition + 38},12
              L 100%,12 
              L 100%,100% 
              L 0,100% 
              Z
            `}
            fill="url(#barGradient)"
            className="transition-all duration-500 ease-out"
            style={{
              filter: "drop-shadow(0 4px 6px rgba(0, 212, 255, 0.3))",
            }}
          />
          {/* Borde del rectangulo con hendidura */}
          <path 
            d={`
              M 12,12 
              L ${Math.max(12, indicatorPosition - 38)},12 
              C ${indicatorPosition - 30},12 ${indicatorPosition - 28},-8 ${indicatorPosition - 22},-18
              Q ${indicatorPosition - 15},-28 ${indicatorPosition},-30
              Q ${indicatorPosition + 15},-28 ${indicatorPosition + 22},-18
              C ${indicatorPosition + 28},-8 ${indicatorPosition + 30},12 ${indicatorPosition + 38},12
              L calc(100% - 12),12
            `}
            fill="none"
            stroke="#0a2540"
            strokeWidth="3"
            className="transition-all duration-500 ease-out"
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
                className="relative flex items-center justify-center transition-all duration-300 rounded-lg hover:bg-white/20"
                style={{
                  width: `${itemWidth}px`,
                  height: "50px",
                  opacity: isCurrent ? 0.3 : 1,
                  transform: isCurrent ? "scale(0.9)" : "scale(1)",
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
