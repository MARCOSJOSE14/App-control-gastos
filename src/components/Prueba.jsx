import axios from 'axios'
import { useEffect, useState } from 'react'

const Prueba = () => {
  const [datosgasto, setDatosgasto] = useState()

  useEffect(() => {
    const databla = async () => {
      const { data } = await axios.get('/api/cuenta/1/datos')
      setDatosgasto(data)
      console.log(data)
    }
    databla()
  }, [])

  if (!datosgasto) return <h1>Cargando</h1>
  else {
    console.log(datosgasto)
  }
  return (
    <>
      <h1>Esta es la prueba</h1>
    </>
  )
}

export default Prueba
