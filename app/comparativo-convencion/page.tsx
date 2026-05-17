"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronRight, ArrowUp, Menu, X, Phone, Play, Info } from "lucide-react"
import { ModernNavbar } from "@/components/modern-navbar"

// Datos del cuadro comparativo
const articulosData = [
  {
    id: 0,
    tema: "Principios y derechos fundamentales",
    data2020_2024: "Se establecen derechos laborales y sindicales",
    prorroga: "Se mantienen",
    data2025_2026: "Se mantienen",
    data2026_2027: "Se mantienen",
    analisis: "Continuidad sin regresión"
  },
  {
    id: 1,
    tema: "Campo de aplicación",
    data2020_2024: "Afiliados a SINALTRACOMFENALCO",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se mantiene"
  },
  {
    id: 2,
    tema: "Vigencia",
    data2020_2024: "4 años",
    prorroga: "Prórroga 1 año",
    data2025_2026: "Prórroga 1 año",
    data2026_2027: "1 año",
    analisis: "Reducción de vigencia (estratégico)"
  },
  {
    id: 3,
    tema: "Régimen contractual (jornadas)",
    data2020_2024: "18, 24, 30, 36, 42, 48 horas",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "18, 24, 30, 36, 42 horas",
    analisis: "Ajuste técnico"
  },
  {
    id: 4,
    tema: "Vacantes y ascensos",
    data2020_2024: "Participación sindical",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Se mantiene + criterios promoción",
    analisis: "Mejora movilidad laboral"
  },
  {
    id: 5,
    tema: "Debido proceso disciplinario",
    data2020_2024: "Garantizado",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Se fortalece (doble instancia)",
    analisis: "Consolidación"
  },
  {
    id: 6,
    tema: "Sustitución patronal y estabilidad laboral",
    data2020_2024: "No explícita",
    prorroga: "No",
    data2025_2026: "No",
    data2026_2027: "Reubicación en reestructuración",
    analisis: "Nuevo logro"
  },
  {
    id: 7,
    tema: "Indemnización sin justa causa",
    data2020_2024: "Días adicionales a la ley",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Igual",
    analisis: "Se conserva logro histórico"
  },
  {
    id: 8,
    tema: "Incremento salarial",
    data2020_2024: "IPC o salario mínimo",
    prorroga: "Se mantiene",
    data2025_2026: "Se mantiene",
    data2026_2027: "Se mantiene",
    analisis: "Protección del ingreso"
  },
  {
    id: 9,
    tema: "Bonificación de Navidad",
    data2020_2024: "9 días salario",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "9 días salario",
    analisis: "Se mantiene"
  },
  {
    id: 10,
    tema: "Auxilio vacaciones",
    data2020_2024: "Existía",
    prorroga: "Igual",
    data2025_2026: "Igual",
    data2026_2027: "Se mejora. Para personal nivel Operativo el auxilio será por valor de $86.800. Para personal nivel Administrativo Asistencial el auxilio será por valor de $72.500. Para personal nivel Profesional el auxilio será por valor de $58.000",
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
    data2025_2026: "Igual",
    data2026_2027: "A partir de 25 anos 3 dias",
    analisis: "Se mejora"
  },
  {
    id: 14,
    tema: "Beneficio de tiempo libre en cumpleanos y anos de servicios",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "No existia",
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
    data2025_2026: "Existia",
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
    data2025_2026: "Existia",
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
    data2025_2026: "No existia",
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
    data2025_2026: "Igual",
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
    data2025_2026: "Igual",
    data2026_2027: "Se ajusta al 100%",
    analisis: "Se mejora"
  },
  {
    id: 29,
    tema: "Alimentacion y transporte en hoteles y parques",
    data2020_2024: "Existia",
    prorroga: "Igual",
    data2025_2026: "Igual",
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
    data2025_2026: "Igual",
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
    data2025_2026: "No existia",
    data2026_2027: "La Caja establecera una categoria especifica dentro de la Gala de Reconocimientos, orientada a destacar a los colaboradores que demuestren un desempeno sobresaliente en el cumplimiento de los indicadores propios de su rol y en la ejecucion efectiva de la polivalencia formalizada por su lider. Cuando un colaborador sindicalizado por temas de polivalencia deba realizar actividades propias de otro rol en polivalencia debera contar con la dotacion y elementos de proteccion personal necesarios.",
    analisis: "Nuevo logro"
  },
  {
    id: 37,
    tema: "Interrelaciones",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "No existia",
    data2026_2027: "Las partes acuerdan crear una comision paritaria conformada por representantes de la Caja, el Jefe del Departamento de Gestion Laboral o su delegado y dos integrantes del sindicato, Presidente y Vicepresidente, que se reuniran por lo menos una vez cada dos (2) meses con el proposito de asegurar en el marco del dialogo social, movilizar el Bienestar y Desarrollo de los colaboradores afiliados.",
    analisis: "Nuevo logro"
  },
  {
    id: 38,
    tema: "Permiso por muerte de mascota",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "No existia",
    data2026_2027: "Comfenalco Antioquia reconocera a los trabajadores beneficiarios de la presente Convencion Colectiva de Trabajo dos (2) dias de calamidad domestica remunerada para atender la situacion derivada del fallecimiento de su mascota debidamente acreditada y relacionada en el censo de mascotas que para tal fin realice la Caja.",
    analisis: "Nuevo logro"
  },
  {
    id: 39,
    tema: "Fomento a la maternidad y paternidad",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "No existia",
    data2026_2027: "Durante la vigencia de la presente convencion 2026-2027 la Caja reconocera para las colaboradoras afiliadas al sindicato y beneficiarias del presente capitulo por cada mes de vida del hijo(a) (incluye hijos adoptados), a la madre trabajadora de la Caja el equivalente en horas laborales, hasta completar los nueve meses. Este beneficio se trasladara a los padres en los casos de fallecimiento de la madre.",
    analisis: "Nuevo logro"
  },
  {
    id: 40,
    tema: "Dia de la familia",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "No existia",
    data2026_2027: "Comfenalco Antioquia reconocera a los trabajadores beneficiarios de la presente Convencion Colectiva de Trabajo un dia semestral remunerado denominado Dia de la Familia, con el fin de promover la integracion, el esparcimiento y el fortalecimiento de los lazos familiares. El beneficio se otorgara dos (2) veces al ano. Este dia sera programado de comun acuerdo con su lider.",
    analisis: "Nuevo logro"
  },
  {
    id: 41,
    tema: "Feria de economia familiar SINALTRACOMFENALCO para el bienestar de los afiliados",
    data2020_2024: "No existia",
    prorroga: "No existia",
    data2025_2026: "No existia",
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
    data2025_2026: "No existia",
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

// Componente de Presentacion con botones 3D
function PresentacionSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  const [activeButton, setActiveButton] = useState<number | null>(null)
  const [colorToggle, setColorToggle] = useState(false)

  // Efecto de colores cambiantes
  useEffect(() => {
    const interval = setInterval(() => {
      setColorToggle(prev => !prev)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const buttons = [
    {
      id: 0,
      title: "Acerca de la Convencion",
      content: "La Convencion Colectiva de Trabajo es el resultado del proceso de negociacion entre SINALTRACOMFENALCO y Comfenalco Antioquia, que establece las condiciones laborales, beneficios y derechos de los trabajadores afiliados al sindicato.",
      color: "#22c55e"
    },
    {
      id: 1,
      title: "Comparativo por Periodos",
      content: "Este sistema presenta un cuadro comparativo detallado que muestra la evolucion de los beneficios y derechos desde el periodo 2020-2024, pasando por la prorroga, hasta las convenciones 2025-2026 y 2026-2027.",
      color: "#f97316"
    },
    {
      id: 2,
      title: "Articulos Analizados",
      content: "Cada uno de los 50 articulos de la convencion ha sido analizado y comparado, destacando los logros obtenidos, las mejoras implementadas y los nuevos beneficios conquistados.",
      color: "#3b82f6"
    },
    {
      id: 3,
      title: "Analisis de Logros",
      content: "La columna de analisis identifica claramente los logros: beneficios que se mantienen, mejoras conseguidas y nuevos derechos incorporados a favor de los trabajadores.",
      color: "#f59e0b"
    }
  ]

  return (
    <section className="animate-in fade-in duration-500">
      {/* Header con texto animado */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          boxShadow: "0 10px 40px rgba(34,197,94,0.3)"
        }}
      >
        <h1 
          className="text-2xl md:text-3xl font-bold mb-2 transition-colors duration-500"
          style={{ color: colorToggle ? "#fff" : "#fde68a" }}
        >
          Convencion Colectiva de Trabajo
        </h1>
        <p 
          className="text-base transition-colors duration-500"
          style={{ color: colorToggle ? "#fde68a" : "#fff" }}
        >
          SINALTRACOMFENALCO - Comfenalco Antioquia
        </p>
      </div>

      {/* Botones 3D en fila */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {buttons.map((btn, index) => (
          <button
            key={btn.id}
            onClick={() => setActiveButton(activeButton === btn.id ? null : btn.id)}
            className={`relative p-3 rounded-xl text-left transition-all duration-300 active:scale-95 ${
              activeButton === btn.id ? 'scale-105' : 'hover:scale-102'
            }`}
            style={{
              background: activeButton === btn.id 
                ? `linear-gradient(145deg, ${btn.color}, ${btn.color}dd)`
                : "linear-gradient(145deg, #ffffff, #f0f0f0)",
              boxShadow: activeButton === btn.id
                ? `0 8px 25px ${btn.color}50, inset 0 -2px 5px rgba(0,0,0,0.1)`
                : "0 6px 15px rgba(0,0,0,0.1), inset 0 -2px 5px rgba(0,0,0,0.05)",
              transform: activeButton === btn.id ? "translateY(-2px)" : "translateY(0)",
              border: `2px solid ${activeButton === btn.id ? btn.color : '#e5e7eb'}`,
            }}
          >
            {/* Indicador de color */}
            <div 
              className="w-4 h-4 rounded-full mb-2 transition-all duration-300"
              style={{ 
                backgroundColor: btn.color,
                boxShadow: activeButton === btn.id ? `0 0 10px ${btn.color}` : "none"
              }}
            />
            {/* Titulo */}
            <h3 
              className={`text-xs font-bold leading-tight transition-colors duration-300 ${
                activeButton === btn.id ? 'text-white' : 'text-gray-800'
              }`}
              style={{
                color: activeButton !== btn.id && colorToggle && index % 2 === 0 ? '#22c55e' 
                     : activeButton !== btn.id && !colorToggle && index % 2 === 0 ? '#f97316'
                     : activeButton !== btn.id && colorToggle && index % 2 !== 0 ? '#f97316'
                     : activeButton !== btn.id && !colorToggle && index % 2 !== 0 ? '#22c55e'
                     : 'white'
              }}
            >
              {btn.title}
            </h3>
            
            {/* Efecto 3D inferior */}
            <div 
              className="absolute bottom-0 left-2 right-2 h-1 rounded-b-xl"
              style={{
                background: `linear-gradient(to top, ${btn.color}40, transparent)`
              }}
            />
          </button>
        ))}
      </div>

      {/* Contenido expandido del boton activo */}
      {activeButton !== null && (
        <div 
          className="bg-white rounded-2xl p-5 shadow-lg mb-6 animate-in slide-in-from-top duration-300"
          style={{
            borderLeft: `4px solid ${buttons[activeButton].color}`
          }}
        >
          <div className="flex items-start gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${buttons[activeButton].color}20` }}
            >
              <div 
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: buttons[activeButton].color }}
              />
            </div>
            <div>
              <h3 
                className="text-lg font-bold mb-2"
                style={{ color: buttons[activeButton].color }}
              >
                {buttons[activeButton].title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {buttons[activeButton].content}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Boton Ver Comparativo */}
      <div className="text-center">
        <button
          onClick={() => onNavigate("comparativo")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            boxShadow: "0 8px 25px rgba(249,115,22,0.4)"
          }}
        >
          Ver Comparativo Completo
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}

// Imagenes para todos los articulos (URLs de GitHub y blob para compatibilidad)
// Formato: C[capitulo]_[articulo].png - Ejemplo: C3_4.png es para Articulo 4
const articuloImages: { [key: number]: string } = {
  0: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/C1-rHu2QkPRtZIpEbjsF78FcFm62TQwxu.png",
  1: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/C2A-ffqXawgJGXmgJRWY7E8XDBIx2PZFtD.png",
  2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/C2B-ZJPMmJtaK1EASXSJm4weOkoqOCEDl7.png",
  3: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C3A.png",
  4: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C3_4.png",
  5: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C3_5.png",
  6: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C3_6.png",
  7: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C3_7.png",
  8: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C4_8.png",
  9: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C4_9.png",
  10: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C4_10.png",
  11: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C4_11.png",
  12: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C4_12.png",
  13: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C4_13.png",
  14: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C4_14.png",
  15: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C5_15.png",
  16: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C5_16.png",
  17: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C5_17.png",
  18: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C5_18.png",
  19: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C5_19.png",
  20: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C5_20.png",
  21: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C5_21.png",
  22: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C5_22.png",
  23: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C6_23.png",
  24: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C6_24.png",
  25: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C7_25.png",
  26: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_26.png",
  27: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_27.png",
  28: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_28.png",
  29: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_29.png",
  30: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_30.png",
  31: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_31.png",
  32: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_32.png",
  33: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_33.png",
  34: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_34.png",
  35: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_35.png",
  36: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_36.png",
  37: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_37.png",
  38: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_38.png",
  39: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_39.png",
  40: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_40.png",
  41: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C8_41.png",
  42: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C9_42.png",
  43: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C10_43.png",
  44: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C10_44.png",
  45: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C10_45.png",
  46: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C10_46.png",
  47: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C10_47.png",
  48: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C10_48.png",
  49: "https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/C10_49.png",
}

// Componente de linea de tiempo animada
function TimelineArticle({ articulo, articleIndex }: { articulo: typeof articulosData[0], articleIndex: number }) {
  const showImage = articleIndex >= 0 && articleIndex <= 49 && articuloImages[articleIndex] !== undefined
  const imageUrl = articuloImages[articleIndex] || ""
  const [timelineProgress, setTimelineProgress] = useState(0)
  const [imageZoomed, setImageZoomed] = useState(false)
  const [showImageDelayed, setShowImageDelayed] = useState(false)
  
  useEffect(() => {
    // Reset estados
    setTimelineProgress(0)
    setShowImageDelayed(false)
    
    // Animacion de llenado de linea de tiempo (4 segundos total, 1 por cada seccion)
    const duration = 4000
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / duration) * 100, 100)
      setTimelineProgress(progress)
      
      if (progress < 100) {
        requestAnimationFrame(animate)
      } else if (showImage) {
        // Mostrar imagen 1 segundo despues de completar Logro Alcanzado
        setTimeout(() => {
          setShowImageDelayed(true)
        }, 1000)
      }
    }
    
    requestAnimationFrame(animate)
  }, [articulo.id, showImage])
  
  // Calcular que secciones estan visibles segun el progreso
  const section1Visible = timelineProgress >= 0
  const section2Visible = timelineProgress >= 25
  const section3Visible = timelineProgress >= 50
  const section4Visible = timelineProgress >= 75
  const section5Visible = timelineProgress >= 100

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-in slide-in-from-bottom duration-300">
      <div className="p-6" style={{ backgroundColor: "#1e3a5f" }}>
        <h2 className="text-2xl font-bold text-white">
          <span className="text-orange-400">Articulo {articulo.id}:</span>{" "}
          {articulo.tema}
        </h2>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Linea de tiempo a la izquierda */}
          <div className="flex-1 order-1 md:order-1">
            <div className="relative">
              {/* Linea vertical de tiempo - fondo gris */}
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200 rounded-full"></div>
              
              {/* Linea vertical de tiempo - llenado animado */}
              <div 
                className="absolute left-4 top-0 w-1 rounded-full transition-all duration-300"
                style={{
                  height: `${timelineProgress}%`,
                  background: "linear-gradient(to bottom, #22c55e 0%, #3b82f6 25%, #f97316 50%, #a855f7 75%, #fbbf24 100%)"
                }}
              ></div>
              
              <div className="space-y-6 pl-12">
                {/* 2020-2024 */}
                <div 
                  className={`relative transition-all duration-500 ${section1Visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                >
                  <div className={`absolute -left-8 top-2 w-5 h-5 rounded-full border-4 border-white shadow-lg z-10 transition-all duration-300 ${timelineProgress >= 20 ? 'bg-emerald-500 scale-110' : 'bg-gray-300'}`}></div>
                  <div className="rounded-xl p-5 border-l-4 border-emerald-500 bg-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-emerald-800 mb-2">2020 - 2024</h4>
                    <p className="text-gray-700">{articulo.data2020_2024}</p>
                  </div>
                </div>

                {/* Prorroga 2025-2026 (columna unificada) */}
                <div 
                  className={`relative transition-all duration-500 ${section2Visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: '250ms' }}
                >
                  <div className={`absolute -left-8 top-2 w-5 h-5 rounded-full border-4 border-white shadow-lg z-10 transition-all duration-300 ${timelineProgress >= 50 ? 'bg-blue-500 scale-110' : 'bg-gray-300'}`}></div>
                  <div className="rounded-xl p-5 border-l-4 border-blue-500 bg-blue-50 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-blue-800 mb-2">PRORROGA 2025-2026</h4>
                    <p className="text-gray-700">{articulo.data2025_2026}</p>
                  </div>
                </div>

                {/* 2026-2027 */}
                <div 
                  className={`relative transition-all duration-500 ${section3Visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: '500ms' }}
                >
                  <div className={`absolute -left-8 top-2 w-5 h-5 rounded-full border-4 border-white shadow-lg z-10 transition-all duration-300 ${timelineProgress >= 75 ? 'bg-purple-500 scale-110' : 'bg-gray-300'}`}></div>
                  <div className="rounded-xl p-5 border-l-4 border-purple-500 bg-purple-50 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-purple-800 mb-2">2026 - 2027</h4>
                    <p className="text-gray-700">{articulo.data2026_2027}</p>
                  </div>
                </div>

                {/* Analisis/Logro */}
                <div 
                  className={`relative transition-all duration-500 ${section4Visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: '750ms' }}
                >
                  <div className={`absolute -left-8 top-2 w-5 h-5 rounded-full border-4 border-white shadow-lg z-10 transition-all duration-300 ${timelineProgress >= 100 ? 'bg-amber-400 scale-125 animate-pulse' : 'bg-gray-300'}`}></div>
                  <div
                    className="rounded-xl p-5 shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%)"
                    }}
                  >
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      LOGRO ALCANZADO
                    </h4>
                    <p className="text-amber-300 font-semibold text-lg">
                      {articulo.analisis}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen del capitulo - Abajo en movil (despues de Logro), derecha en desktop */}
          {showImage && showImageDelayed && (
            <div className="w-full md:w-80 flex-shrink-0 order-3 md:order-2 mt-6 md:mt-0">
              <div 
                className="md:sticky md:top-4 rounded-2xl overflow-hidden shadow-xl border-4 border-amber-400 cursor-pointer hover:shadow-2xl transition-all duration-500 bg-white animate-in fade-in slide-in-from-bottom"
                onClick={() => setImageZoomed(!imageZoomed)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={`Artículo ${articleIndex}: ${articulo.tema}`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="eager"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-center text-sm font-medium">
                    Toca para ampliar
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de imagen ampliada */}
      {imageZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2"
          onClick={() => setImageZoomed(false)}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={() => setImageZoomed(false)}
          >
            <button
              onClick={() => setImageZoomed(false)}
              className="absolute top-2 right-2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
            >
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="rounded-lg overflow-hidden bg-white max-w-full max-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={`Artículo ${articleIndex}: ${articulo.tema}`}
                style={{ maxWidth: '100%', maxHeight: '90vh', width: 'auto', height: 'auto', display: 'block' }}
                loading="eager"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ComparativoConvencionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("presentacion")
  const [comparativoExpanded, setComparativoExpanded] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Función para cerrar el video
  const closeVideoModal = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setShowVideoModal(false)
    // Limpiar URL
    window.history.replaceState({}, '', '/comparativo-convencion')
  }, [])

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

            {/* Video Button */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all text-white/80 hover:bg-white/10 hover:text-white"
            >
              <Play className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Video</span>
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
                      {articulo.tema}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cosechando Bienestar - Link */}
            <Link
              href="/cosechando-bienestar"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all text-white/80 hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-blue-500/20 hover:text-white group"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400"></div>
              <span className="font-medium bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-blue-300">
                Cosechando Bienestar
              </span>
            </Link>

            {/* Consulta - Link */}
            <Link
              href="/consulta.html"
              target="_blank"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all text-white/80 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 hover:text-white group"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400"></div>
              <span className="font-medium bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent group-hover:from-amber-300 group-hover:to-orange-300">
                Consulta
              </span>
            </Link>

            {/* Documentos - Link */}
            <Link
              href="/documentos"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all text-white/80 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:text-white group"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
              <span className="font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300">
                Documentos
              </span>
            </Link>

            {/* Feria de Economía Familiar - Link */}
            <Link
              href="/feria-economia"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all text-white/80 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-rose-500/20 hover:text-white group"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400"></div>
              <span className="font-medium bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent group-hover:from-pink-300 group-hover:to-rose-300">
                Feria de Economía Familiar
              </span>
            </Link>

            {/* ASMUCOM - MUTUAL - Link externo */}
            <a
              href="https://www.asmucom.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all text-white/80 hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-cyan-500/20 hover:text-white group"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"></div>
              <span className="font-medium bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-teal-300 group-hover:to-cyan-300">
                ASMUCOM - MUTUAL
              </span>
            </a>

            {/* Contactos Button - dentro del nav */}
            <Link
              href="/?contactos=true"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-white transition-all hover:scale-105 mt-3"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                boxShadow: "0 4px 15px rgba(59,130,246,0.4)"
              }}
            >
              <Phone className="w-5 h-5" />
              Contactos
            </Link>
            
            {/* Acerca de... Button - dentro del nav */}
            <button
              onClick={() => setShowAboutModal(true)}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-white transition-all hover:scale-105 mt-3"
              style={{
                background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
                boxShadow: "0 4px 15px rgba(107,114,128,0.4)"
              }}
            >
              <Info className="w-5 h-5" />
              Acerca de...
            </button>
          </nav>
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
            
