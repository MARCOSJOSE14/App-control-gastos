import { useEffect, useState } from 'react'
import { contexto } from '@/contexts/Cuenta'
import axios from 'axios'

export const apiSure = (valor, cuerpo, tipo = 'GET') => {
  const [respuesta, setRespuesta] = useState()

  const { ctxCamTos, ctxCamMen } = contexto()
  switch (tipo) {
    // SOLICITAR DATOS
    case 'GET':
      useEffect(() => {
        ctxCamTos(true, 1)
        axios.get(`/api/${valor}`)
          .then((data) => {
            ctxCamTos(true, 2)
            setRespuesta(data.data)
          })
          .catch((error) => {
            ctxCamTos(true, 3)
            console.error(error)
            ctxCamMen(true, 1)
          })
          .finally(() => {
            ctxCamTos(false, 0)
          })
      }, [])
      return respuesta

    case 'POST' :
    // enviar datos a un servidor para crear un nuevo recurso o modificar uno existente
      if (!cuerpo) console.log('No has enviado el parametro de body')
      useEffect(() => {
        ctxCamTos(true, 1)
        axios.post(`/api/${valor}`, cuerpo)
          .then((data) => {
            ctxCamTos(true, 2)
            setRespuesta(data.data)
          })
          .catch((error) => {
            ctxCamTos(true, 3)
            console.error(error)
            ctxCamMen(true, 1)
          })
          .finally(() => {
            ctxCamTos(false, 0)
          })
      }, [])
      return respuesta

    case 'DELETE' :
    // Eliminar un recurso específico en el servidor.
      if (!cuerpo) console.log('No has enviado el parametro de body')
      useEffect(() => {
        ctxCamTos(true, 1)
        axios.delete(`/api/${valor}`, cuerpo)
          .then((data) => {
            ctxCamTos(true, 2)
            setRespuesta(data.data)
          })
          .catch((error) => {
            ctxCamTos(true, 3)
            console.error(error)
            ctxCamMen(true, 1)
          })
          .finally(() => {
            ctxCamTos(false, 0)
          })
      }, [])
      return respuesta

    case 'PUT' :
    // actualizar un recurso existente en el servidor
      if (!cuerpo) console.log('No has enviado el parametro de body')
      useEffect(() => {
        ctxCamTos(true, 1)
        axios.put(`/api/${valor}`, cuerpo)
          .then((data) => {
            ctxCamTos(true, 2)
            setRespuesta(data.data)
          })
          .catch((error) => {
            ctxCamTos(true, 3)
            console.error(error)
            ctxCamMen(true, 1)
          })
          .finally(() => {
            ctxCamTos(false, 0)
          })
      }, [])
      return respuesta

    default:
      return null
  }
}
