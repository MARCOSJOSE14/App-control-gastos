import { createContext, useContext, useState } from 'react'

const MyContext = createContext()

export const ctxTran = () => useContext(MyContext)

export function MyTraProvider ({ children }) {
  const [ctxTraCat, setCtxTraCat] = useState({
    catId: 0,
    catImg: 0,
    catDes: '',
    catColor: '',
    catTipo: 0
  })

  const ctxTraFnCat = (data) => {
    setCtxTraCat({
      catId: data.catId,
      catImg: data.catImg,
      catDes: data.catDes,
      catColor: data.catColor,
      catTipo: data.catTipo
    })
  }

  return <MyContext.Provider value={{ ctxTraCat, ctxTraFnCat }}>{children}</MyContext.Provider>
}
