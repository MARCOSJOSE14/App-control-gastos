import axios from 'axios'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { shortDate } from '@/hooks/Fecha'

const MenuCategorias = () => {
  const [fecha, setFecha] = useState(new Date())

  useEffect(() => {
    const databla = async () => {
      const hola = {
        cuentaId: 1,
        fechaInicio: (new Date(fecha)).toISOString().slice(0, 10),
        // fechaInicio: fecha.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-'),
        fechaFinal: new Date().toISOString().slice(0, 10)
      }
      const { data } = await axios.post('/api/cuenta/spCategoriasFechas', hola)
      setCategorias(data)
    }
    databla()
  }, [fecha])

  const handleChange = (fecha) => setFecha(fecha)

  const [categorias, setCategorias] = useState()
  function Recorrido (categoria) {
    return (<div>
      {
        categoria[0].map(({ ID, Categoria, Total, Porcentaje }, index) => (
          <div key={ID}>
            <p>{Categoria} {Total} {Porcentaje}</p>
          </div>
        ))
      }
      <h2>Suma Total</h2>
      <p>{categoria[2][0].SumaIngresos}</p>
      {console.log(categoria)}
    </div>)
  }

  // const cambioFecha = (fecha) => {
  //   // setFecha(prevFecha => {
  //   //   const nuevaFecha = new Date(prevFecha)
  //   //   nuevaFecha.setDate(nuevaFecha.getDate() - 1)
  //   //   return nuevaFecha
  //   // })

  //   setFecha(fecha.getDate(1))
  // }

  

  function mostrar () {
    if (!categorias) return <h1>Cargando</h1>
    else {
      return (
        <>
          <div>
            <Calendar
              onChange={handleChange}
              value={fecha}
            />
            <p> {fecha.toString()} </p>
          </div>
          <h1>Categorías</h1>
          {Recorrido(categorias)}
          
        </>
      )
    }
  }

  return (
    <>
      <div className='flex-row text-white py-1 bg-[#18b272]'>
        <button className=''>Día</button>
        <button>Semana</button>
        <button>Mes</button>
        <button>Año</button>
        <button>Período</button>
      </div>
      {mostrar()}
    </>

  )
}

export default MenuCategorias

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
