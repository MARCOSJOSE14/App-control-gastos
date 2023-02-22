import { createContext, useContext, useState } from 'react'

const MyContext = createContext()

export const contexto = () => useContext(MyContext)

export function MyContextProvider ({ children }) {
  const [contCat, setContCat] = useState({ catId: 0, catDesc: 'Nombre', cueId: 0 })
  const [nuevoI, setNuevoI] = useState(1)

  const camCat = (nuevacat) => {
    setContCat(nuevacat)
  }
  const camNue = (nuevo) => {
    setNuevoI(nuevoI + 1)
  }

  return <MyContext.Provider value={{ contCat, camCat, nuevoI, camNue }}>{children}</MyContext.Provider>
}

export default MyContext
