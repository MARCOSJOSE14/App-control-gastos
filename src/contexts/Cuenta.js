import { createContext, useContext, useState } from 'react'

const MyContext = createContext()

export const contexto = () => useContext(MyContext)

export function MyContextProvider ({ children }) {
  const [ctxTostada, setCtxTostada] = useState({ a: false, b: 0, c: '' })
  const [ctxMensaje, setCtxMensaje] = useState({ a: false, b: 0, c: () => (console.log('agrega funcion')) })
  const [ctxCuenta, setCtxCuenta] = useState()
  const [ctxUsuario, setCtxUsuario] = useState()

  const ctxCamTos = (datoa = false, datob = 0, datoc = '') => setCtxTostada({ a: datoa, b: datob, c: datoc })
  const ctxCamMen = (datoa, datob, datoc) => setCtxMensaje({ a: datoa, b: datob, c: datoc })
  const ctxCamCue = (dato) => setCtxCuenta(dato)
  const ctxCamUsu = (dato) => setCtxUsuario(dato)

  return <MyContext.Provider value={{ ctxUsuario, ctxCamUsu, ctxMensaje, ctxCamMen, ctxCamCue, ctxCuenta, ctxTostada, ctxCamTos }}>{children}</MyContext.Provider>
}

export default MyContext
