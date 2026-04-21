"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronRight, ArrowUp, Menu, X, Phone, Play } from "lucide-react"

// Datos del cuadro comparativo
const articulosData = [
  {
    id: 0,
    tema: "Principios y derechos fundamentales",
    data2020_2024: "Se establecen derechos laborales y sindicales",
    prorroga: "Se mantienen",
    data2025_2026: "Se mantienen",
    data2026_2027: "Se mantienen",
    analisis: "Continuidad sin regresion"
  },
  {
    id: 1,
    tema: "Campo de aplicacion",
    data2020_2024: "Afiliados a SINALTRACOMFENALCO",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 2,
    tema: "Vigencia",
    data2020_2024: "4 anos",
    prorroga: "Prorroga 1 ano",
    data2025_2026: "1 ano",
    data2026_2027: "1 ano",
    analisis: "Reduccion de vigencia (estrategico)"
  },
  {
    id: 3,
    tema: "Regimen contractual (jornadas)",
    data2020_2024: "18, 24, 30, 36, 42, 48 horas",
    prorroga: "Igual",
    data2025_2026: "18, 24, 30, 36, 42 horas",
    data2026_2027: "18, 24, 30, 36, 42 horas",
    analisis: "Ajuste tecnico"
  },
  {
    id: 4,
    tema: "Vacantes y ascensos",
    data2020_2024: "Participacion sindical",
    prorroga: "Igual",
    data2025_2026: "Se mantiene + criterios promocion",
    data2026_2027: "Se mantiene + criterios promocion",
    analisis: "Mejora movilidad laboral"
  },
  {
    id: 5,
    tema: "Debido proceso disciplinario",
    data2020_2024: "Garantizado",
    prorroga: "Igual",
    data2025_2026: "Se fortalece (doble instancia)",
    data2026_2027: "Se fortalece (doble instancia)",
    analisis: "Consolidacion"
  },
  {
    id: 6,
    tema: "Sustitucion patronal y estabilidad laboral",
    data2020_2024: "No explicita",
    prorroga: "No",
    data2025_2026: "Reubicacion en reestructuracion",
    data2026_2027: "Reubicacion en reestructuracion",
    analisis: "Nuevo logro"
  },
  {
    id: 7,
    tema: "Indemnizacion sin justa causa",
    data2020_2024: "Dias adicionales a la ley",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se conserva logro historico"
  },
  {
    id: 8,
    tema: "Incremento salarial",
    data2020_2024: "IPC o salario minimo",
    prorroga: "Se mantiene",
    data2025_2026: "Se mantiene",
    data2026_2027: "Se mantiene",
    analisis: "Proteccion del ingreso"
  },
  {
    id: 9,
    tema: "Bonificacion de Navidad",
    data2020_2024: "9 dias salario",
    prorroga: "Igual",
    data2025_2026: "9 dias salario",
    data2026_2027: "9 dias salario",
    analisis: "Se mantiene"
  },
  {
    id: 10,
    tema: "Auxilio vacaciones",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Se mejora. Para personal nivel Operativo el auxilio sera por valor de $86.800. Para personal nivel Administrativo Asistencial el auxilio sera por valor de $72.500. Para personal nivel Profesional el auxilio sera por valor de $58.000",
    data2026_2027: "Para personal nivel Operativo el auxilio sera por valor de $86.800. Para personal nivel Administrativo Asistencial el auxilio sera por valor de $72.500. Para personal nivel Profesional el auxilio sera por valor de $58.000",
    analisis: "Se mejora"
  },
  {
    id: 11,
    tema: "Continuidad derechos pre-2008",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Blindaje de derechos"
  },
  {
    id: 12,
    tema: "Prima de antiguedad",
    data2020_2024: "Escala progresiva",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 13,
    tema: "Tiempo libre por antiguedad",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "A partir de 25 anos 3 dias",
    data2026_2027: "A partir de 25 anos 3 dias",
    analisis: "Se mejora"
  },
  {
    id: 14,
    tema: "Beneficio de tiempo libre en cumpleanos y anos de servicios",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "Un (1) dia de descanso remunerado por Cumpleanos, sin perjuicio del descanso por vacaciones. Un (1) dia de descanso remunerado por ano de servicio, sin perjuicio del descanso por vacaciones.",
    data2026_2027: "Un (1) dia de descanso remunerado por Cumpleanos, sin perjuicio del descanso por vacaciones. Un (1) dia de descanso remunerado por ano de servicio, sin perjuicio del descanso por vacaciones.",
    analisis: "Nuevo logro"
  },
  {
    id: 15,
    tema: "Auxilios por pension de vejez o invalidez",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 16,
    tema: "Auxilio por nacimiento o adopcion",
    data2020_2024: "Existia",
    prorroga: "Existia",
    data2025_2026: "Paragrafo. En caso de muerte del hijo por nacer del trabajador sindicalizado despues de dos (2) meses de concebido, la Caja reconocera un auxilio no salarial, equivalente a DOSCIENTOS MIL PESOS M/cte ($200.000), valor que aumentara para el 2027 en un porcentaje igual al IPC nacional certificado por el DANE.",
    data2026_2027: "Paragrafo. En caso de muerte del hijo por nacer del trabajador sindicalizado despues de dos (2) meses de concebido, la Caja reconocera un auxilio no salarial, equivalente a DOSCIENTOS MIL PESOS M/cte ($200.000), valor que aumentara para el 2027 en un porcentaje igual al IPC nacional certificado por el DANE.",
    analisis: "Se mejora"
  },
  {
    id: 17,
    tema: "Permiso remunerado por matrimonio",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 18,
    tema: "Auxilio por muerte de familiares del trabajador",
    data2020_2024: "Existia",
    prorroga: "Existia",
    data2025_2026: "Pasa de 200.000 a 220.000 por muerte de padre o madre",
    data2026_2027: "Pasa de 200.000 a 220.000 por muerte de padre o madre",
    analisis: "Se mejora"
  },
  {
    id: 19,
    tema: "Permiso por calamidad domestica",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 20,
    tema: "Auxilio educativo",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 21,
    tema: "Auxilio por incapacidad",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 22,
    tema: "Auxilio por beneficiario con discapacidad",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "Comfenalco Antioquia reconocera al trabajador por cada beneficiario con discapacidad certificada que tenga en su grupo familiar afiliado a la Caja de Compensacion Familiar Comfenalco Antioquia hasta el segundo grado de consanguinidad un salario minimo legal vigente (1) SMLMV por ano. PARAGRAFO: Tanto el vinculo familiar, la discapacidad y la dependencia economica deberan ser acreditados.",
    data2026_2027: "Comfenalco Antioquia reconocera al trabajador por cada beneficiario con discapacidad certificada que tenga en su grupo familiar afiliado a la Caja de Compensacion Familiar Comfenalco Antioquia hasta el segundo grado de consanguinidad un salario minimo legal vigente (1) SMLMV por ano. PARAGRAFO: Tanto el vinculo familiar, la discapacidad y la dependencia economica deberan ser acreditados.",
    analisis: "Nuevo logro"
  },
  {
    id: 23,
    tema: "Credito de calamidad domestica",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 24,
    tema: "Fondo de creditos",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Credito de Vivienda pasa del 0,8% al 0,4%. Credito Multiproposito pasa del 0,7% al 0,5%",
    data2026_2027: "Credito de Vivienda pasa del 0,8% al 0,4%. Credito Multiproposito pasa del 0,7% al 0,5%",
    analisis: "Se mejora"
  },
  {
    id: 25,
    tema: "Permisos remunerados",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 26,
    tema: "Descuento a empleados",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 27,
    tema: "Cuota de aprendices",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 28,
    tema: "Subsidio alimentacion empleados",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Se ajusta al 100%",
    data2026_2027: "Se ajusta al 100%",
    analisis: "Se mejora"
  },
  {
    id: 29,
    tema: "Alimentacion y transporte en hoteles y parques",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igualmente, se suministraran medios de transporte o su valor hasta el lugar de acopio mas cercano para llegar a las residencias en los casos en que se labore hasta despues de las 10 pm o se ingrese antes de las 5 AM.",
    data2026_2027: "Igualmente, se suministraran medios de transporte o su valor hasta el lugar de acopio mas cercano para llegar a las residencias en los casos en que se labore hasta despues de las 10 pm o se ingrese antes de las 5 AM.",
    analisis: "Se mejora"
  },
  {
    id: 30,
    tema: "Vestuario institucional",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 31,
    tema: "Permiso por 24 o 31 de diciembre",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 32,
    tema: "Transporte",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 33,
    tema: "Poliza de seguro vida grupo y accidentes personales",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Paragrafo: El valor asegurado de la poliza de seguro de vida grupo y accidentes personales para los miembros de la Junta Directiva de SINALTRACOMFENALCO sera equivalente a treinta (30) salarios basicos mensuales del respectivo colaborador, conforme a las coberturas, condiciones y exclusiones vigentes en la poliza contratada a la fecha.",
    data2026_2027: "Paragrafo: El valor asegurado de la poliza de seguro de vida grupo y accidentes personales para los miembros de la Junta Directiva de SINALTRACOMFENALCO sera equivalente a treinta (30) salarios basicos mensuales del respectivo colaborador, conforme a las coberturas, condiciones y exclusiones vigentes en la poliza contratada a la fecha.",
    analisis: "Se mejora"
  },
  {
    id: 34,
    tema: "Bonos servicios/parques",
    data2020_2024: "Existian",
    prorroga: "+70 bonos adicionales",
    data2025_2026: "280 bonos",
    data2026_2027: "280 bonos",
    analisis: "Mejora bienestar"
  },
  {
    id: 35,
    tema: "Brigadas de salud",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 36,
    tema: "Reconocimiento a la polivalencia",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "La Caja establecera una categoria especifica dentro de la Gala de Reconocimientos, orientada a destacar a los colaboradores que demuestren un desempeno sobresaliente en el cumplimiento de los indicadores propios de su rol y en la ejecucion efectiva de la polivalencia formalizada por su lider. Cuando un colaborador sindicalizado por temas de polivalencia deba realizar actividades propias de otro rol en polivalencia debera contar con la dotacion y elementos de proteccion personal necesarios.",
    data2026_2027: "La Caja establecera una categoria especifica dentro de la Gala de Reconocimientos, orientada a destacar a los colaboradores que demuestren un desempeno sobresaliente en el cumplimiento de los indicadores propios de su rol y en la ejecucion efectiva de la polivalencia formalizada por su lider. Cuando un colaborador sindicalizado por temas de polivalencia deba realizar actividades propias de otro rol en polivalencia debera contar con la dotacion y elementos de proteccion personal necesarios.",
    analisis: "Nuevo logro"
  },
  {
    id: 37,
    tema: "Interrelaciones",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "Las partes acuerdan crear una comision paritaria conformada por representantes de la Caja, el Jefe del Departamento de Gestion Laboral o su delegado y dos integrantes del sindicato, Presidente y Vicepresidente, que se reuniran por lo menos una vez cada dos (2) meses con el proposito de asegurar en el marco del dialogo social, movilizar el Bienestar y Desarrollo de los colaboradores afiliados.",
    data2026_2027: "Las partes acuerdan crear una comision paritaria conformada por representantes de la Caja, el Jefe del Departamento de Gestion Laboral o su delegado y dos integrantes del sindicato, Presidente y Vicepresidente, que se reuniran por lo menos una vez cada dos (2) meses con el proposito de asegurar en el marco del dialogo social, movilizar el Bienestar y Desarrollo de los colaboradores afiliados.",
    analisis: "Nuevo logro"
  },
  {
    id: 38,
    tema: "Permiso por muerte de mascota",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "Comfenalco Antioquia reconocera a los trabajadores beneficiarios de la presente Convencion Colectiva de Trabajo dos (2) dias de calamidad domestica remunerada para atender la situacion derivada del fallecimiento de su mascota debidamente acreditada y relacionada en el censo de mascotas que para tal fin realice la Caja.",
    data2026_2027: "Comfenalco Antioquia reconocera a los trabajadores beneficiarios de la presente Convencion Colectiva de Trabajo dos (2) dias de calamidad domestica remunerada para atender la situacion derivada del fallecimiento de su mascota debidamente acreditada y relacionada en el censo de mascotas que para tal fin realice la Caja.",
    analisis: "Nuevo logro"
  },
  {
    id: 39,
    tema: "Fomento a la maternidad y paternidad",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "Durante la vigencia de la presente convencion 2026-2027 la Caja reconocera para las colaboradoras afiliadas al sindicato y beneficiarias del presente capitulo por cada mes de vida del hijo(a) (incluye hijos adoptados), a la madre trabajadora de la Caja el equivalente en horas laborales, hasta completar los nueve meses. Este beneficio se trasladara a los padres en los casos de fallecimiento de la madre.",
    data2026_2027: "Durante la vigencia de la presente convencion 2026-2027 la Caja reconocera para las colaboradoras afiliadas al sindicato y beneficiarias del presente capitulo por cada mes de vida del hijo(a) (incluye hijos adoptados), a la madre trabajadora de la Caja el equivalente en horas laborales, hasta completar los nueve meses. Este beneficio se trasladara a los padres en los casos de fallecimiento de la madre.",
    analisis: "Nuevo logro"
  },
  {
    id: 40,
    tema: "Dia de la familia",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "Comfenalco Antioquia reconocera a los trabajadores beneficiarios de la presente Convencion Colectiva de Trabajo un dia semestral remunerado denominado Dia de la Familia, con el fin de promover la integracion, el esparcimiento y el fortalecimiento de los lazos familiares. El beneficio se otorgara dos (2) veces al ano. Este dia sera programado de comun acuerdo con su lider.",
    data2026_2027: "Comfenalco Antioquia reconocera a los trabajadores beneficiarios de la presente Convencion Colectiva de Trabajo un dia semestral remunerado denominado Dia de la Familia, con el fin de promover la integracion, el esparcimiento y el fortalecimiento de los lazos familiares. El beneficio se otorgara dos (2) veces al ano. Este dia sera programado de comun acuerdo con su lider.",
    analisis: "Nuevo logro"
  },
  {
    id: 41,
    tema: "Feria de economia familiar SINALTRACOMFENALCO para el bienestar de los afiliados",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "Con el proposito de contribuir al bienestar economico, la calidad de vida y la salud de los trabajadores afiliados a SINALTRACOMFENALCO y sus familias, COMFENALCO ANTIOQUIA apoyara la realizacion de la Feria Sindical SINALTRACOMFENALCO, la cual estara orientada a facilitar el acceso a productos y servicios esenciales para el hogar y la salud.",
    data2026_2027: "Con el proposito de contribuir al bienestar economico, la calidad de vida y la salud de los trabajadores afiliados a SINALTRACOMFENALCO y sus familias, COMFENALCO ANTIOQUIA apoyara la realizacion de la Feria Sindical SINALTRACOMFENALCO, la cual estara orientada a facilitar el acceso a productos y servicios esenciales para el hogar y la salud.",
    analisis: "Nuevo logro"
  },
  {
    id: 42,
    tema: "Efecto no salarial de los beneficios",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 43,
    tema: "Auxilio sindical",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 44,
    tema: "Permisos sindicales remunerados",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 45,
    tema: "Auxilio por excluido de la convencion",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 46,
    tema: "Auxilio para medios alternativos de movilidad",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 47,
    tema: "Cartelera",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 48,
    tema: "Auxilio de prensa",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "COMFENALCO Antioquia reconocera a SINALTRACOMFENALCO un auxilio de Un Millon de pesos ($1.000.000), por una sola vez con el fin de cubrir los gastos de publicacion y divulgacion de la convencion.",
    data2026_2027: "COMFENALCO Antioquia reconocera a SINALTRACOMFENALCO un auxilio de Un Millon de pesos ($1.000.000), por una sola vez con el fin de cubrir los gastos de publicacion y divulgacion de la convencion.",
    analisis: "Nuevo logro"
  },
  {
    id: 49,
    tema: "Seguimiento de la aplicacion de la Convencion Colectiva de Trabajo",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  }
]

