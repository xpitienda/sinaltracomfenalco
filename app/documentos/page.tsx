"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Download, X, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"
import { ModernNavbar } from "@/components/modern-navbar"

// Datos del cuadro comparativo
const cuadroComparativoData = [
  { no: 0, articulo: "Principios y derechos fundamentales", periodo2020: "Se establecen derechos laborales y sindicales", prorroga: "Se mantienen", periodo2026: "Se mantienen", analisis: "Continuidad sin regresión" },
  { no: 1, articulo: "Campo de aplicación", periodo2020: "Afiliados a SINALTRACOMFENALCO", prorroga: "Igual", periodo2026: "Igual", analisis: "Se mantiene" },
  { no: 2, articulo: "Vigencia", periodo2020: "4 años", prorroga: "Prórroga 1 año", periodo2026: "1 año", analisis: "Reducción de vigencia" },
  { no: 3, articulo: "Reconocimiento sindical", periodo2020: "Reconocimiento pleno", prorroga: "Se mantiene", periodo2026: "Se mantiene", analisis: "Fortalecimiento" },
  { no: 4, articulo: "Permisos sindicales", periodo2020: "Permisos remunerados", prorroga: "Se mantienen", periodo2026: "Se amplían", analisis: "Mejora significativa" },
  { no: 5, articulo: "Fuero sindical", periodo2020: "Protección especial", prorroga: "Se mantiene", periodo2026: "Se fortalece", analisis: "Mayor protección" },
  { no: 6, articulo: "Cuota sindical", periodo2020: "Descuento automático", prorroga: "Se mantiene", periodo2026: "Se mantiene", analisis: "Continuidad" },
  { no: 7, articulo: "Auxilios educativos", periodo2020: "Auxilio para estudios", prorroga: "Se mantiene", periodo2026: "Se incrementa", analisis: "Mejora económica" },
  { no: 8, articulo: "Prima de antigüedad", periodo2020: "Prima según años", prorroga: "Se mantiene", periodo2026: "Se mejora escala", analisis: "Beneficio mejorado" },
  { no: 9, articulo: "Bonificación navideña", periodo2020: "Bonificación diciembre", prorroga: "Se mantiene", periodo2026: "Se incrementa", analisis: "Mayor valor" },
  { no: 10, articulo: "Auxilio de transporte", periodo2020: "Auxilio mensual", prorroga: "Se mantiene", periodo2026: "Ajuste por inflación", analisis: "Actualización" },
  { no: 11, articulo: "Dotación", periodo2020: "3 dotaciones anuales", prorroga: "Se mantiene", periodo2026: "Se mantiene calidad", analisis: "Continuidad" },
  { no: 12, articulo: "Capacitación", periodo2020: "Programas de formación", prorroga: "Se mantienen", periodo2026: "Se amplían programas", analisis: "Más oportunidades" },
  { no: 13, articulo: "Salud ocupacional", periodo2020: "Programas de SST", prorroga: "Se mantienen", periodo2026: "Se fortalecen", analisis: "Mayor cobertura" },
  { no: 14, articulo: "Licencias remuneradas", periodo2020: "Licencias por eventos", prorroga: "Se mantienen", periodo2026: "Se amplían días", analisis: "Mejor beneficio" },
  { no: 15, articulo: "Vacaciones", periodo2020: "15 días hábiles", prorroga: "Se mantiene", periodo2026: "Se mantiene", analisis: "Sin cambios" },
  { no: 16, articulo: "Prima de vacaciones", periodo2020: "Prima adicional", prorroga: "Se mantiene", periodo2026: "Se incrementa", analisis: "Mejora" },
  { no: 17, articulo: "Auxilio de defunción", periodo2020: "Auxilio por fallecimiento", prorroga: "Se mantiene", periodo2026: "Se incrementa valor", analisis: "Mayor apoyo" },
  { no: 18, articulo: "Préstamos", periodo2020: "Líneas de crédito", prorroga: "Se mantienen", periodo2026: "Mejores tasas", analisis: "Condiciones favorables" },
  { no: 19, articulo: "Bienestar social", periodo2020: "Programas de bienestar", prorroga: "Se mantienen", periodo2026: "Se amplían", analisis: "Más beneficios" },
]

