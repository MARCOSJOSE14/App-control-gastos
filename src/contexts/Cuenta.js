import { createContext, useContext, useState } from 'react'

const MyContext = createContext()

export const contexto = () => useContext(MyContext)

export function MyContextProvider ({ children }) {
  const [contCat, setContCat] = useState({ catId: 0, catDesc: 'Nombre', cueId: 0 })
  const [nuevoI, setNuevoI] = useState(1)
  const [cargando, setCargando] = useState([false, 0])
  const [mensaje, setMensaje] = useState([false, '', ''])

  const camCar = (valor) => setCargando(valor)
  const camCat = (nuevacat) => setContCat(nuevacat)
  const camNue = (nuevo) => setNuevoI(nuevoI + 1)
  const camMen = (dato) => setMensaje(dato)

  return <MyContext.Provider value={{ contCat, camCat, nuevoI, camNue, cargando, camCar, mensaje, camMen }}>{children}</MyContext.Provider>
}

export default MyContext