export default function ComparativoConvencionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("presentacion")
  const [comparativoExpanded, setComparativoExpanded] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)

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

  const toggleArticle = (id: number) => {
    setExpandedArticle(expandedArticle === id ? null : id)
    setActiveSection("comparativo")
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f8fafc" }}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-0"
        } overflow-hidden`}
        style={{
          backgroundColor: "#1e3a5f",
          boxShadow: "4px 0 15px rgba(0,0,0,0.15)"
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 flex flex-col items-center border-b border-white/10">
            <div className="bg-white rounded-xl p-2 mb-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20sin%20Fondo-NAapUer5Lo2B71a3rlZpfrAshHy9QL.jpg"
                alt="SINALTRACOMFENALCO"
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>
            <h2 className="text-white font-bold text-sm text-center">SINALTRACOMFENALCO</h2>
            <p className="text-white/60 text-xs">Una Expresion de Solidaridad</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {/* Presentacion */}
            <button
              onClick={() => setActiveSection("presentacion")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeSection === "presentacion"
                  ? "bg-emerald-500 text-white"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="font-medium">Presentacion</span>
            </button>

            {/* Convencion - Video Button */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all text-white/80 hover:bg-white/10 hover:text-white"
            >
              <Play className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Convencion</span>
            </button>

            {/* Comparativo Convencion - Dropdown */}
            <div className="mb-2">
              <button
                onClick={() => setComparativoExpanded(!comparativoExpanded)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  activeSection === "comparativo"
                    ? "bg-orange-500 text-white"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  <span className="font-medium">Comparativo Convencion</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    comparativoExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Articles Dropdown */}
              {comparativoExpanded && (
                <div className="mt-2 ml-4 max-h-96 overflow-y-auto rounded-lg bg-white/5 p-2">
                  {articulosData.map((articulo) => (
                    <button
                      key={articulo.id}
                      onClick={() => toggleArticle(articulo.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                        expandedArticle === articulo.id
                          ? "bg-blue-500 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="font-semibold text-orange-300">{articulo.id}.</span>{" "}
                      {articulo.tema.length > 35
                        ? articulo.tema.substring(0, 35) + "..."
                        : articulo.tema}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Contactos Button */}
          <div className="p-4 border-t border-white/10">
            <Link
              href="/?contactos=true"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                boxShadow: "0 4px 15px rgba(59,130,246,0.4)"
              }}
            >
              <Phone className="w-5 h-5" />
              Contactos
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        {/* Top Header */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-6 py-3"
          style={{
            backgroundColor: "#1e3a5f",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
          }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3">
              <span className="text-white font-bold text-lg">
                Sistema de Datos
              </span>
              <span className="text-emerald-400 font-semibold">SINALTRACOMFENALCO</span>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
          >
            SINALTRACOMFENALCO
          </Link>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {activeSection === "presentacion" && (
            <section className="animate-in fade-in duration-500">
              <div
                className="rounded-2xl p-8 mb-6"
                style={{
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  boxShadow: "0 10px 40px rgba(34,197,94,0.3)"
                }}
              >
                <h1 className="text-4xl font-bold text-white mb-4">
                  Convencion Colectiva de Trabajo
                </h1>
                <p className="text-white/90 text-xl">
                  SINALTRACOMFENALCO - Comfenalco Antioquia
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Acerca de la Convencion
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    La Convencion Colectiva de Trabajo es el resultado del proceso de negociacion entre SINALTRACOMFENALCO y Comfenalco Antioquia, que establece las condiciones laborales, beneficios y derechos de los trabajadores afiliados al sindicato.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 rounded-full bg-orange-500"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Comparativo por Periodos
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Este sistema presenta un cuadro comparativo detallado que muestra la evolucion de los beneficios y derechos desde el periodo 2020-2024, pasando por la prorroga, hasta las convenciones 2025-2026 y 2026-2027.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    50 Articulos Analizados
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Cada uno de los 50 articulos de la convencion ha sido analizado y comparado, destacando los logros obtenidos, las mejoras implementadas y los nuevos beneficios conquistados.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 rounded-full bg-amber-500"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Analisis de Logros
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    La columna de analisis identifica claramente los logros: beneficios que se mantienen, mejoras conseguidas y nuevos derechos incorporados a favor de los trabajadores.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setComparativoExpanded(true)
                    setActiveSection("comparativo")
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    boxShadow: "0 10px 30px rgba(249,115,22,0.4)"
                  }}
                >
                  Ver Comparativo Completo
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </section>
          )}

          {activeSection === "comparativo" && (
            <section className="animate-in fade-in duration-500">
              <div
                className="rounded-2xl p-6 mb-6"
                style={{
                  background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  boxShadow: "0 10px 40px rgba(249,115,22,0.3)"
                }}
              >
                <h1 className="text-3xl font-bold text-white mb-2">
                  Cuadro Comparativo de la Convencion
                </h1>
                <p className="text-white/90">
                  Selecciona un articulo del menu lateral para ver su detalle
                </p>
              </div>

              {expandedArticle !== null ? (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-in slide-in-from-bottom duration-300">
                  <div
                    className="p-6"
                    style={{ backgroundColor: "#1e3a5f" }}
                  >
                    <h2 className="text-2xl font-bold text-white">
                      <span className="text-orange-400">Articulo {articulosData[expandedArticle].id}:</span>{" "}
                      {articulosData[expandedArticle].tema}
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="grid gap-4">
                      {/* 2020-2024 */}
                      <div className="rounded-xl p-5 border-l-4 border-emerald-500 bg-emerald-50">
                        <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          2020 - 2024
                        </h4>
                        <p className="text-gray-700">{articulosData[expandedArticle].data2020_2024}</p>
                      </div>

                      {/* Prorroga */}
                      <div className="rounded-xl p-5 border-l-4 border-blue-500 bg-blue-50">
                        <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          PRORROGA
                        </h4>
                        <p className="text-gray-700">{articulosData[expandedArticle].prorroga}</p>
                      </div>

                      {/* 2025-2026 */}
                      <div className="rounded-xl p-5 border-l-4 border-orange-500 bg-orange-50">
                        <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          2025 - 2026
                        </h4>
                        <p className="text-gray-700">{articulosData[expandedArticle].data2025_2026}</p>
                      </div>

                      {/* 2026-2027 */}
                      <div className="rounded-xl p-5 border-l-4 border-purple-500 bg-purple-50">
                        <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          2026 - 2027
                        </h4>
                        <p className="text-gray-700">
                          {articulosData[expandedArticle].data2026_2027}
                        </p>
                      </div>

                      {/* Analisis */}
                      <div
                        className="rounded-xl p-5 mt-2"
                        style={{
                          background: "linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%)"
                        }}
                      >
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                          ANALISIS (LOGRO)
                        </h4>
                        <p className="text-amber-300 font-semibold text-lg">
                          {articulosData[expandedArticle].analisis}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <ChevronRight className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    Selecciona un Articulo
                  </h3>
                  <p className="text-gray-500">
                    Despliega el menu &quot;Comparativo Convencion&quot; en la barra lateral y selecciona uno de los 50 articulos para ver su informacion detallada.
                  </p>
                </div>
              )}

              {/* Quick Navigation */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
                {articulosData.slice(0, 10).map((articulo) => (
                  <button
                    key={articulo.id}
                    onClick={() => toggleArticle(articulo.id)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      expandedArticle === articulo.id
                        ? "bg-orange-500 text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-orange-50 shadow"
                    }`}
                  >
                    <span className="font-bold text-sm">Art. {articulo.id}</span>
                    <p className="text-xs mt-1 truncate opacity-80">
                      {articulo.tema}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

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

      {/* Video Modal */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Cerrar video"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Video Player */}
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Convencion-LnFUdbIeJ8O0CGkfZ3sOhl7CZlUB7O.mp4"
              controls
              autoPlay
              className="w-full aspect-video"
            >
              Tu navegador no soporta el elemento de video.
            </video>

            {/* Title */}
            <div className="p-4 bg-gradient-to-r from-emerald-600 to-emerald-500">
              <h3 className="text-white font-bold text-lg text-center">Convencion SINALTRACOMFENALCO</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
