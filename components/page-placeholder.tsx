"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface PagePlaceholderProps {
  title: string
  icon: string
  color: string
  description: string
}

export function PagePlaceholder({ title, icon, color, description }: PagePlaceholderProps) {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
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

        <div>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al selector
          </Link>
        </div>
      </div>
    </main>
  )
}
