export const Time12 = (datafecha) => (new Date(datafecha)).toLocaleTimeString('es-ES', { hour: 'numeric', minute: 'numeric', hour12: true })

export const Time24 = (datafecha) => (new Date(datafecha)).toLocaleTimeString('es-ES', { hour: 'numeric', minute: 'numeric', hour12: false })

export const shortDate = (datafecha) => (new Date(datafecha)).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })

export const isoDate = (datafecha) => (new Date(datafecha)).toISOString().slice(0, 10)

export const longDate = (datafecha) => (new Date(datafecha)).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

export const espeDate = (datafecha) => {
  return (new Date(datafecha)).toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })
}

export const espeDate2 = (datafecha) => (new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })).format(new Date(datafecha))

export const espeDate3 = (datafecha) => {
  const fecha = new Date(datafecha)

  const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  const diaSemana = diasSemana[fecha.getUTCDay()]

  const dia = fecha.getUTCDate()
  const mes = fecha.getUTCMonth() + 1
  const anio = fecha.getUTCFullYear()

  const fechaFormateada = `${diaSemana}, ${dia}/${mes}/${anio}`
  return fechaFormateada
}

export const mesDate = (datafecha) => (new Date(datafecha)).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

export const yearDate = (datafecha) => (new Date(datafecha)).toLocaleDateString('es-ES', { year: 'numeric' })

export const pen = (moneda) => Number(moneda).toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })
