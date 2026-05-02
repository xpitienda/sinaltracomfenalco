"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Download, Eye, X, ChevronLeft, ChevronRight, Home } from "lucide-react"
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
  const [selectedDoc, setSelectedDoc] = useState<typeof documentos[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

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
        <div className="max-w-4xl mx-auto text-center">
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
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {documentos.map((doc) => (
              <div
                key={doc.id}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.95)",
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
                    <div>
                      <h3 className="text-white font-bold text-sm md:text-base leading-tight">
                        {doc.nombre}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4">
                    {doc.descripcion}
                  </p>

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: `linear-gradient(135deg, ${doc.color}, ${doc.color}cc)`,
                        boxShadow: `0 4px 15px ${doc.color}50`
                      }}
                    >
                      <Eye className="w-5 h-5" />
                      Ver Documento
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
                </div>
              </div>
            ))}
          </div>

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

      {/* Modal para ver documento */}
      {selectedDoc && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ 
            zIndex: 9999,
            background: "rgba(0,0,0,0.9)"
          }}
        >
          {/* Botón cerrar flotante */}
          <button
            onClick={() => setSelectedDoc(null)}
            className="fixed top-4 right-4 w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-xl border-4 border-white"
            style={{ zIndex: 10000 }}
          >
            <X className="w-8 h-8" />
          </button>

          <div className="w-full max-w-5xl h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header del modal */}
            <div 
              className="flex items-center justify-between p-4 flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${selectedDoc.color}, ${selectedDoc.color}dd)`
              }}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-white" />
                <h3 className="text-white font-bold text-lg truncate">
                  {selectedDoc.nombre}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedDoc.archivo}
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-800 font-bold hover:bg-gray-100 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Descargar
                </a>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                  Cerrar
                </button>
              </div>
            </div>

            {/* Visor PDF */}
            <div className="flex-1 bg-gray-200">
              <iframe
                src={`${selectedDoc.archivo}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full"
                title={selectedDoc.nombre}
              />
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-900 flex justify-center gap-3 flex-shrink-0">
              <button
                onClick={() => setSelectedDoc(null)}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-700 transition-all"
              >
                <X className="w-5 h-5" />
                Cerrar Documento
              </button>
              <a
                href={selectedDoc.archivo}
                download
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all"
              >
                <Download className="w-5 h-5" />
                Descargar Completo
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
