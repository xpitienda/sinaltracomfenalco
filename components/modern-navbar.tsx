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

  return (
    <div className="relative pt-10 pb-2">
      {/* Esfera indicador - Simple solo linea de circulo */}
      <div 
        className="absolute z-30 transition-all duration-500 ease-out"
        style={{
          left: `${indicatorPosition}px`,
          transform: "translateX(-50%)",
          top: "-2px",
        }}
      >
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 bg-white"
          style={{
            border: `3px solid ${currentColor}`,
          }}
        >
          <div style={{ color: currentColor }} className="transition-colors duration-500">
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
                className="relative flex items-center justify-center transition-all duration-300 rounded-lg hover:bg-white/40"
                style={{
                  width: `${itemWidth}px`,
                  height: "44px",
                  opacity: isCurrent ? 0.3 : 1,
                  transform: isCurrent ? "translateY(3px) scale(0.9)" : "translateY(0) scale(1)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  className="transition-colors duration-300"
                  style={{
                    color: isActive ? "#166534" : "#1f2937",
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
