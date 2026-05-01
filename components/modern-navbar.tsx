"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Home, FileText, GitCompare, Leaf, Phone } from "lucide-react"

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  isExternal?: boolean
}

const navItems: NavItem[] = [
  { id: "presentacion", label: "Presentacion", href: "/", icon: <Home className="w-5 h-5" /> },
  { id: "convencion", label: "Convencion", href: "/comparativo-convencion?section=convencion", icon: <FileText className="w-5 h-5" /> },
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
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 70 })
  const navRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  
  const activeIndex = navItems.findIndex(item => item.id === activeSection)
  const currentIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex >= 0 ? activeIndex : 0)

  // Actualizar posicion del indicador
  useEffect(() => {
    const currentItem = itemRefs.current[currentIndex]
    if (currentItem && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const itemRect = currentItem.getBoundingClientRect()
      setIndicatorStyle({
        left: itemRect.left - navRect.left + itemRect.width / 2,
        width: itemRect.width
      })
    }
  }, [currentIndex])

  const handleClick = (item: NavItem, index: number) => {
    // Siempre navegar a la URL correspondiente
    router.push(item.href)
    
    // Si hay callback para cambio de seccion
    if (onSectionChange) {
      onSectionChange(item.id)
    }
  }

  return (
    <div className="relative pt-12 pb-2">
      {/* Indicador circular que se mueve arriba */}
      <div 
        className="absolute top-0 transition-all duration-500 ease-out z-20 pointer-events-none"
        style={{
          left: `${indicatorStyle.left}px`,
          transform: "translateX(-50%)",
        }}
      >
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(180deg, #00fffc 0%, #eee 100%)",
            border: "5px solid #0a2540",
            boxShadow: "0 8px 24px rgba(0, 255, 252, 0.6), inset 0 2px 4px rgba(255,255,255,0.5)",
          }}
        >
          <div className="text-gray-800">
            {navItems[currentIndex]?.icon}
          </div>
        </div>
        {/* Etiqueta debajo del indicador */}
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap tracking-wide text-cyan-100"
        >
          {navItems[currentIndex]?.label}
        </div>
      </div>

      {/* Barra de navegacion */}
      <nav 
        className="relative flex items-center justify-center rounded-xl px-2 h-14 overflow-visible"
        style={{
          background: "linear-gradient(155deg, #00d4ff 0%, #e8e8e8 50%, #00d4ff 100%)",
          boxShadow: "0 8px 32px rgba(0, 212, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {/* Items de navegacion */}
        <ul ref={navRef} className="flex items-center relative z-10 gap-1">
          {navItems.map((item, index) => {
            const isActive = index === activeIndex
            const isCurrent = index === currentIndex
            
            return (
              <li 
                key={item.id} 
                ref={el => { itemRefs.current[index] = el }}
                className="relative"
              >
                <button
                  onClick={() => handleClick(item, index)}
                  className="flex items-center justify-center rounded-lg transition-all duration-300 px-4 py-3 hover:bg-white/30"
                  style={{
                    color: isCurrent ? "transparent" : (isActive ? "#0a2540" : "#4a5568"),
                    transform: isCurrent ? "scale(0.85)" : "scale(1)",
                    opacity: isCurrent ? 0.5 : 1,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.icon}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
