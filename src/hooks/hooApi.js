import { useEffect, useState } from 'react'
import { contexto } from '@/contexts/Cuenta'
import axios from 'axios'

export const hooApi = (valor, cuerpo = '', tipo = 'GET', repite = []) => {
  const url = `/api/${valor}`
  const [respuesta, setRespuesta] = useState()
  const { ctxCamMen } = contexto()

  useEffect(() => {
    const consumiendo = async () => {
      try {
        const { data } = await axios({ url, method: tipo, data: cuerpo })
        setRespuesta(data)
      } catch (error) {
        console.error(error)
        ctxCamMen(true, 1)
      }
    }
    consumiendo()
  }, repite)
  return respuesta
}

export const hooAsi = async (valor, cuerpo = '', tipo = 'GET') => {
  const url = `/api/${valor}`
  const problema = { data: [], error: true }
  try {
    const { data } = await axios({ url, method: tipo, data: cuerpo })
    return { data, error: false }
  } catch (error) {
    console.log(error)
    return problema
  }
}
