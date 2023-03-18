import { useEffect, useState } from 'react'
import { contexto } from '@/contexts/Cuenta'
import axios from 'axios'

export const hooApi = (valor, cuerpo, tipo = 'GET', repite = []) => {
  const url = `/api/${valor}`
  const [respuesta, setRespuesta] = useState()
  const { ctxCamMen } = contexto()

  useEffect(() => {
    const consumiendo = async () => {
      try {
        const { data } = await axios({ url, method: tipo })
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
