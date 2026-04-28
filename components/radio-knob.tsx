"use client"

import { useState, useRef, useCallback, useEffect } from "react"

interface NavItem {
  label: string
  href: string
  color: string
  description?: string
  isExternal?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/inicio", color: "#22c55e", description: "Página principal", isExternal: false },
  { label: "Web", href: "https://www.sinaltracomfenalco.com/", color: "#00d9ff", description: "Sitio Web Oficial", isExternal: true },
  { label: "Mutual", href: "https://www.asmucom.com/", color: "#fbbf24", description: "ASMUCOM - Asociación Mutual", isExternal: true },
  { label: "MinTrabajo", href: "https://www.mintrabajo.gov.co/web/guest/inicio", color: "#3b82f6", description: "Ministerio del Trabajo", isExternal: true },
  { label: "Facebook", href: "https://www.facebook.com/Sinaltracomfenalco2011", color: "#1877f2", description: "Síguenos en Facebook", isExternal: true },
  { label: "WhatsApp", href: "https://wa.me/573164721077", color: "#25d366", description: "Escríbenos al WhatsApp", isExternal: true },
  { label: "CGT", href: "https://cgtcolombia.org/", color: "#ef4444", description: "Confederación General del Trabajo", isExternal: true },
  { label: "Contacto", href: "/contacto", color: "#a855f7", description: "Información de contacto", isExternal: false },
]

