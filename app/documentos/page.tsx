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
  { no: 3, articulo: "Régimen Contractual", periodo2020: "Jornadas por disponibilidad", prorroga: "Se mantiene", periodo2026: "Jornadas flexibles 18,24,30,36,42 hrs", analisis: "Mayor flexibilidad" },
  { no: 4, articulo: "Vacantes y Ascensos", periodo2020: "Según política de selección", prorroga: "Se mantiene", periodo2026: "Participación en Comité Escalafón", analisis: "Mayor participación" },
  { no: 5, articulo: "Debido Proceso Disciplinario", periodo2020: "Garantías básicas", prorroga: "Se mantiene", periodo2026: "Derecho a 2 testigos sindicalizados", analisis: "Fortalecimiento" },
  { no: 6, articulo: "Sustitución Patronal", periodo2020: "Según normativa", prorroga: "Se mantiene", periodo2026: "Reubicación en reestructuración", analisis: "Mayor protección" },
  { no: 7, articulo: "Indemnización por Despido", periodo2020: "Tabla legal", prorroga: "Se mantiene", periodo2026: "3-10 días adicionales según antigüedad", analisis: "Mejora significativa" },
  { no: 8, articulo: "Incremento Salarial", periodo2020: "IPC o SMLMV", prorroga: "Se mantiene", periodo2026: "Mayor entre IPC y SMLMV 2027", analisis: "Garantía de ajuste" },
  { no: 9, articulo: "Bonificación de Navidad", periodo2020: "Bonificación diciembre", prorroga: "Se mantiene", periodo2026: "9 días de salario básico", analisis: "Beneficio claro" },
  { no: 10, articulo: "Auxilio Regreso Vacaciones", periodo2020: "Auxilio post-vacaciones", prorroga: "Se mantiene", periodo2026: "$86.800/$72.500/$58.000 según nivel", analisis: "Valores definidos" },
  { no: 11, articulo: "Prima de Antigüedad", periodo2020: "Prima según años", prorroga: "Se mantiene", periodo2026: "7-40 días según 5-40 años", analisis: "Escala mejorada" },
  { no: 12, articulo: "Tiempo Libre Quinquenios", periodo2020: "Días adicionales", prorroga: "Se mantiene", periodo2026: "1-3 días cada 5 años", analisis: "Beneficio tiempo" },
  { no: 13, articulo: "Día Cumpleaños y Servicio", periodo2020: "Día libre", prorroga: "Se mantiene", periodo2026: "1 día por cada evento", analisis: "Se mantiene" },
  { no: 14, articulo: "Auxilio Pensión Vejez/Invalidez", periodo2020: "Auxilio retiro", prorroga: "Se mantiene", periodo2026: "2 salarios básicos", analisis: "Definido claramente" },
  { no: 15, articulo: "Auxilio Nacimiento/Adopción", periodo2020: "Auxilio hijo", prorroga: "Se mantiene", periodo2026: "$200.000 por hijo", analisis: "Valor establecido" },
  { no: 16, articulo: "Permiso Matrimonio", periodo2020: "Días por matrimonio", prorroga: "Se mantiene", periodo2026: "6 días hábiles", analisis: "Amplio permiso" },
  { no: 17, articulo: "Auxilio Muerte Familiares", periodo2020: "Auxilio fallecimiento", prorroga: "Se mantiene", periodo2026: "15-30 días salario según parentesco", analisis: "Mayor cobertura" },
  { no: 18, articulo: "Auxilio Educativo", periodo2020: "Auxilio estudios", prorroga: "Se mantiene", periodo2026: "50% matrícula, tope 5 SMLMV", analisis: "Apoyo significativo" },
  { no: 19, articulo: "Auxilio Incapacidad", periodo2020: "Complemento incapacidad", prorroga: "Se mantiene", periodo2026: "100% salario desde día 6", analisis: "Protección completa" },
  { no: 20, articulo: "Auxilio Discapacidad", periodo2020: "Auxilio familiar", prorroga: "Se mantiene", periodo2026: "1 SMLMV por beneficiario/año", analisis: "Nuevo beneficio" },
  { no: 21, articulo: "Crédito Calamidad", periodo2020: "Préstamo emergencia", prorroga: "Se mantiene", periodo2026: "3 SMLMV, 0.4%, 36 meses", analisis: "Condiciones favorables" },
  { no: 22, articulo: "Crédito Vivienda", periodo2020: "Préstamo vivienda", prorroga: "Se mantiene", periodo2026: "36 SMLMV, 0.4%, 96 meses", analisis: "Excelente apoyo" },
  { no: 23, articulo: "Crédito Multipropósito", periodo2020: "Préstamo general", prorroga: "Se mantiene", periodo2026: "26 SMLMV, 0.5%, 48 meses", analisis: "Nueva línea" },
  { no: 24, articulo: "Permisos Remunerados", periodo2020: "Permisos médicos/legales", prorroga: "Se mantiene", periodo2026: "Incluye desplazamientos", analisis: "Mayor cobertura" },
  { no: 25, articulo: "Descuentos Recreación", periodo2020: "Facilidades pago", prorroga: "Se mantiene", periodo2026: "0% interés, 12-24 quincenas", analisis: "Sin interés" },
  { no: 26, articulo: "Subsidio Alimentación", periodo2020: "Subsidio comida", prorroga: "Se mantiene", periodo2026: "100% menú en hoteles/parques", analisis: "Cobertura total" },
  { no: 27, articulo: "Póliza Seguro Vida", periodo2020: "Seguro vida grupo", prorroga: "Se mantiene", periodo2026: "24 salarios, 30 para Junta", analisis: "Alta cobertura" },
  { no: 28, articulo: "Bonos Parques/Hoteles", periodo2020: "Bonos recreación", prorroga: "Se mantiene", periodo2026: "280 bonos $80.000 c/u", analisis: "Beneficio familia" },
  { no: 29, articulo: "Permiso Muerte Mascotas", periodo2020: "No existía", prorroga: "No existía", periodo2026: "2 días calamidad", analisis: "Nuevo beneficio" },
  { no: 30, articulo: "Fomento Maternidad", periodo2020: "Licencia legal", prorroga: "Se mantiene", periodo2026: "Horas por mes hasta 9 meses", analisis: "Apoyo extendido" },
  { no: 31, articulo: "Día de la Familia", periodo2020: "No existía", prorroga: "No existía", periodo2026: "1 día semestral remunerado", analisis: "Nuevo beneficio" },
  { no: 32, articulo: "Feria Sindical", periodo2020: "No existía", prorroga: "No existía", periodo2026: "Feria anual productos/servicios", analisis: "Nuevo espacio" },
  { no: 33, articulo: "Auxilio Sindical", periodo2020: "Aporte mensual", prorroga: "Se mantiene", periodo2026: "$2.956.000 mensual + IPC", analisis: "Incremento" },
  { no: 34, articulo: "Permisos Sindicales", periodo2020: "Horas remuneradas", prorroga: "Se mantiene", periodo2026: "360 horas mensuales", analisis: "Amplio tiempo" },
  { no: 35, articulo: "Auxilio Movilidad", periodo2020: "No existía", prorroga: "No existía", periodo2026: "0.5 SMLMV bicicleta/monopatín", analisis: "Nuevo beneficio" },
  { no: 36, articulo: "Brigadas de Salud", periodo2020: "Jornadas esporádicas", prorroga: "Se mantiene", periodo2026: "Jornadas organizadas por sindicato", analisis: "Mayor participación" },
  { no: 37, articulo: "Reconocimiento Polivalencia", periodo2020: "No existía", prorroga: "No existía", periodo2026: "Categoría en Gala de Reconocimientos", analisis: "Nuevo reconocimiento" },
  { no: 38, articulo: "Comisión Interrelaciones", periodo2020: "Reuniones esporádicas", prorroga: "Se mantiene", periodo2026: "Reunión cada 2 meses", analisis: "Mayor seguimiento" },
  { no: 39, articulo: "Permiso Muerte Mascotas", periodo2020: "No existía", prorroga: "No existía", periodo2026: "2 días calamidad", analisis: "Nuevo beneficio" },
  { no: 40, articulo: "Fomento Maternidad/Paternidad", periodo2020: "Licencia legal", prorroga: "Se mantiene", periodo2026: "Horas por mes hasta 9 meses", analisis: "Apoyo extendido" },
  { no: 41, articulo: "Día de la Familia", periodo2020: "No existía", prorroga: "No existía", periodo2026: "1 día semestral remunerado", analisis: "Nuevo beneficio" },
  { no: 42, articulo: "Feria Economía Familiar", periodo2020: "No existía", prorroga: "No existía", periodo2026: "Feria anual productos/servicios", analisis: "Nuevo espacio" },
  { no: 43, articulo: "Efecto No Salarial", periodo2020: "Según normativa", prorroga: "Se mantiene", periodo2026: "Beneficios sin carácter salarial", analisis: "Claridad jurídica" },
  { no: 44, articulo: "Auxilio Sindical", periodo2020: "Aporte mensual", prorroga: "Se mantiene", periodo2026: "$2.956.000 mensual + IPC", analisis: "Incremento significativo" },
  { no: 45, articulo: "Permisos Sindicales", periodo2020: "Horas remuneradas", prorroga: "Se mantiene", periodo2026: "360 horas mensuales", analisis: "Amplio tiempo" },
  { no: 46, articulo: "Auxilio Excluidos Convención", periodo2020: "Auxilio anual", prorroga: "Se mantiene", periodo2026: "$77.469.280 anuales", analisis: "Monto definido" },
  { no: 47, articulo: "Sede Sindical", periodo2020: "Espacio asignado", prorroga: "Se mantiene", periodo2026: "Local en sede El Poblado", analisis: "Sede garantizada" },
  { no: 48, articulo: "Instalaciones Asambleas", periodo2020: "Préstamo instalaciones", prorroga: "Se mantiene", periodo2026: "Auditorio para asambleas", analisis: "Espacio garantizado" },
  { no: 49, articulo: "Firmas y Clausura", periodo2020: "Firma convención", prorroga: "Prórroga firmada", periodo2026: "Firmada marzo 2026", analisis: "Convención vigente" },
]

