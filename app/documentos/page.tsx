"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Download, Eye, X, ChevronDown, ChevronUp, Home } from "lucide-react"
import { ModernNavbar } from "@/components/modern-navbar"

const documentos = [
  {
    id: 1,
    nombre: "Cuadro Comparativo Convención",
    archivo: "/documentos/cuadro_comparativo_convencion.pdf",
    descripcion: "Cuadro comparativo de la convención colectiva por períodos 2020-2024, Prórroga, 2025-2026 y 2026-2027",
    color: "#22c55e"
  },
  {
    id: 2,
    nombre: "Convención Colectiva SINALTRACOMFENALCO 2026-2027",
    archivo: "/documentos/Convencion_Colectiva_SINALTRACOMFENALCO_2026_2027.pdf",
    descripcion: "Documento completo de la Convención Colectiva de Trabajo 2026-2027 (24 páginas)",
    color: "#3b82f6"
  }
]

export default function DocumentosPage() {
  const [expandedDoc, setExpandedDoc] = useState<number | null>(null)

  const toggleDocument = (docId: number) => {
    setExpandedDoc(expandedDoc === docId ? null : docId)
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        background: `
          linear-gradient(135deg, 
            #22c55e 0%, 
            #84cc16 15%, 
            #facc15 30%, 
            #ef4444 45%, 
            #6b7280 60%, 
            #3b82f6 75%, 
            #22c55e 100%
          )
        `
      }}
    >
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <ModernNavbar />
      </div>

      {/* Header */}
      <div className="pt-8 pb-6 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-4"
            style={{
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
            }}
          >
            <FileText className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 via-amber-500 to-blue-600 bg-clip-text text-transparent">
              Documentos SINALTRACOMFENALCO
            </h1>
          </div>
          <p className="text-white/90 text-lg font-medium drop-shadow-lg">
            Descarga y consulta los documentos oficiales de la Convención Colectiva
          </p>
        </div>
      </div>

      {/* Contenedor de documentos */}
      <div className="px-4 pb-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {documentos.map((doc) => (
            <div
              key={doc.id}
              className="rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.98)",
                boxShadow: `
                  0 20px 40px rgba(0,0,0,0.2),
                  inset 0 1px 0 rgba(255,255,255,0.5)
                `
              }}
            >
              {/* Header del documento */}
              <div 
                className="p-4"
                style={{
                  background: `linear-gradient(135deg, ${doc.color}, ${doc.color}dd)`
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm md:text-lg leading-tight">
                      {doc.nombre}
                    </h3>
                    <p className="text-white/80 text-xs md:text-sm mt-1">
                      {doc.descripcion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="p-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => toggleDocument(doc.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: expandedDoc === doc.id 
                      ? "linear-gradient(135deg, #ef4444, #dc2626)" 
                      : `linear-gradient(135deg, ${doc.color}, ${doc.color}cc)`,
                    boxShadow: expandedDoc === doc.id 
                      ? "0 4px 15px rgba(239,68,68,0.4)"
                      : `0 4px 15px ${doc.color}50`
                  }}
                >
                  {expandedDoc === doc.id ? (
                    <>
                      <ChevronUp className="w-5 h-5" />
                      Cerrar Documento
                    </>
                  ) : (
                    <>
                      <Eye className="w-5 h-5" />
                      Ver Documento
                    </>
                  )}
                </button>
                
                <a
                  href={doc.archivo}
                  download
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #f97316, #ea580c)",
                    boxShadow: "0 4px 15px rgba(249,115,22,0.4)"
                  }}
                >
                  <Download className="w-5 h-5" />
                  Descargar PDF
                </a>
              </div>

              {/* Contenido del documento expandido */}
              {expandedDoc === doc.id && (
                <div className="animate-in slide-in-from-top duration-300">
                  {/* Barra de herramientas del visor */}
                  <div 
                    className="flex items-center justify-between px-4 py-2 border-t border-b"
                    style={{ 
                      borderColor: `${doc.color}30`,
                      background: `${doc.color}10`
                    }}
                  >
                    <span className="text-sm font-medium text-gray-600">
                      Visualizando: {doc.nombre}
                    </span>
                    <div className="flex gap-2">
                      <a
                        href={doc.archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Pantalla Completa
                      </a>
                      <button
                        onClick={() => setExpandedDoc(null)}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cerrar
                      </button>
                    </div>
                  </div>

                  {/* Visor PDF embebido */}
                  <div 
                    className="w-full bg-gray-800"
                    style={{ height: "80vh" }}
                  >
                    <object
                      data={`${doc.archivo}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                      type="application/pdf"
                      className="w-full h-full"
                    >
                      <embed
                        src={`${doc.archivo}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                        type="application/pdf"
                        className="w-full h-full"
                      />
                      {/* Fallback para navegadores sin soporte de PDF */}
                      <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-8 text-center">
                        <FileText className="w-20 h-20 text-gray-400 mb-4" />
                        <h4 className="text-xl font-bold text-gray-700 mb-2">
                          No se puede mostrar el PDF en este navegador
                        </h4>
                        <p className="text-gray-500 mb-6">
                          Puedes descargar el documento o abrirlo en una nueva pestaña
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                          <a
                            href={doc.archivo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all"
                          >
                            <Eye className="w-5 h-5" />
                            Abrir en Nueva Pestaña
                          </a>
                          <a
                            href={doc.archivo}
                            download
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all"
                          >
                            <Download className="w-5 h-5" />
                            Descargar PDF
                          </a>
                        </div>
                      </div>
                    </object>
                  </div>

                  {/* Barra inferior del visor */}
                  <div 
                    className="flex items-center justify-center gap-4 p-4"
                    style={{ background: `${doc.color}10` }}
                  >
                    <button
                      onClick={() => setExpandedDoc(null)}
                      className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-700 transition-all"
                    >
                      <ChevronUp className="w-5 h-5" />
                      Cerrar Documento
                    </button>
                    <a
                      href={doc.archivo}
                      download
                      className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Descargar Completo
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Botón volver */}
          <div className="mt-8 text-center">
            <Link
              href="/comparativo-convencion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-emerald-700 bg-white hover:bg-gray-100 transition-all shadow-lg"
            >
              <Home className="w-5 h-5" />
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
