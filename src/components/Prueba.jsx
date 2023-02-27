import axios from 'axios'
import { useEffect, useState } from 'react'
import { shortDate, longDate } from '@/hooks/Fecha'
// import datos from '@/pages/api/cuenta/lista'

const Prueba = () => {
  const [datosgasto, setDatosgasto] = useState()

  useEffect(() => {
    const databla = async () => {
      const { data } = await axios.get('/api/cuenta/1/datos')
      setDatosgasto(data)
      // console.log(data)
    }
    databla()
  }, [])

  const arr = [
    {
      level: 'INF',
      model: 'A'
    }, {
      level: 'INF',
      model: 'B'
    }, {
      level: 'INF',
      model: 'C'
    }, {
      level: 'INC',
      model: 'A'
    }, {
      level: 'IND',
      model: 'A'
    }, {
      level: 'IND',
      model: 'B'
    }
  ]

  let contador = 0

  const guardar = () => {
    const res = datosgasto.reduce(function (total, current) {
      const fecha = shortDate(current.detDate).toString()

      if (total[fecha]) contador++
      else {
        contador = 0
        total[fecha] = { dia: fecha }
      }
      total[fecha][contador] = current

      return total
    }, {})
    console.log(res)
  }

  if (!datosgasto) return <h1>Cargando</h1>
  else {
    // console.log(datosgasto)
    guardar()
  }
  return (
    <>
      <h1>Esta es la prueba</h1>
      {

      datosgasto.map((datosgasto, index) => (

      <p key={index}>{ datosgasto.detDesc} </p>
      ))

      }

    </>
  )
}

export default Prueba
