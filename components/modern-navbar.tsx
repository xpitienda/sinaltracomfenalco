"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Home, GitCompare, Leaf, Phone, Search, FileText } from "lucide-react"

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  color: string
}

const navItems: NavItem[] = [
  { id: "presentacion", label: "Presentación", href: "/", icon: <Home className="w-5 h-5" />, color: "#22c55e" },
  { id: "comparativo", label: "Comparativo", href: "/comparativo-convencion?section=comparativo", icon: <GitCompare className="w-5 h-5" />, color: "#f59e0b" },
  { id: "bienestar", label: "Bienestar", href: "/cosechando-bienestar", icon: <Leaf className="w-5 h-5" />, color: "#10b981" },
  { id: "documentos", label: "Documentos", href: "/documentos", icon: <FileText className="w-5 h-5" />, color: "#3b82f6" },
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
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState<number | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const prevIndexRef = useRef<number>(0)
  const itemPositions = useRef<number[]>([])
  
  const activeIndex = navItems.findIndex(item => item.id === activeSection)
  const currentIndex = activeIndex >= 0 ? activeIndex : selectedIndex
  const currentColor = navItems[currentIndex]?.color || "#22c55e"

  // Calcular posiciones de los items
  useEffect(() => {
    if (navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      itemPositions.current = itemRefs.current.map(item => {
        if (item) {
          const itemRect = item.getBoundingClientRect()
          return itemRect.left - navRect.left + itemRect.width / 2
        }
        return 0
      })
    }
  }, [])

  // Efecto de llenado cuando cambia de posicion
  useEffect(() => {
    if (prevIndexRef.current !== currentIndex) {
      setFillProgress(0)
      
      const startTime = Date.now()
      const duration = 1000
      
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

  // Actualizar posicion del indicador
  useEffect(() => {
    if (!isDragging) {
      const currentItem = itemRefs.current[currentIndex]
      if (currentItem && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect()
        const itemRect = currentItem.getBoundingClientRect()
        const centerPosition = itemRect.left - navRect.left + itemRect.width / 2
        setIndicatorPosition(centerPosition)
      }
    }
  }, [currentIndex, isDragging])

  // Encontrar el item mas cercano a una posicion
  const findClosestItem = useCallback((position: number): number => {
    let closest = 0
    let minDistance = Infinity
    
    itemPositions.current.forEach((itemPos, index) => {
      const distance = Math.abs(position - itemPos)
      if (distance < minDistance) {
        minDistance = distance
        closest = index
      }
    })
    
    return closest
  }, [])

  // Manejar navegacion
  const handleNavigate = useCallback((index: number) => {
    const item = navItems[index]
    if (!item) return
    
    setSelectedIndex(index)
    
    if (item.href.endsWith('.html')) {
      window.open(item.href, '_blank')
      return
    }
    router.push(item.href)
    if (onSectionChange) {
      onSectionChange(item.id)
    }
  }, [router, onSectionChange])

  // Drag con mouse
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    
    // Actualizar posiciones
    if (navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      itemPositions.current = itemRefs.current.map(item => {
        if (item) {
          const itemRect = item.getBoundingClientRect()
          return itemRect.left - navRect.left + itemRect.width / 2
        }
        return 0
      })
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !navRef.current) return
    
    const navRect = navRef.current.getBoundingClientRect()
    const x = e.clientX - navRect.left
    const clampedX = Math.max(30, Math.min(x, navRect.width - 30))
    setDragPosition(clampedX)
    setIndicatorPosition(clampedX)
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    
    setIsDragging(false)
    if (dragPosition !== null) {
      const closestIndex = findClosestItem(dragPosition)
      handleNavigate(closestIndex)
    }
    setDragPosition(null)
  }, [isDragging, dragPosition, findClosestItem, handleNavigate])

  // Drag con touch
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    
    if (navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      itemPositions.current = itemRefs.current.map(item => {
        if (item) {
          const itemRect = item.getBoundingClientRect()
          return itemRect.left - navRect.left + itemRect.width / 2
        }
        return 0
      })
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !navRef.current) return
    
    const touch = e.touches[0]
    const navRect = navRef.current.getBoundingClientRect()
    const x = touch.clientX - navRect.left
    const clampedX = Math.max(30, Math.min(x, navRect.width - 30))
    setDragPosition(clampedX)
    setIndicatorPosition(clampedX)
  }, [isDragging])

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return
    
    setIsDragging(false)
    if (dragPosition !== null) {
      const closestIndex = findClosestItem(dragPosition)
      handleNavigate(closestIndex)
    }
    setDragPosition(null)
  }, [isDragging, dragPosition, findClosestItem, handleNavigate])

  // Navegacion con teclado
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    let newIndex = currentIndex
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      newIndex = Math.max(0, currentIndex - 1)
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      newIndex = Math.min(navItems.length - 1, currentIndex + 1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleNavigate(currentIndex)
      return
    } else if (e.key === 'Home') {
      e.preventDefault()
      newIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      newIndex = navItems.length - 1
    }
    
    if (newIndex !== currentIndex) {
      setSelectedIndex(newIndex)
      handleNavigate(newIndex)
    }
  }, [currentIndex, handleNavigate])

  // Event listeners globales para mouse
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleClick = (item: NavItem, index: number) => {
    setSelectedIndex(index)
    handleNavigate(index)
  }

  const itemWidth = 70

  return (
    <div 
      className="relative pt-10 pb-2"
      role="navigation"
      aria-label="Navegacion principal"
    >
      {/* Esfera indicador 3D con drag */}
      <div 
        ref={sphereRef}
        className={`absolute z-30 ${isDragging ? '' : 'transition-all duration-500 ease-out'}`}
        style={{
          left: `${indicatorPosition}px`,
          transform: "translateX(-50%)",
          top: "-2px",
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Selector de seccion"
        aria-valuemin={0}
        aria-valuemax={navItems.length - 1}
        aria-valuenow={currentIndex}
        aria-valuetext={navItems[currentIndex]?.label}
      >
        <div 
          className={`relative w-14 h-14 ${isDragging ? 'scale-110' : ''} transition-transform duration-150`}
          style={{
            filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.4))",
          }}
        >
          {/* Sombra de la esfera en el suelo */}
          <div 
            className="absolute rounded-full"
            style={{
              width: "80%",
              height: "20%",
              left: "10%",
              bottom: "-8px",
              background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
              filter: "blur(4px)",
            }}
          />
          
          {/* Esfera 3D principal */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 56 56">
            <defs>
              {/* Gradiente radial para efecto 3D de bola */}
              <radialGradient id="sphere3D" cx="35%" cy="30%" r="60%" fx="35%" fy="30%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="20%" stopColor="#f5f5f5" />
                <stop offset="50%" stopColor="#e0e0e0" />
                <stop offset="80%" stopColor="#b0b0b0" />
                <stop offset="100%" stopColor="#909090" />
              </radialGradient>
              
              {/* Gradiente para el borde metálico */}
              <linearGradient id="metalRim" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d4d4d4" />
                <stop offset="50%" stopColor="#a0a0a0" />
                <stop offset="100%" stopColor="#707070" />
              </linearGradient>
              
              {/* Filtro de sombra interna */}
              <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                <feOffset in="blur" dx="0" dy="2" result="offsetBlur" />
                <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
              </filter>
            </defs>
            
            {/* Sombra proyectada */}
            <ellipse
              cx="28"
              cy="52"
              rx="18"
              ry="4"
              fill="rgba(0,0,0,0.2)"
            />
            
            {/* Circulo base 3D */}
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="url(#sphere3D)"
              stroke="url(#metalRim)"
              strokeWidth="2"
            />
            
            {/* Reflejo principal superior */}
            <ellipse
              cx="22"
              cy="18"
              rx="10"
              ry="7"
              fill="rgba(255,255,255,0.7)"
            />
            
            {/* Reflejo secundario pequeño */}
            <ellipse
              cx="18"
              cy="14"
              rx="4"
              ry="3"
              fill="rgba(255,255,255,0.9)"
            />
            
            {/* Borde inferior oscuro para profundidad */}
            <path
              d="M 10 35 Q 28 45 46 35"
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Circulo de progreso/llenado */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="transparent"
              stroke={currentColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - fillProgress / 100)}`}
              className="transition-colors duration-300"
              style={{
                filter: `drop-shadow(0 0 4px ${currentColor}) drop-shadow(0 0 8px ${currentColor}40)`
              }}
            />
          </svg>
          
          {/* Icono central */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-colors duration-500"
            style={{ 
              color: currentColor,
              filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.3))"
            }}
          >
            {navItems[currentIndex]?.icon}
          </div>
        </div>
        
        {/* Etiqueta */}
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs font-bold whitespace-nowrap transition-colors duration-500"
          style={{ 
            color: currentColor,
            textShadow: "0 1px 2px rgba(0,0,0,0.1)"
          }}
        >
          {navItems[currentIndex]?.label}
        </div>
      </div>

      {/* Barra contenedora con efecto 3D de profundidad */}
      <div 
        ref={navRef}
        className="relative h-14 rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #e86a10 0%, #f97316 20%, #fdba74 60%, #ffffff 100%)",
          border: "3px solid #22c55e",
          boxShadow: `
            inset 0 4px 8px rgba(0,0,0,0.25),
            inset 0 2px 4px rgba(0,0,0,0.15),
            inset 0 -2px 4px rgba(255,255,255,0.3),
            0 4px 12px rgba(0,0,0,0.2),
            0 2px 4px rgba(34,197,94,0.3)
          `,
        }}
      >
        {/* Items de navegacion */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 gap-1">
          {navItems.map((item, index) => {
            const isCurrent = index === currentIndex
            
            return (
              <button
                key={item.id}
                ref={el => { itemRefs.current[index] = el }}
                onClick={() => handleClick(item, index)}
                className="relative flex items-center justify-center rounded-lg transition-opacity duration-200"
                style={{
                  width: `${itemWidth}px`,
                  height: "44px",
                  opacity: isCurrent ? 0.3 : 1,
                }}
                aria-label={item.label}
                aria-current={isCurrent ? "page" : undefined}
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