// Datos de la convención colectiva
const convencionData = [
  { articulo: 1, titulo: "Partes y Reconocimiento", contenido: "COMFENALCO ANTIOQUIA reconoce a SINALTRACOMFENALCO como organización sindical representativa de los trabajadores." },
  { articulo: 2, titulo: "Campo de Aplicación", contenido: "La presente convención se aplica a todos los trabajadores afiliados a SINALTRACOMFENALCO que laboran en COMFENALCO ANTIOQUIA." },
  { articulo: 3, titulo: "Vigencia", contenido: "La presente Convención Colectiva de Trabajo tendrá una vigencia de un (1) año, comprendido entre el 1 de enero de 2026 y el 31 de diciembre de 2027." },
  { articulo: 4, titulo: "Principios Fundamentales", contenido: "Las partes se comprometen a respetar los derechos fundamentales del trabajo, la libertad sindical y la negociación colectiva." },
  { articulo: 5, titulo: "Estabilidad Laboral", contenido: "La empresa garantiza la estabilidad laboral de los trabajadores sindicalizados, respetando el debido proceso en cualquier actuación disciplinaria." },
  { articulo: 6, titulo: "Permisos Sindicales", contenido: "Se otorgarán permisos remunerados para actividades sindicales, asambleas, capacitaciones y reuniones de la junta directiva." },
  { articulo: 7, titulo: "Fuero Sindical", contenido: "Se garantiza la protección especial a los trabajadores aforados, conforme a la legislación laboral colombiana." },
  { articulo: 8, titulo: "Cuota Sindical", contenido: "La empresa descontará automáticamente la cuota sindical ordinaria y extraordinaria autorizada por los trabajadores afiliados." },
  { articulo: 9, titulo: "Auxilio Educativo", contenido: "Se otorgará auxilio educativo para trabajadores y sus hijos, cubriendo educación básica, media y superior." },
  { articulo: 10, titulo: "Prima de Antigüedad", contenido: "Los trabajadores recibirán una prima de antigüedad según escala establecida por años de servicio." },
  { articulo: 11, titulo: "Bonificación Navideña", contenido: "Se pagará bonificación especial en el mes de diciembre a todos los trabajadores sindicalizados." },
  { articulo: 12, titulo: "Auxilio de Transporte Extralegal", contenido: "Además del auxilio legal, se reconocerá un auxilio de transporte extralegal mensual." },
  { articulo: 13, titulo: "Dotación", contenido: "Se entregarán tres dotaciones anuales de excelente calidad a los trabajadores que devenguen hasta dos SMLMV." },
  { articulo: 14, titulo: "Capacitación y Formación", contenido: "La empresa facilitará programas de capacitación y desarrollo profesional para los trabajadores." },
  { articulo: 15, titulo: "Salud y Seguridad en el Trabajo", contenido: "Se implementarán programas de prevención de riesgos laborales y promoción de la salud." },
  { articulo: 16, titulo: "Licencias Remuneradas", contenido: "Se concederán licencias remuneradas por calamidad doméstica, matrimonio, nacimiento de hijos y otras causales." },
  { articulo: 17, titulo: "Vacaciones", contenido: "Los trabajadores disfrutarán de 15 días hábiles de vacaciones remuneradas por cada año de servicio." },
  { articulo: 18, titulo: "Prima de Vacaciones", contenido: "Se pagará una prima adicional de vacaciones equivalente a un porcentaje del salario." },
  { articulo: 19, titulo: "Auxilio por Defunción", contenido: "En caso de fallecimiento del trabajador o familiares directos, se otorgará auxilio económico." },
  { articulo: 20, titulo: "Préstamos", contenido: "Los trabajadores tendrán acceso a líneas de crédito con tasas preferenciales." },
  { articulo: 21, titulo: "Bienestar Social", contenido: "Se desarrollarán programas de bienestar que incluyen actividades recreativas, culturales y deportivas." },
  { articulo: 22, titulo: "Comité de Convivencia", contenido: "Funcionará un comité de convivencia laboral para prevenir el acoso laboral." },
  { articulo: 23, titulo: "Solución de Conflictos", contenido: "Las diferencias se resolverán mediante diálogo directo, y de ser necesario, mecanismos de conciliación." },
  { articulo: 24, titulo: "Disposiciones Finales", contenido: "Las condiciones aquí pactadas son mínimas y no excluyen otros beneficios legales o extralegales." },
]

const documentos = [
  {
    id: "cuadro-comparativo",
    nombre: "Cuadro Comparativo Convención",
    archivo: "/documentos/cuadro_comparativo_convencion.pdf",
    descripcion: "Comparación entre convenciones 2020-2024, 2025-2026 y 2026-2027",
    color: "#3b82f6", // Azul
    bgColor: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    textColor: "text-white",
  },
  {
    id: "convencion-colectiva",
    nombre: "Convención Colectiva SINALTRACOMFENALCO 2026-2027",
    archivo: "/documentos/Convencion_Colectiva_SINALTRACOMFENALCO_2026_2027.pdf",
    descripcion: "Documento completo de la Convención Colectiva de Trabajo vigente (24 páginas)",
    color: "#6b7280", // Gris
    bgColor: "bg-gray-500",
    hoverColor: "hover:bg-gray-600",
    textColor: "text-white",
  }
]

