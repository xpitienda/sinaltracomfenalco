"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { RadioKnob } from "@/components/radio-knob"
import { SplashModal } from "@/components/splash-modal"
import Image from "next/image"
import { ArrowUp } from "lucide-react"

function SplashPageContent() {
  const searchParams = useSearchParams()
  const skipSplash = searchParams.get("contactos") === "true"
  const [showSplash, setShowSplash] = useState(!skipSplash)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Si el splash está visible, solo mostrar el splash sin ningún fondo de la app
  if (showSplash) {
    return <SplashModal onEnter={() => setShowSplash(false)} />
  }

  // Una vez cerrado el splash, mostrar la aplicación completa
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative"
      style={{
        background: `
          radial-gradient(ellipse at top left,    #22c55e 0%,   transparent 50%),
          radial-gradient(ellipse at top right,   #fbbf24 0%,   transparent 50%),
          radial-gradient(ellipse at bottom left, #3b82f6 0%,   transparent 50%),
          radial-gradient(ellipse at bottom right,#ffffff 0%,   transparent 50%),
          linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)
        `,
      }}
    >
      {/* Logo como marca de agua en el fondo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20sin%20Fondo-NAapUer5Lo2B71a3rlZpfrAshHy9QL.jpg"
          alt="Watermark"
          width={600}
          height={600}
          className="opacity-10"
        />
      </div>

      {/* Ondas de radio de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border animate-pulse"
              style={{
                transform: `scale(${0.15 + i * 0.17})`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: "4s",
                borderColor: i % 3 === 0
                  ? "rgba(34,197,94,0.15)"
                  : i % 3 === 1
                  ? "rgba(251,191,36,0.1)"
                  : "rgba(59,130,246,0.15)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Encabezado con logo y título */}
        <header className="text-center mb-10">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div
              className="rounded-2xl p-2"
              style={{
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.5)"
              }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20sin%20Fondo-NAapUer5Lo2B71a3rlZpfrAshHy9QL.jpg"
                alt="Logo SINALTRACOMFENALCO"
                width={90}
                height={90}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Título principal en dos tonos de verde */}
          <h1
            className="text-3xl md:text-5xl font-black tracking-tight mb-3 leading-tight text-balance"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span style={{
              color: "#1a5c1a",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
              SINALTRA
            </span>
            <span style={{
              color: "#22c55e",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
              COMFENALCO
            </span>
          </h1>

          {/* Subtítulo en dos tonos de verde */}
          <p className="text-base md:text-xl font-semibold tracking-widest uppercase">
            <span style={{
              color: "#22c55e",
            }}>
              Una Expresion{" "}
            </span>
            <span style={{
              color: "#1a5c1a",
            }}>
              de Solidaridad
            </span>
          </p>

          {/* Línea decorativa */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #22c55e)" }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#fbbf24", boxShadow: "0 0 8px #fbbf24" }} />
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #22c55e)" }} />
          </div>
        </header>

        {/* Perilla de radio */}
        <RadioKnob />

        {/* Footer */}
        <footer className="mt-12 text-center text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
          <p>Haz clic y arrastra para girar - Usa las flechas del teclado - Toca y desliza en movil</p>
        </footer>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full text-white transition-all duration-300 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          boxShadow: "0 10px 30px rgba(34,197,94,0.4)"
        }}
        aria-label="Volver al inicio"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </main>
  )
}

export default function SplashPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>}>
      <SplashPageContent />
    </Suspense>
  )
}