export function RadioKnob() {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const startAngleRef = useRef(0)
  const startRotationRef = useRef(0)

  const STEP_ANGLE = 360 / NAV_ITEMS.length

  const getAngleFromCenter = useCallback((clientX: number, clientY: number) => {
    if (!knobRef.current) return 0
    const rect = knobRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI)
  }, [])

  const updateSelectedIndex = useCallback((newRotation: number) => {
    let normalizedRotation = ((newRotation % 360) + 360) % 360
    const index = Math.round(normalizedRotation / STEP_ANGLE) % NAV_ITEMS.length
    setSelectedIndex(index)
  }, [STEP_ANGLE])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    startAngleRef.current = getAngleFromCenter(e.clientX, e.clientY)
    startRotationRef.current = rotation
  }, [getAngleFromCenter, rotation])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    const currentAngle = getAngleFromCenter(e.clientX, e.clientY)
    const deltaAngle = currentAngle - startAngleRef.current
    const newRotation = startRotationRef.current + deltaAngle
    setRotation(newRotation)
    updateSelectedIndex(newRotation)
  }, [isDragging, getAngleFromCenter, updateSelectedIndex])

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      const targetRotation = selectedIndex * STEP_ANGLE
      setRotation(targetRotation)
    }
  }, [isDragging, selectedIndex, STEP_ANGLE])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    setIsDragging(true)
    startAngleRef.current = getAngleFromCenter(touch.clientX, touch.clientY)
    startRotationRef.current = rotation
  }, [getAngleFromCenter, rotation])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const touch = e.touches[0]
    const currentAngle = getAngleFromCenter(touch.clientX, touch.clientY)
    const deltaAngle = currentAngle - startAngleRef.current
    const newRotation = startRotationRef.current + deltaAngle
    setRotation(newRotation)
    updateSelectedIndex(newRotation)
  }, [isDragging, getAngleFromCenter, updateSelectedIndex])

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      const targetRotation = selectedIndex * STEP_ANGLE
      setRotation(targetRotation)
    }
  }, [isDragging, selectedIndex, STEP_ANGLE])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      const newIndex = (selectedIndex + 1) % NAV_ITEMS.length
      setSelectedIndex(newIndex)
      setRotation(newIndex * STEP_ANGLE)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      const newIndex = (selectedIndex - 1 + NAV_ITEMS.length) % NAV_ITEMS.length
      setSelectedIndex(newIndex)
      setRotation(newIndex * STEP_ANGLE)
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      const item = NAV_ITEMS[selectedIndex]
      if (item.isExternal) {
        window.open(item.href, "_blank", "noopener,noreferrer")
      } else {
        window.location.href = item.href
      }
    }
  }, [selectedIndex, STEP_ANGLE])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove, { passive: false })
      window.addEventListener("touchend", handleTouchEnd)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  const handleNavigate = useCallback(() => {
    const item = NAV_ITEMS[selectedIndex]
    if (item.isExternal) {
      window.open(item.href, "_blank", "noopener,noreferrer")
    } else {
      window.location.href = item.href
    }
  }, [selectedIndex])

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Indicador de seccion actual */}
      <div 
        className="text-center transition-all duration-500"
        style={{ color: NAV_ITEMS[selectedIndex].color }}
      >
        <h2 
          className="text-4xl md:text-5xl font-bold tracking-widest uppercase"
          style={{
            textShadow: `0 0 30px ${NAV_ITEMS[selectedIndex].color}80, 0 0 60px ${NAV_ITEMS[selectedIndex].color}40`
          }}
        >
          {NAV_ITEMS[selectedIndex].label}
        </h2>
      </div>

      {/* Contenedor principal con perspectiva 3D */}
      <div 
        className="relative w-80 h-80 md:w-[420px] md:h-[420px]"
        style={{ perspective: "1000px" }}
      >
        {/* Marcadores de posicion - Botones clickeables */}
        {NAV_ITEMS.map((item, index) => {
          const angle = (index * STEP_ANGLE - 90) * (Math.PI / 180)
          const radius = 175
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          const isActive = index === selectedIndex
          const isHovered = index === hoveredIndex

          const handleNavigation = (e: React.MouseEvent) => {
            e.stopPropagation()
            if (item.isExternal) {
              window.open(item.href, "_blank", "noopener,noreferrer")
            } else {
              window.location.href = item.href
            }
          }

          return (
            <div
              key={item.label}
              className="absolute flex flex-col items-center transition-all duration-500 group z-20"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Punto indicador */}
              <div
                className="w-4 h-4 rounded-full transition-all duration-500 cursor-pointer"
                style={{ 
                  backgroundColor: item.color,
                  boxShadow: isActive 
                    ? `0 0 20px ${item.color}, 0 0 40px ${item.color}, 0 0 60px ${item.color}80` 
                    : isHovered 
                    ? `0 0 15px ${item.color}, 0 0 30px ${item.color}80`
                    : `0 0 5px ${item.color}40`,
                  transform: isActive ? "scale(1.5)" : isHovered ? "scale(1.3)" : "scale(1)",
                  opacity: isActive ? 1 : isHovered ? 0.9 : 0.5
                }}
                onClick={() => {
                  setSelectedIndex(index)
                  setRotation(index * STEP_ANGLE)
                }}
              />
              
              {/* Boton con nombre - Clickeable para navegar */}
              <button
                onClick={handleNavigation}
                className="mt-2 px-3 py-1.5 rounded-lg font-bold text-xs tracking-wider transition-all duration-300 uppercase whitespace-nowrap hover:scale-110 active:scale-95"
                style={{ 
                  backgroundColor: isActive || isHovered ? item.color : "rgba(255,255,255,0.9)",
                  color: isActive || isHovered ? "#000" : "#666",
                  boxShadow: isActive 
                    ? `0 4px 15px ${item.color}60, 0 0 20px ${item.color}40` 
                    : isHovered
                    ? `0 4px 12px ${item.color}50`
                    : "0 2px 8px rgba(0,0,0,0.15)",
                  border: `2px solid ${item.color}`,
                  minWidth: "80px",
                  textAlign: "center",
                }}
              >
                {item.label}
              </button>
            </div>
          )
        })}

        {/* Sombra profunda del fondo */}
        <div 
          className="absolute inset-6 rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000 100%)",
            boxShadow: `
              inset 0 0 60px rgba(0,0,0,0.9),
              inset 0 0 100px rgba(0,0,0,0.8),
              0 25px 80px rgba(0,0,0,0.8),
              0 10px 30px rgba(0,0,0,0.6)
            `
          }}
        />

        {/* Anillo metalico exterior - Panel del amplificador */}
        <div 
          className="absolute inset-8 rounded-full"
          style={{
            background: `
              linear-gradient(145deg, 
                #4a4a4a 0%, 
                #2a2a2a 20%, 
                #1a1a1a 40%,
                #2a2a2a 60%,
                #3a3a3a 80%,
                #2a2a2a 100%
              )
            `,
            boxShadow: `
              inset 0 2px 4px rgba(255,255,255,0.1),
              inset 0 -2px 4px rgba(0,0,0,0.5),
              0 0 0 2px #1a1a1a,
              0 0 0 4px #333,
              0 20px 60px rgba(0,0,0,0.7)
            `
          }}
        />

        {/* Cavidad donde se asienta la perilla */}
        <div 
          className="absolute inset-12 rounded-full"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, #1a1a1a 0%, #0a0a0a 70%, #050505 100%)
            `,
            boxShadow: `
              inset 0 8px 30px rgba(0,0,0,0.9),
              inset 0 -4px 15px rgba(255,255,255,0.03),
              inset 0 0 50px rgba(0,0,0,0.8)
            `
          }}
        />

        {/* Borde elevado interior */}
        <div 
          className="absolute inset-14 rounded-full"
          style={{
            background: `linear-gradient(180deg, #333 0%, #1a1a1a 50%, #0f0f0f 100%)`,
            boxShadow: `
              inset 0 2px 3px rgba(255,255,255,0.1),
              0 -2px 10px rgba(0,0,0,0.5)
            `
          }}
        />

        {/* PERILLA PRINCIPAL - Efecto niquelado 3D */}
        <div
          ref={knobRef}
          tabIndex={0}
          role="slider"
          aria-label="Selector de navegacion"
          aria-valuemin={0}
          aria-valuemax={NAV_ITEMS.length - 1}
          aria-valuenow={selectedIndex}
          aria-valuetext={NAV_ITEMS[selectedIndex].label}
          className="absolute inset-[72px] md:inset-[90px] rounded-full cursor-grab active:cursor-grabbing focus:outline-none focus:ring-4 focus:ring-white/30 select-none"
          style={{
            background: `
              conic-gradient(
                from 0deg,
                #c0c0c0 0deg,
                #e8e8e8 30deg,
                #9a9a9a 60deg,
                #d0d0d0 90deg,
                #8a8a8a 120deg,
                #c8c8c8 150deg,
                #a0a0a0 180deg,
                #e0e0e0 210deg,
                #909090 240deg,
                #d8d8d8 270deg,
                #888888 300deg,
                #c0c0c0 330deg,
                #c0c0c0 360deg
              )
            `,
            boxShadow: `
              0 15px 35px rgba(0,0,0,0.6),
              0 5px 15px rgba(0,0,0,0.4),
              0 0 0 3px #666,
              0 0 0 5px #333,
              inset 0 3px 8px rgba(255,255,255,0.5),
              inset 0 -3px 8px rgba(0,0,0,0.3)
            `,
            transform: `rotate(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transformStyle: "preserve-3d"
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onKeyDown={handleKeyDown}
        >
          {/* Capa de brillo superior */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 100% 70% at 30% 15%, rgba(255,255,255,0.6) 0%, transparent 50%),
                radial-gradient(ellipse 80% 50% at 70% 85%, rgba(0,0,0,0.3) 0%, transparent 50%)
              `
            }}
          />

          {/* Lineas de textura de la perilla (grip) */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
            style={{
              background: `
                repeating-conic-gradient(
                  from 0deg,
                  rgba(255,255,255,0.08) 0deg 2deg,
                  transparent 2deg 4deg
                )
              `
            }}
          />

          {/* Indicador LED de posicion */}
          <div 
            className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-8 rounded-full transition-all duration-300"
            style={{ 
              background: `linear-gradient(180deg, ${NAV_ITEMS[selectedIndex].color} 0%, ${NAV_ITEMS[selectedIndex].color}80 100%)`,
              boxShadow: `
                0 0 15px ${NAV_ITEMS[selectedIndex].color},
                0 0 30px ${NAV_ITEMS[selectedIndex].color}80,
                0 0 45px ${NAV_ITEMS[selectedIndex].color}40,
                inset 0 -2px 4px rgba(0,0,0,0.3)
              ` 
            }}
          />

          {/* Elevacion central de la perilla */}
          <div 
            className="absolute inset-[30%] rounded-full"
            style={{
              background: `
                radial-gradient(circle at 35% 35%, #e0e0e0 0%, #b0b0b0 40%, #909090 70%, #707070 100%)
              `,
              boxShadow: `
                inset 0 3px 10px rgba(255,255,255,0.5),
                inset 0 -3px 10px rgba(0,0,0,0.2),
                0 4px 15px rgba(0,0,0,0.3)
              `
            }}
          >
            {/* Centro mas elevado */}
            <div 
              className="absolute inset-[20%] rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 40% 40%, #d0d0d0 0%, #a0a0a0 50%, #808080 100%)
                `,
                boxShadow: `
                  inset 0 2px 6px rgba(255,255,255,0.4),
                  inset 0 -2px 6px rgba(0,0,0,0.15),
                  0 2px 8px rgba(0,0,0,0.2)
                `
              }}
            />
          </div>
        </div>

        {/* Texto "MASTER VOLUME" estilo amplificador */}
        <div 
          className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-[0.15em] text-zinc-400 uppercase whitespace-nowrap"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
        >
          SINALTRACOMFENALCO
        </div>
      </div>

      {/* Boton de navegacion */}
      <button
        onClick={handleNavigate}
        className="px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${NAV_ITEMS[selectedIndex].color} 0%, ${NAV_ITEMS[selectedIndex].color}cc 100%)`,
          color: "#000",
          boxShadow: `
            0 8px 30px ${NAV_ITEMS[selectedIndex].color}60,
            0 4px 15px ${NAV_ITEMS[selectedIndex].color}40,
            inset 0 1px 2px rgba(255,255,255,0.3)
          `
        }}
      >
        Ir a {NAV_ITEMS[selectedIndex].label}
      </button>

      {/* Instrucciones */}
      <p className="text-zinc-500 text-sm text-center max-w-sm">
        Gira la perilla con el mouse, el dedo, o usa las flechas del teclado
      </p>
    </div>
  )
}
