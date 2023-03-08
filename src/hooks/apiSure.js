import { useEffect, useState } from 'react'
import { contexto } from '@/contexts/Cuenta'
import axios from 'axios'

export const apiSure = (valor, cuerpo, tipo = 'GET') => {
  const [respuesta, setRespuesta] = useState()

  const { ctxCamMen } = contexto()
  switch (tipo) {
    // SOLICITAR DATOS
    case 'GET':
      useEffect(() => {
        axios.get(`/api/${valor}`)
          .then((data) => {
            setRespuesta(data.data)
          })
          .catch((error) => {
            console.error(error)
            ctxCamMen(true, 1)
          })
          .finally(() => {
          })
      }, [])
      return respuesta

    case 'POST' :
    // enviar datos a un servidor para crear un nuevo recurso o modificar uno existente
      if (!cuerpo) console.log('No has enviado el parametro de body')
      useEffect(() => {
        axios.post(`/api/${valor}`, cuerpo)
          .then((data) => {
            setRespuesta(data.data)
          })
          .catch((error) => {
            console.error(error)
            ctxCamMen(true, 1)
          })
          .finally(() => {
          })
      }, [])
      return respuesta

    case 'DELETE' :
    // Eliminar un recurso específico en el servidor.
      if (!cuerpo) console.log('No has enviado el parametro de body')
      useEffect(() => {
        axios.delete(`/api/${valor}`, cuerpo)
          .then((data) => {
            setRespuesta(data.data)
          })
          .catch((error) => {
            console.error(error)
            ctxCamMen(true, 1)
          })
          .finally(() => {
          })
      }, [])
      return respuesta

    case 'PUT' :
    // actualizar un recurso existente en el servidor
      if (!cuerpo) console.log('No has enviado el parametro de body')
      useEffect(() => {
        axios.put(`/api/${valor}`, cuerpo)
          .then((data) => {
            setRespuesta(data.data)
          })
          .catch((error) => {
            console.error(error)
            ctxCamMen(true, 1)
          })
          .finally(() => {
          })
      }, [])
      return respuesta

    default:
      return null
  }
}