// Datos completos de la Convención Colectiva 2026-2027
const convencionData = [
  { 
    capitulo: "CAPÍTULO I - PRINCIPIOS RECTORES Y DERECHOS FUNDAMENTALES",
    articulos: [
      { numero: "Preámbulo", titulo: "Principios Rectores", contenido: "COMFENALCO ANTIOQUIA Y SINALTRACOMFENALCO aceptan y reconocen que la presente Convención Colectiva de Trabajo acoge lo establecido en la Constitución Nacional, los Convenios Internacionales de la OIT ratificados por Colombia, los Derechos Fundamentales, la Ley y los principios de COMFENALCO Antioquia. Se garantizan: El respeto a la dignidad humana, la prosperidad general, el derecho de asociación, la negociación colectiva, la prohibición del trabajo forzoso e infantil, el derecho al trabajo en condiciones dignas y justas, y el respeto al debido proceso." }
    ]
  },
  {
    capitulo: "CAPÍTULO II - CAMPO DE APLICACIÓN Y VIGENCIA",
    articulos: [
      { numero: "Art. 1", titulo: "Campo de Aplicación", contenido: "La presente convención colectiva se aplicará a los trabajadores vinculados a Comfenalco Antioquia mediante contrato de trabajo que se encuentren afiliados a SINALTRACOMFENALCO. No será aplicable a trabajadores en niveles directivo, directivo medio y coordinador, ni a trabajadores contratados para convenios y contratos suscritos por la Caja." },
      { numero: "Art. 2", titulo: "Vigencia", contenido: "La presente Convención Colectiva de Trabajo tendrá una vigencia de un (1) año, contados a partir del diecinueve (19) de marzo de 2026, y hasta el dieciocho (18) de marzo de 2027." }
    ]
  },
  {
    capitulo: "CAPÍTULO III - RÉGIMEN CONTRACTUAL",
    articulos: [
      { numero: "Art. 3", titulo: "Jornadas Flexibles", contenido: "COMFENALCO Antioquia implementará jornadas flexibles de trabajo de 18, 24, 30, 36 y 42 horas semanales. Se garantiza: 90 horas mensuales (18hrs/sem), 120 horas (24hrs/sem), 150 horas (30hrs/sem), 180 horas (36hrs/sem), 210 horas (42hrs/sem), incluyendo descansos remunerados." },
      { numero: "Art. 4", titulo: "Vacantes y Ascensos", contenido: "COMFENALCO Antioquia garantizará la participación de un miembro de SINALTRACOMFENALCO en el Comité de Escalafón Docente. Las vacantes se proveerán de conformidad con la política de selección vigente." },
      { numero: "Art. 5", titulo: "Debido Proceso Disciplinario", contenido: "Comfenalco Antioquia garantizará el debido proceso, derecho a la contradicción, defensa, doble instancia y proporcionalidad de las sanciones. Los trabajadores sindicalizados podrán asistir a diligencia de descargos acompañados de dos (2) trabajadores de la Caja como testigos." },
      { numero: "Art. 6", titulo: "Sustitución Patronal y Estabilidad", contenido: "Comfenalco Antioquia respetará la normativa vigente en materia de sustitución patronal. En caso de reestructuración corporativa procurará la reubicación de los trabajadores." },
      { numero: "Art. 7", titulo: "Indemnización por Despido sin Justa Causa", contenido: "Además de la indemnización legal, se reconocerá: 3 días adicionales por cada año entre 1-5 años de servicio, 7 días adicionales entre 5-10 años, 10 días adicionales a partir del año 10. Esta escala aplica a partir del segundo año de trabajo." }
    ]
  },
  {
    capitulo: "CAPÍTULO IV - SALARIOS Y BENEFICIOS ECONÓMICOS",
    articulos: [
      { numero: "Art. 8", titulo: "Incremento Salarial", contenido: "Para el año 2027, a partir del primero de enero se incrementarán los salarios básicos de acuerdo con el mayor entre IPC total nacional certificado por el DANE a 31 de diciembre de 2026 o el porcentaje fijado por el gobierno nacional para el SMLMV del 2027." },
      { numero: "Art. 9", titulo: "Bonificación de Navidad", contenido: "Se reconocerá una bonificación de Navidad equivalente a nueve (9) días de salario básico para empleados vinculados después del 12 de diciembre de 2008. Condición: estar vinculado al 10 de diciembre de cada año. No hay pago proporcional." },
      { numero: "Art. 10", titulo: "Auxilio Económico al Regreso de Vacaciones", contenido: "Auxilio no constitutivo de salario pagadero en la quincena siguiente al regreso de vacaciones: Nivel Operativo $86.800, Nivel Administrativo Asistencial $72.500, Nivel Profesional $58.000. Se incrementará con IPC 2026." },
      { numero: "Art. 11", titulo: "Continuidad de Derechos", contenido: "Se continuará reconociendo a empleados vinculados antes del 12 de diciembre de 2008 los derechos económicos por navidad y vacaciones conforme al acta 766 del 11 de diciembre de 2008." },
      { numero: "Art. 12", titulo: "Prima de Antigüedad", contenido: "Se reconocerá prima de antigüedad: 7 días por 5 años, 10 días por 10 años, 15 días por 15 años, 20 días por 20 años, 25 días por 25 años, 30 días por 30 años, 35 días por 35 años, 40 días por 40 años de servicio." },
      { numero: "Art. 13", titulo: "Beneficio de Tiempo Libre en Quinquenios", contenido: "En el año del quinquenio: 1 día adicional por 5 años, 2 días adicionales por 10-20 años, 3 días adicionales por 25+ años de servicio continuos. No compensable en dinero." },
      { numero: "Art. 14", titulo: "Tiempo Libre Cumpleaños y Años de Servicio", contenido: "Un (1) día de descanso remunerado por Cumpleaños y un (1) día por año de servicio, disfrutables durante todo el año en que se cumplen." }
    ]
  },
  {
    capitulo: "CAPÍTULO V - AUXILIOS",
    articulos: [
      { numero: "Art. 15", titulo: "Auxilios por Pensión de Vejez o Invalidez", contenido: "Auxilio equivalente a 2 salarios básicos mensuales al reconocerse pensión de vejez o invalidez, con retiro voluntario. Requisitos: solicitar pensión dentro del mes siguiente al cumplimiento de requisitos y renunciar dentro de 15 días hábiles de la notificación." },
      { numero: "Art. 16", titulo: "Auxilio por Nacimiento o Adopción", contenido: "Auxilio de DOSCIENTOS MIL PESOS ($200.000) por cada hijo nacido vivo, adoptado o reconocido. En caso de muerte del hijo por nacer después de 2 meses de concebido, se reconocerá igual auxilio." },
      { numero: "Art. 17", titulo: "Permiso Remunerado por Matrimonio", contenido: "Seis (6) días hábiles de permiso remunerado a partir del día de la celebración del matrimonio. Informar con 5 días hábiles de antelación y presentar documento dentro de los 30 días siguientes." },
      { numero: "Art. 18", titulo: "Auxilio por Muerte de Familiares", contenido: "Por muerte del cónyuge/compañero(a): 30 días de salario básico. Por muerte de hijos: 15 días de salario básico. Por muerte de padre o madre: $220.000 (incrementa con IPC)." },
      { numero: "Art. 19", titulo: "Permiso por Calamidad Doméstica", contenido: "El líder y gestión laboral evaluarán cada caso para determinar si constituye calamidad y fijarán la duración del permiso." },
      { numero: "Art. 20", titulo: "Auxilio Educativo", contenido: "Auxilio para estudios: Técnica 50% semestre, Tecnología/Pregrado 50% matrícula tope 5 SMLMV, Especialización/Maestría 50% matrícula tope 5 SMLMV. Requisitos: 1 año antigüedad, sin sanciones, desempeño 'Esperado', promedio 3.7-4.0. Fondo de $150.000.000 anuales." },
      { numero: "Art. 21", titulo: "Auxilio por Incapacidad", contenido: "Auxilio para recibir el 100% del salario básico a partir del sexto día de incapacidad continua, mientras las incapacidades sean reconocidas por la EPS hasta un límite de 180 días." },
      { numero: "Art. 22", titulo: "Auxilio por Beneficiario con Discapacidad", contenido: "Un salario mínimo legal vigente (1) SMLMV por año por cada beneficiario con discapacidad certificada en el grupo familiar hasta segundo grado de consanguinidad." }
    ]
  },
  {
    capitulo: "CAPÍTULO VI - CRÉDITOS",
    articulos: [
      { numero: "Art. 23", titulo: "Crédito de Calamidad Doméstica", contenido: "Crédito hasta 3 SMLMV con interés mensual del 0.4%, plazo máximo 36 meses. Incluye muerte de familiar hasta cuarto grado de consanguinidad y primero de afinidad." },
      { numero: "Art. 24", titulo: "Fondo de Crédito", contenido: "Crédito de Vivienda: hasta 36 SMLMV, 96 meses, tasa 0.4% para primera vivienda propia. Crédito Multipropósito: hasta 26 SMLMV, 48 meses, tasa 0.5% para situaciones financieras." }
    ]
  },
  {
    capitulo: "CAPÍTULO VII - PERMISOS REMUNERADOS",
    articulos: [
      { numero: "Art. 25", titulo: "Permisos Remunerados", contenido: "Permiso remunerado para citas médicas, exámenes médicos, citaciones judiciales y demás de carácter legal. Se incluye el tiempo de desplazamientos debidamente certificados." }
    ]
  },
  {
    capitulo: "CAPÍTULO VIII - VARIOS",
    articulos: [
      { numero: "Art. 26", titulo: "Descuentos a Empleados", contenido: "Descuento por nómina a 0% interés para servicios de hoteles, clubes, parques. Tarifa A: 24 quincenas, Tarifas B y C: 12 quincenas." },
      { numero: "Art. 27", titulo: "Cuota de Aprendices", contenido: "Se asignarán preferentemente cupos de aprendices a hijos, cónyuge, compañero(a) permanente y hermanos de los trabajadores." },
      { numero: "Art. 28", titulo: "Subsidio Alimentación", contenido: "Subsidio del 100% en el menú para trabajadores en hoteles, clubes y parques con centro de producción propio. Tiempo mínimo de alimentación: 30 minutos." },
      { numero: "Art. 29", titulo: "Alimentación y Transporte en Hoteles/Parques", contenido: "Cuando se extienda la jornada más tarde de las 10:00 p.m., se suministrará cena y/o desayuno si pernocta. Transporte hasta lugar de acopio cuando se labore después de las 10pm o antes de las 5am." },
      { numero: "Art. 30", titulo: "Vestuario Institucional", contenido: "Para empleados con salario superior a 2 SMLMV se aplicará el manual de vestuario e imagen corporativa, con cargo al empleador." },
      { numero: "Art. 31", titulo: "Permiso por 24 ó 31 de Diciembre", contenido: "Permiso remunerado por el día 24 o el 31 de diciembre, siempre que no se afecte el servicio y se garantice equidad en el área." },
      { numero: "Art. 32", titulo: "Transporte", contenido: "Auxilio extralegal de transporte no constitutivo de salario para trabajadores con funciones permanentes fuera de las sedes de la Caja." },
      { numero: "Art. 33", titulo: "Póliza de Seguro Vida Grupo", contenido: "Valor asegurado de 24 salarios básicos mensuales. Para miembros de la Junta Directiva de SINALTRACOMFENALCO: 30 salarios básicos mensuales." },
      { numero: "Art. 34", titulo: "Bono para Parques, Hoteles y/o Servicios", contenido: "280 bonos anuales de $80.000 cada uno, disfrutables por miembros del grupo familiar. No transferibles, negociables, acumulables ni redimibles en dinero." },
      { numero: "Art. 35", titulo: "Brigadas de Salud", contenido: "Se permitirá la realización de jornadas de salud organizadas por SINALTRACOMFENALCO en las instalaciones de la Caja." },
      { numero: "Art. 36", titulo: "Reconocimiento a la Polivalencia", contenido: "Categoría específica dentro de la Gala de Reconocimientos para colaboradores con desempeño sobresaliente en polivalencia." },
      { numero: "Art. 37", titulo: "Interrelaciones", contenido: "Comisión paritaria que se reunirá cada 2 meses: Jefe de Gestión Laboral y 2 integrantes del sindicato para seguimiento a acuerdos." },
      { numero: "Art. 38", titulo: "Permiso por Muerte de Mascotas", contenido: "Dos (2) días de calamidad doméstica remunerada por fallecimiento de mascota (perros y gatos) registrada en el censo de la Caja." },
      { numero: "Art. 39", titulo: "Fomento a la Maternidad y Paternidad", contenido: "Por cada mes de vida del hijo (hasta 9 meses), se reconocerá el equivalente en horas laborales a la madre trabajadora. Se traslada al padre en caso de fallecimiento de la madre." },
      { numero: "Art. 40", titulo: "Día de la Familia", contenido: "Un día semestral remunerado (2 veces al año) para promover la integración y fortalecimiento de los lazos familiares." },
      { numero: "Art. 41", titulo: "Feria de Economía Familiar", contenido: "COMFENALCO ANTIOQUIA apoyará la realización de la Feria Sindical SINALTRACOMFENALCO una vez al año para acceso a productos y servicios esenciales en condiciones favorables." }
    ]
  },
  {
    capitulo: "CAPÍTULO IX - EFECTO NO SALARIAL",
    articulos: [
      { numero: "Art. 42", titulo: "Efecto No Salarial de los Beneficios", contenido: "Las primas, bonificaciones, auxilios, subsidios y demás beneficios extralegales pactados en esta convención no tendrán carácter salarial ni se computarán como factor del mismo para ningún efecto." }
    ]
  },
  {
    capitulo: "CAPÍTULO X - AUXILIOS Y PERMISOS SINDICALES",
    articulos: [
      { numero: "Art. 43", titulo: "Auxilio Sindical", contenido: "Auxilio de $2.956.000 mensuales a partir del 1 de abril de 2026, consignados dentro de los 5 primeros días de cada mes. Incremento con IPC 2026 para 2027. Auxilio único de $11.200.000 a la CGT en enero 2027." },
      { numero: "Art. 44", titulo: "Permisos Sindicales Remunerados", contenido: "360 horas mensuales no acumulables para actividades sindicales. Solicitud escrita con 5 días hábiles de anticipación, respuesta en 3 días." },
      { numero: "Art. 45", titulo: "Auxilio por Excluidos de la Convención", contenido: "Auxilio de $77.469.280 anual pagadero en 12 cuotas mensuales. Incremento con IPC 2026." },
      { numero: "Art. 46", titulo: "Auxilio para Medios Alternativos de Movilidad", contenido: "Auxilio de medio SMLMV por única vez para comprar bicicleta o monopatín convencional o eléctrico." },
      { numero: "Art. 47", titulo: "Carteleras", contenido: "Se conservan 20 carteleras para divulgar información del sindicato." },
      { numero: "Art. 48", titulo: "Auxilio de Prensa", contenido: "Auxilio de $1.000.000 por única vez para publicación y divulgación de la convención. COMFENALCO diseñará el formato digital." },
      { numero: "Art. 49", titulo: "Seguimiento de la Convención", contenido: "Reunión semestral de evaluación y seguimiento citada por el jefe de Gestión Laboral dentro de los 15 días hábiles posteriores al vencimiento del semestre." }
    ]
  }
]

