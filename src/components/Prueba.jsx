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
    const res = datosgasto.reduce((acumula, { detId, detDesc, detDate, detMonto, detTipo }, index) => {
      if (acumula.at(-1)?.afecha === detDate) {
        acumula.at(-1).datosE.push({ detId, detDesc, detMonto, detTipo })
        acumula.at(-1).bmonto = Number(acumula?.at(-1).bmonto) + Number(detMonto)
      } else {
        acumula.push({
          afecha: detDate,
          bmonto: detMonto,
          datosE: [{ detId, detDesc, detMonto, detTipo }]
        })
      }
      return acumula
    }, [])
    console.log(res)
  }

  return (
    <>
      <h1>Esta es la prueba</h1>
    </>
  )
}

export default Prueba
