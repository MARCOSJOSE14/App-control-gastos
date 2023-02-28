export const Time12 = (datafecha) => (new Date(datafecha)).toLocaleTimeString('es-ES', { hour: 'numeric', minute: 'numeric', hour12: true })

export const Time24 = (datafecha) => (new Date(datafecha)).toLocaleTimeString('es-ES', { hour: 'numeric', minute: 'numeric', hour12: false })

export const shortDate = (datafecha) => (new Date(datafecha)).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })

export const longDate = (datafecha) => (new Date(datafecha)).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

export const espeDate = (datafecha) => (new Date(datafecha)).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' })

export const pen = (moneda) => Number(moneda).toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })
