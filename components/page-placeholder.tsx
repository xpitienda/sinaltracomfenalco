"use client"

import { ModernNavbar } from "@/components/modern-navbar"

interface PagePlaceholderProps {
  title: string
  icon: string
  color: string
  description: string
}

export function PagePlaceholder({ title, icon, color, description }: PagePlaceholderProps) {
  return (
    <main className="min-h-screen bg-background flex flex-col relative">
      {/* Header con Navbar */}
      <header 
        className="sticky top-0 z-40 px-2 md:px-6 py-1"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #15803d 50%, #1e40af 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
        }}
      >
        <div className="max-w-7xl mx-auto">
          <ModernNavbar activeSection="presentacion" compact={true} />
        </div>
      </header>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {/* Fondo decorativo */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`
          }}
        />

        <div className="relative z-10 text-center">
          <span className="text-8xl mb-6 block">{icon}</span>
          <h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ color }}
          >
            {title}
          </h1>
          <p className="text-muted-foreground text-xl mb-8 max-w-md">
            {description}
          </p>
          <div 
            className="inline-block px-6 py-3 rounded-full text-foreground/60 border border-current mb-8"
            style={{ borderColor: color, color }}
          >
            Página en construcción
          </div>
        </div>
      </div>
    </main>
  )
}
