import axios from 'axios'
import { useEffect, useState } from 'react'
import { shortDate } from '@/hooks/Fecha'

const Prueba = () => {
  const [datosgasto, setDatosgasto] = useState()
  // const [vector, setVector] = useState([])

  let vector = []

  useEffect(() => {
    const databla = async () => {
      const { data } = await axios.get('/api/cuenta/1/datos')
      setDatosgasto(data)
      // console.log(data)
    }
    databla()
  }, [])

  if (!datosgasto) return <h1>Cargando</h1>
  else {
    const res = datosgasto.reduce((acumula, { detId, detDesc, detDate, detMonto, detTipo }, index) => {
      if (acumula.at(-1)?.afecha === shortDate(detDate)) {
        acumula.at(-1).datosE.push({ detId, detDesc, detMonto, detTipo })
        acumula.at(-1).bmonto = Number(acumula?.at(-1).bmonto) + Number(detMonto)
      } else {
        acumula.push({
          afecha: shortDate(detDate),
          bmonto: Number(detMonto),
          datosE: [{ detId, detDesc, detMonto, detTipo }]
        })
      }
      return acumula
    }, [])
    // console.log(res)
    vector = res
  }

  console.log(vector)

  return (
    <>

      <div className=''>
        {
          vector.map(({ afecha, bmonto }, index) => (
            <div key={index} className='flex justify-between my-2'>
              <p className='text-gray-500'>{afecha}</p>
              <p className='text-gray-500'>{bmonto}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Prueba