const documentos = [
  {
    id: "cuadro-comparativo",
    nombre: "Cuadro Comparativo Convención",
    archivo: "/documentos/cuadro_comparativo_convencion.pdf",
    descripcion: "Comparación entre convenciones 2020-2024, 2025-2026 y 2026-2027",
    color: "#3b82f6",
    bgColor: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
  },
  {
    id: "convencion-colectiva",
    nombre: "Convención Colectiva 2026-2027",
    archivo: "/documentos/Convencion_Colectiva_SINALTRACOMFENALCO_2026_2027.pdf",
    descripcion: "Documento completo de 24 páginas",
    color: "#6b7280",
    bgColor: "bg-gray-500",
    hoverColor: "hover:bg-gray-600",
  }
]

export default function DocumentosPage() {
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null)

  return (
    <div 
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #3b82f6 0%, #6b7280 25%, #9ca3af 50%, #ffffff 75%, #f3f4f6 100%)"
      }}
    >
      {/* Navbar compacto */}
      <header
        className="sticky top-0 z-40 px-4 py-1"
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 50%, #1e3a5f 100%)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}
      >
        <ModernNavbar activeSection="documentos" compact={true} />
      </header>

      {/* Título y navegación */}
      <div className="pt-4 pb-3 px-4">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/comparativo-convencion"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 text-gray-700 font-medium hover:bg-white transition-colors mb-3 text-sm shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Índice
          </Link>
          
          <h1 className="text-xl md:text-2xl font-bold text-white text-center drop-shadow-lg">
            Documentos SINALTRACOMFENALCO
          </h1>
        </div>
      </div>

      {/* Contenedor de documentos */}
      <div className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Si no hay documento expandido, mostrar los 2 botones en línea */}
          {!expandedDoc && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentos.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setExpandedDoc(doc.id)}
                  className={`p-5 rounded-xl shadow-lg text-left transition-all hover:scale-[1.02] ${doc.bgColor} ${doc.hoverColor}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-lg">{doc.nombre}</h3>
                      <p className="text-white/80 text-sm">{doc.descripcion}</p>
                    </div>
                    <div className="flex items-center gap-1 text-white flex-shrink-0">
                      <span className="text-sm font-medium">Clic para abrir</span>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Si hay documento expandido, mostrar solo ese documento */}
          {expandedDoc && (
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Header del documento expandido */}
              <div 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-3"
                style={{ 
                  background: expandedDoc === "cuadro-comparativo" 
                    ? "linear-gradient(135deg, #3b82f6, #1d4ed8)" 
                    : "linear-gradient(135deg, #6b7280, #374151)"
                }}
              >
                <h2 className="text-white font-bold text-lg md:text-xl">
                  {expandedDoc === "cuadro-comparativo" 
                    ? "Cuadro Comparativo Convención Colectiva" 
                    : "Convención Colectiva de Trabajo 2026-2027"}
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={documentos.find(d => d.id === expandedDoc)?.archivo}
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors text-sm shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    Descargar PDF Completo
                  </a>
                  <button
                    onClick={() => setExpandedDoc(null)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 text-white font-medium hover:bg-white/30 transition-colors text-sm"
                  >
                    <X className="w-4 h-4" />
                    Cerrar
                  </button>
                </div>
              </div>

              {/* Contenido del documento */}
              <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                {expandedDoc === "cuadro-comparativo" ? (
                  <table className="w-full border-collapse min-w-[800px]">
                    <thead className="sticky top-0">
                      <tr className="bg-emerald-600 text-white">
                        <th className="p-3 text-left font-bold border-r border-emerald-500 w-12">No</th>
                        <th className="p-3 text-left font-bold border-r border-emerald-500 w-48">Artículo / Tema</th>
                        <th className="p-3 text-left font-bold border-r border-emerald-500">2020-2024</th>
                        <th className="p-3 text-left font-bold border-r border-emerald-500 w-28">Prórroga 2025-2026</th>
                        <th className="p-3 text-left font-bold border-r border-emerald-500">2026-2027</th>
                        <th className="p-3 text-left font-bold w-36">Análisis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cuadroComparativoData.map((row, index) => (
                        <tr 
                          key={row.no} 
                          className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-emerald-50 transition-colors`}
                        >
                          <td className="p-3 border-t border-gray-200 text-center font-bold text-emerald-700">{row.no}</td>
                          <td className="p-3 border-t border-gray-200 font-medium text-gray-800">{row.articulo}</td>
                          <td className="p-3 border-t border-gray-200 text-gray-600 text-sm">{row.periodo2020}</td>
                          <td className="p-3 border-t border-gray-200 text-gray-600 text-sm">{row.prorroga}</td>
                          <td className="p-3 border-t border-gray-200 text-emerald-700 font-medium text-sm">{row.periodo2026}</td>
                          <td className="p-3 border-t border-gray-200">
                            <span className="inline-block px-2 py-1 rounded bg-amber-100 text-amber-800 text-xs font-medium">
                              {row.analisis}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-4 space-y-6">
                    {/* Encabezado del documento */}
                    <div className="text-center py-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl">
                      <h3 className="text-2xl font-bold text-gray-800">CONVENCIÓN COLECTIVA DE TRABAJO</h3>
                      <p className="text-lg text-gray-600 mt-2">SINALTRACOMFENALCO – C.C.F. COMFENALCO ANTIOQUIA</p>
                      <p className="text-xl font-bold text-blue-600 mt-2">2026 - 2027</p>
                      <p className="text-sm text-gray-500 mt-4 max-w-3xl mx-auto">
                        Firmada en Medellín, a los dieciocho días del mes de marzo del año dos mil veintiséis (2026)
                      </p>
                    </div>

                    {/* Capítulos y artículos */}
                    {convencionData.map((capitulo, capIndex) => (
                      <div key={capIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                          <h4 className="text-white font-bold text-lg">{capitulo.capitulo}</h4>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {capitulo.articulos.map((art, artIndex) => (
                            <div key={artIndex} className={`p-4 ${artIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                              <div className="flex items-start gap-4">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 font-bold rounded-lg text-sm flex-shrink-0">
                                  {art.numero}
                                </span>
                                <div>
                                  <h5 className="font-bold text-gray-800 mb-2">{art.titulo}</h5>
                                  <p className="text-gray-600 text-sm leading-relaxed">{art.contenido}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Firmas */}
                    <div className="bg-gray-100 rounded-xl p-6 mt-8">
                      <h4 className="text-center font-bold text-gray-800 mb-6">FIRMAS</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="text-center">
                          <p className="font-bold text-gray-800">Por COMFENALCO Antioquia:</p>
                          <p className="text-gray-600 mt-2">Juan Pablo Morales Calle - Director</p>
                          <p className="text-gray-600">Andrés Serna Bautista</p>
                          <p className="text-gray-600">Gicela Maria Henao Muñoz</p>
                          <p className="text-gray-600">Carlos Alberto Vanegas Morales</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-gray-800">Por SINALTRACOMFENALCO:</p>
                          <p className="text-gray-600 mt-2">Guillermo León Gaviria Arboleda - Presidente</p>
                          <p className="text-gray-600">Hernán Darío Pulgarín Muñoz</p>
                          <p className="text-gray-600">Cielo Marcela Martinez Velez</p>
                          <p className="text-gray-600">John Jairo Restrepo Marín</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer con botón para cerrar */}
              <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-center">
                <button
                  onClick={() => setExpandedDoc(null)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-600 text-white font-bold hover:bg-gray-700 transition-colors"
                >
                  <ChevronUp className="w-5 h-5" />
                  Cerrar Documento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
