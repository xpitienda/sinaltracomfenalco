"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, FileText, GitCompare, Leaf } from "lucide-react"

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: "presentacion", label: "Presentacion", href: "/comparativo-convencion", icon: <Home className="w-5 h-5" /> },
  { id: "convencion", label: "Convencion", href: "/comparativo-convencion?section=convencion", icon: <FileText className="w-5 h-5" /> },
  { id: "comparativo", label: "Comparativo", href: "/comparativo-convencion?section=comparativo", icon: <GitCompare className="w-5 h-5" /> },
  { id: "bienestar", label: "Bienestar", href: "/cosechando-bienestar", icon: <Leaf className="w-5 h-5" /> },
]

interface ModernNavbarProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export function ModernNavbar({ activeSection = "presentacion", onSectionChange }: ModernNavbarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const activeIndex = navItems.findIndex(item => item.id === activeSection)
  const currentIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex >= 0 ? activeIndex : 0)

  const handleClick = (item: NavItem, index: number) => {
    if (onSectionChange && (item.id === "presentacion" || item.id === "convencion" || item.id === "comparativo")) {
      onSectionChange(item.id)
    }
  }

  // Calcular posicion del indicador
  const itemWidth = 70 // ancho de cada item en px
  const indicatorOffset = currentIndex * itemWidth + itemWidth / 2

  return (
    <div className="relative pt-10 pb-2">
      {/* Indicador circular que se mueve arriba */}
      <div 
        className="absolute top-0 transition-all duration-500 ease-out z-20 pointer-events-none"
        style={{
          left: `${indicatorOffset}px`,
          transform: "translateX(-50%)",
        }}
      >
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(180deg, #00fffc 0%, #eee 100%)",
            border: "5px solid #1e3a5f",
            boxShadow: "0 8px 24px rgba(0, 255, 252, 0.5), inset 0 2px 4px rgba(255,255,255,0.5)",
          }}
        >
          <div className="text-gray-800">
            {navItems[currentIndex]?.icon}
          </div>
        </div>
        {/* Etiqueta debajo del indicador */}
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap tracking-wide"
          style={{
            color: "#1e3a5f",
          }}
        >
          {navItems[currentIndex]?.label}
        </div>
      </div>

      {/* Barra de navegacion */}
      <nav 
        className="relative flex items-center justify-center rounded-xl px-1 h-14"
        style={{
          background: "linear-gradient(155deg, #00fffc 0%, #eee 50%, #00fffc 100%)",
          boxShadow: "0 8px 32px rgba(0, 255, 252, 0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
          width: `${navItems.length * itemWidth}px`,
        }}
      >
        {/* Items de navegacion */}
        <ul className="flex items-center relative z-10">
          {navItems.map((item, index) => {
            const isActive = index === activeIndex
            const isHovered = index === hoveredIndex
            const isCurrent = index === currentIndex
            
            return (
              <li key={item.id} className="relative">
                {item.id === "bienestar" ? (
                  <Link
                    href={item.href}
                    className="flex items-center justify-center rounded-lg transition-all duration-300"
                    style={{
                      width: `${itemWidth}px`,
                      height: "48px",
                      color: isCurrent ? "transparent" : (isActive ? "#1e3a5f" : "#666"),
                      transform: isCurrent ? "scale(0.9)" : "scale(1)",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {item.icon}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleClick(item, index)}
                    className="flex items-center justify-center rounded-lg transition-all duration-300"
                    style={{
                      width: `${itemWidth}px`,
                      height: "48px",
                      color: isCurrent ? "transparent" : (isActive ? "#1e3a5f" : "#666"),
                      transform: isCurrent ? "scale(0.9)" : "scale(1)",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {item.icon}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
