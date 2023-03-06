import { createContext, useContext, useState } from 'react'

const MyContext = createContext()

export const contexto = () => useContext(MyContext)

export function MyContextProvider ({ children }) {
  const [ctxTostada, setCtxTostada] = useState({ a: false, b: 0 })
  const [ctxMensaje, setCtxMensaje] = useState({ a: false, b: 0, c: () => (console.log('agrega funcion')) })
  const [ctxCuenta, setCtxCuenta] = useState()

  const [nuevoI, setNuevoI] = useState(1)

  const ctxCamTos = (datoa, datob) => setCtxTostada({ a: datoa, b: datob })
  const ctxCamMen = (datoa, datob, datoc) => setCtxMensaje({ a: datoa, b: datob, c: datoc })
  const ctxCamCue = (dato) => setCtxCuenta(dato)

  const camNue = (nuevo) => setNuevoI(nuevoI + 1)

  return <MyContext.Provider value={{ nuevoI, camNue, ctxMensaje, ctxCamMen, ctxCamCue, ctxCuenta, ctxTostada, ctxCamTos }}>{children}</MyContext.Provider>
}

export default MyContext