{/* Modern Navbar con indicador circular - visible en todas las pantallas */}
<div className="block">
<ModernNavbar
                activeSection={activeSection} 
                onSectionChange={(section) => {
                  setActiveSection(section)
                  if (section === "comparativo") {
                    setComparativoExpanded(true)
                  }
                }} 
              />
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
            <PresentacionSection 
              onNavigate={(section) => {
                if (section === "comparativo") {
                  setComparativoExpanded(true)
                }
                setActiveSection(section)
              }}
            />
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
                <TimelineArticle
                  articulo={articulosData[expandedArticle]}
                  articleIndex={expandedArticle}
                />
              ) : (
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <Image
                    src="/images/Logros.png"
                    alt="Convención Colectiva 2026-2027: Nuevos Logros para Tu Bienestar"
                    width={900}
                    height={600}
                    className="w-full h-auto rounded-xl"
                    priority
                  />
                </div>
              )}

              {/* Quick Navigation - All 50 Articles */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
                {articulosData.map((articulo) => (
                  <button
                    key={articulo.id}
                    onClick={() => toggleArticle(articulo.id)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      expandedArticle === articulo.id
                        ? "bg-orange-500 text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-orange-50 shadow"
                    }`}
                  >
                    <span className="font-bold text-sm">{articulo.id}. {articulo.tema.length > 20 ? articulo.tema.substring(0, 20) + "..." : articulo.tema}</span>
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
          className="fixed inset-0 flex items-start md:items-center justify-center bg-black/95 p-2 pt-2 md:p-4"
          style={{ zIndex: 9999 }}
          onClick={closeVideoModal}
        >
          {/* Boton X flotante en esquina superior derecha */}
          <button
            onClick={closeVideoModal}
            className="fixed top-2 right-2 md:top-4 md:right-4 w-10 h-10 md:w-14 md:h-14 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-xl border-2 md:border-4 border-white"
            style={{ zIndex: 10000 }}
            aria-label="Cerrar video"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div 
            className="relative w-full max-w-4xl bg-black rounded-xl md:rounded-2xl overflow-hidden shadow-2xl mt-10 md:mt-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-600 to-emerald-500">
              <h3 className="text-white font-bold text-lg">Convencion SINALTRACOMFENALCO 2026-2027</h3>
              <button
                onClick={closeVideoModal}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-emerald-700 font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
                Cerrar
              </button>
            </div>

            {/* Video Player */}
            <video
              ref={videoRef}
              key="video-convencion"
              controls
              autoPlay
              playsInline
              preload="auto"
              className="w-full aspect-video bg-black"
            >
              <source 
                src="https://raw.githubusercontent.com/xpitienda/sinaltracomfenalco/main/Convenci%C3%B3n%20(1).mp4" 
                type="video/mp4" 
              />
              Tu navegador no soporta el elemento de video.
            </video>

            {/* Footer con botones de navegacion */}
            <div className="p-4 bg-gray-900 flex flex-wrap justify-center gap-3">
              <button
                onClick={closeVideoModal}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-700 transition-all shadow-lg"
              >
                <X className="w-5 h-5" />
                Salir del Video
              </button>
              <button
                onClick={() => {
                  closeVideoModal()
                  window.location.href = "/"
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg"
              >
                Ir a Inicio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div
          className="fixed inset-0 flex items-start justify-start bg-black/70 p-2 pt-4"
          style={{ zIndex: 9999 }}
          onClick={() => setShowAboutModal(false)}
        >
          <div 
            className="relative rounded-2xl shadow-2xl w-72 overflow-visible"
            style={{ 
              background: '#FFF8DC',
              borderWidth: '6px',
              borderColor: 'transparent',
              borderStyle: 'solid'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Efecto de borde electrico multicolor girando - capa externa */}
            <div 
              className="absolute -inset-2 rounded-3xl pointer-events-none"
              style={{
                background: `conic-gradient(from var(--angle), 
                  #0066FF 0%, #00BFFF 5%, #0066FF 10%, transparent 15%,
                  #FFD700 25%, #FFA500 30%, #FFD700 35%, transparent 40%,
                  #8B4513 50%, #D2691E 55%, #8B4513 60%, transparent 65%,
                  #00FF00 75%, #32CD32 80%, #00FF00 85%, transparent 90%,
                  transparent 100%
                )`,
                filter: 'blur(3px)',
                animation: 'rotateBorder 4s steps(4, end) infinite'
              }}
            />
            {/* Efecto de borde electrico multicolor - capa media con ondas */}
            <div 
              className="absolute -inset-1.5 rounded-2xl pointer-events-none"
              style={{
                background: `conic-gradient(from var(--angle), 
                  #0066FF 0%, #00BFFF 3%, #0066FF 6%, #00BFFF 9%, transparent 12%,
                  #FFD700 25%, #FFA500 28%, #FFD700 31%, #FFA500 34%, transparent 37%,
                  #8B4513 50%, #D2691E 53%, #8B4513 56%, #D2691E 59%, transparent 62%,
                  #00FF00 75%, #32CD32 78%, #00FF00 81%, #32CD32 84%, transparent 87%,
                  transparent 100%
                )`,
                boxShadow: '0 0 20px #0066FF, 0 0 20px #FFD700, 0 0 20px #8B4513, 0 0 20px #00FF00',
                animation: 'rotateBorder 4s steps(4, end) infinite'
              }}
            />
            {/* Capa interna de ondas electricas */}
            <div 
              className="absolute -inset-1 rounded-2xl pointer-events-none"
              style={{
                background: `conic-gradient(from var(--angle), 
                  #0066FF 0%, transparent 2%, #00BFFF 4%, transparent 6%, #0066FF 8%, transparent 12%,
                  #FFD700 25%, transparent 27%, #FFA500 29%, transparent 31%, #FFD700 33%, transparent 37%,
                  #8B4513 50%, transparent 52%, #D2691E 54%, transparent 56%, #8B4513 58%, transparent 62%,
                  #00FF00 75%, transparent 77%, #32CD32 79%, transparent 81%, #00FF00 83%, transparent 87%,
                  transparent 100%
                )`,
                animation: 'rotateBorder 4s steps(4, end) infinite, electricWave 0.3s linear infinite'
              }}
            />
            {/* Fondo crema interno para cubrir el gradiente */}
            <div className="absolute inset-0 rounded-xl bg-[#FFF8DC]" />
            <style jsx>{`
              @property --angle {
                syntax: '<angle>';
                initial-value: 0deg;
                inherits: false;
              }
              @keyframes rotateBorder {
                0% { --angle: 0deg; }
                25% { --angle: 90deg; }
                50% { --angle: 180deg; }
                75% { --angle: 270deg; }
                100% { --angle: 360deg; }
              }
              @keyframes electricWave {
                0%, 100% { filter: blur(1px) brightness(1); }
                25% { filter: blur(2px) brightness(1.3); }
                50% { filter: blur(1px) brightness(1); }
                75% { filter: blur(2px) brightness(1.2); }
              }
            `}</style>
            {/* Header */}
            <div className="relative p-3 text-center border-b-2 border-amber-600/50">
              <button
                onClick={() => setShowAboutModal(false)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-amber-700 hover:bg-amber-600 transition-colors text-white shadow-lg"
                style={{ boxShadow: '0 0 8px #8B4513' }}
              >
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-bold text-amber-800">Acerca de...</h2>
              <div className="w-12 h-0.5 bg-amber-600 mx-auto rounded-full mt-1"></div>
            </div>

            {/* Content */}
            <div className="relative p-3 text-center space-y-2">
              {/* Logo XpiEsentials - Video WebM animado en loop */}
              <div className="flex justify-center mb-2">
                <video 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/XpiLogo1-Pic-eOXCmKkkTzV1tnFsEp50WeAdWugnPc.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-16 h-16 rounded-lg shadow-md object-contain border-2 border-amber-600"
                />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-bold text-amber-800">
                  SINALTRACOMFENALCO
                </p>
                <p className="text-xs text-amber-700">
                  Derechos Reservados
                </p>
                <p className="text-[10px] text-amber-600 font-mono">
                  Version 1.0
                </p>
              </div>

              <div className="border-t-2 border-amber-400/50 pt-2 space-y-1">
                <p className="text-xs text-amber-900">
                  <span className="text-amber-700 font-semibold">Proyecto:</span> Jose Maria Ramirez Giraldo
                </p>
                <p className="text-xs text-amber-900">
                  <span className="text-amber-700 font-semibold">Diseno y Desarrollo:</span> Jorge Hernan Posada Restrepo
                </p>
              </div>

              <div className="border-t-2 border-amber-400/50 pt-2">
                <p className="text-[10px] text-amber-800 leading-relaxed">
                  Equipo de Produccion <span className="text-amber-900 font-bold">XpiEsentials</span>
                </p>
                <p className="text-[10px] text-amber-700">
                  Un producto <span className="text-amber-900 font-semibold">XpiProyecs</span> para Sinaltracomfenalco
                </p>
              </div>

              <div className="border-t-2 border-amber-400/50 pt-2 text-[10px] text-amber-700 space-y-0.5">
                <p>Medellin, Colombia</p>
                <a 
                  href="https://wa.me/573234475311" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-600 font-semibold transition-colors"
                >
                  WhatsApp: +57 323 447 5311
                </a>
                <p>2026</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
