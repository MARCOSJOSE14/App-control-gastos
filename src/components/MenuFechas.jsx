import axios from 'axios'
import { swcMinify } from 'next.config'
import { useEffect, useState } from 'react'

import { shortDate } from '@/hooks/Fecha'

const MenuFechas = () => {
  const [fechas, setFechas] = useState()

  useEffect(() => {
    const databla = async () => {
      const contenido = {
        fechaInicio: '2023-01-01',
        fechaFinal: '2023-03-02',
        categoria: 1
      }
      const { data } = await axios.post('/api/cuenta/spListaFechas', contenido)
      setFechas(data)
      console.log(data)
    }
    databla()
  }, [])

  //   console.log(fechas)
  let arrayPadre = []

  if (!fechas) return <h1>Cargando</h1>
  else {
    arrayPadre = fechas[0].reduce((acumula, { Fecha, ID, Monto }, index) => {
      if (acumula.at(-1)?.afecha === shortDate(Fecha)) {
        acumula.at(-1).datosE.push({ ID, Monto })
        // acumula.at(-1).bmonto = Number(acumula?.at(-1).bmonto) + Number(Monto)
      } else {
        acumula.push({
          afecha: shortDate(Fecha),
          // bmonto: Monto,
          datosE: [{ ID, Monto }]
        })
      }
      return acumula
    }, [])
    // console.log(arrayPadre)
    // recorridoPadre(arrayPadre)
  }

  function recorridoPadre (arrayPadre) {
    // console.log(arrayPadre)
    return (
      <>
        <h1>Categoria: {fechas[2][0].Categoria}</h1>
        <h2>Monto Total: {fechas[1][0]['Monto Total']}</h2>

        <div>
          {arrayPadre.map(({ afecha, datosE }, index) => (
            <div key={index}>
              <span> Fecha: {afecha}</span>
              {/* <span> Monto: {bmonto}</span> */}
              {recorridoHijo(datosE)}
            </div>
          ))}
        </div>
      </>
    )
  }

  function recorridoHijo (arrayHijo) {
    return (<div>
      {
        arrayHijo.map(({ ID, Monto }) => (
          <div key={ID}>
            <p>{Monto}</p>
          </div>
        ))
      }
    </div>)
  }

  const miVector = [
    'Elemento 1',
    'Elemento 2',
    ['Elemento 3.1', 'Elemento 3.2', 'Elemento 3.3'],
    'Elemento 4'
  ]

  return <>
    {recorridoPadre(arrayPadre)}
  </>
}

export default MenuFechas

/* <div className=''>
        {
          datosE.map(({ detId, detDesc, detMonto, detTipo }) => (
            <div key={detId} className='flex justify-between my-2'>
              <p className='text-gray-500'>{detDesc}</p>
              <p className={('font-bold ').concat(detTipo === 'ingreso' ? 'text-[#18b272]' : 'text-[#f15767] ')}>
                {detTipo === 'ingreso' && ('+')}{pen(detTipo === 'ingreso' ? (Number(detMonto)) : (Number(detMonto) * -1))}
              </p>
            </div>
          ))
        }
      </div> */