export default function DocumentosPage() {
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null)

  return (
    <div 
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #3b82f6 0%, #6b7280 35%, #ffffff 70%, #e5e7eb 100%)"
      }}
    >
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <ModernNavbar />
      </div>

      {/* Header */}
      <div className="pt-6 pb-4 px-4">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/comparativo-convencion"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 text-gray-700 font-medium hover:bg-white transition-colors mb-4 text-sm shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Índice
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center drop-shadow-lg">
            Documentos SINALTRACOMFENALCO
          </h1>
        </div>
      </div>

      {/* Contenedor de documentos - 2 botones en una línea */}
      <div className="px-4 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentos.map((doc) => (
            <div 
              key={doc.id} 
              className="rounded-xl shadow-lg overflow-hidden"
              style={{ 
                backgroundColor: expandedDoc === doc.id ? "#ffffff" : doc.color,
                border: `3px solid ${doc.color}`
              }}
            >
              
              {/* Botón colapsado del documento */}
              <button
                onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                className={`w-full p-4 flex items-center gap-4 transition-colors text-left ${
                  expandedDoc === doc.id 
                    ? "bg-white hover:bg-gray-50" 
                    : `${doc.bgColor} ${doc.hoverColor}`
                }`}
              >
                <div 
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    expandedDoc === doc.id ? "bg-gray-100" : "bg-white/20"
                  }`}
                >
                  <FileText className={`w-6 h-6 ${expandedDoc === doc.id ? "text-gray-500" : "text-white"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-base ${expandedDoc === doc.id ? "text-gray-800" : "text-white"}`}>
                    {doc.nombre}
                  </h3>
                  <p className={`text-sm ${expandedDoc === doc.id ? "text-gray-500" : "text-white/80"}`}>
                    {doc.descripcion}
                  </p>
                </div>
                <div className={`flex items-center gap-1 flex-shrink-0 ${
                  expandedDoc === doc.id ? "text-amber-600" : "text-white"
                }`}>
                  <span className="text-sm font-medium">
                    {expandedDoc === doc.id ? "Cerrar" : "Abrir"}
                  </span>
                  {expandedDoc === doc.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Contenido expandido */}
              {expandedDoc === doc.id && (
                <div className="border-t border-gray-200">
                  {/* Header del contenido expandido */}
                  <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
                    <h4 className="font-bold text-gray-800 text-lg">
                      {doc.id === "cuadro-comparativo" 
                        ? "Cuadro Comparativo Convención Colectiva" 
                        : "Convención Colectiva de Trabajo 2026-2027"}
                    </h4>
                    <div className="flex items-center gap-3">
                      <a
                        href={doc.archivo}
                        download
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Descargar PDF Completo
                      </a>
                      <button
                        onClick={() => setExpandedDoc(null)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Tabla de contenido */}
                  <div className="overflow-x-auto">
                    {doc.id === "cuadro-comparativo" ? (
                      <table className="w-full border-collapse min-w-[700px]">
                        <thead>
                          <tr className="bg-emerald-600 text-white">
                            <th className="p-3 text-left font-bold border-r border-emerald-500 w-12">No</th>
                            <th className="p-3 text-left font-bold border-r border-emerald-500">Artículo / Tema</th>
                            <th className="p-3 text-left font-bold border-r border-emerald-500">2020-2024</th>
                            <th className="p-3 text-left font-bold border-r border-emerald-500 w-28">Prórroga 2025-2026</th>
                            <th className="p-3 text-left font-bold border-r border-emerald-500">2026-2027</th>
                            <th className="p-3 text-left font-bold">Análisis</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cuadroComparativoData.map((row, index) => (
                            <tr 
                              key={row.no} 
                              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-emerald-50 transition-colors`}
                            >
                              <td className="p-3 border-t border-gray-200 text-center">{row.no}</td>
                              <td className="p-3 border-t border-gray-200 font-medium text-gray-800">{row.articulo}</td>
                              <td className="p-3 border-t border-gray-200 text-gray-600">{row.periodo2020}</td>
                              <td className="p-3 border-t border-gray-200 text-gray-600">{row.prorroga}</td>
                              <td className="p-3 border-t border-gray-200 text-emerald-700">{row.periodo2026}</td>
                              <td className="p-3 border-t border-gray-200">
                                <span className="inline-block px-2 py-1 rounded bg-amber-100 text-amber-800 text-xs">
                                  {row.analisis}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <table className="w-full border-collapse min-w-[500px]">
                        <thead>
                          <tr className="bg-blue-600 text-white">
                            <th className="p-3 text-left font-bold border-r border-blue-500 w-20">Artículo</th>
                            <th className="p-3 text-left font-bold border-r border-blue-500 w-48">Título</th>
                            <th className="p-3 text-left font-bold">Contenido</th>
                          </tr>
                        </thead>
                        <tbody>
                          {convencionData.map((row, index) => (
                            <tr 
                              key={row.articulo} 
                              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                            >
                              <td className="p-3 border-t border-gray-200 text-center font-bold text-blue-600">{row.articulo}</td>
                              <td className="p-3 border-t border-gray-200 font-medium text-gray-800">{row.titulo}</td>
                              <td className="p-3 border-t border-gray-200 text-gray-600">{row.contenido}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
