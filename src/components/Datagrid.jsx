import { contexto } from '@/contexts/Cuenta'
import { shortDate, longDate } from '@/hooks/Fecha'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Datagrid = () => {
  const { catId } = contexto().contCat
  const { nuevoI } = contexto()
  const [datosgasto, setDatosgasto] = useState()
  const [mostrar, setMostrar] = useState(-1)

  useEffect(() => {
    const databla = async () => {
      const { data } = await axios.get(`/api/cuenta/datos/${catId}`)
      setDatosgasto(data)
    }
    databla()
  }, [catId, nuevoI])

  const expandir = (index) => mostrar === index ? setMostrar(-1) : setMostrar(index)

  if (!datosgasto) return <h1>Cargando</h1>
  if (catId === 0) return <h1>Cargando</h1>

  return (
    <>
    <div className='px-5 flex flex-col justify-center py-16'>
      <div className="grid grid-cols-3 font-semibold text-lg text-gray-500">
        <div className='grid grid-rows-2 grid-cols-3 justify-start col-span-2  lg:flex-row lg:justify-center'>
          <p className='row-start-2 row-end-3 col-span-3 font-normal text-xs -mt-1 text-gray-500 lg:mt-0 lg:font-semibold lg:row-span-2 lg:col-span-1 lg:text-lg max-[1023px]:hidden'>Fecha</p>

          <p className='row-start-1 row-end-3 col-span-3 lg:row-span-2 lg:col-span-2  lg:flex lg:justify-center'>Descripción</p>
        </div>

        <p className=' flex justify-end lg:justify-center '>Monto</p>
      </div>

      {datosgasto.map(({ detId, detDesc, detDate, detMonto }) => (
        <div key={detId} id={detId} className='rounded-xl border my-2 px-3 shadow'>
          <div onClick={() => expandir(detId)} className="grid grid-cols-3 text-lg pt-1.5">
            <div className='grid grid-rows-2 grid-cols-3 justify-start col-span-2  lg:flex-row lg:justify-center'>
              <p className='row-start-2 row-end-3 col-span-3 font-normal text-xs -mt-1 text-gray-500 lg:text-lg lg:mt-0 lg:text-black lg:font-normal lg:row-span-2 lg:col-span-1 '>{shortDate(detDate)}</p>

              <p className='row-start-1 row-end-2 col-span-3 overflow-hidden text-ellipsis whitespace-nowrap font-semibold lg:row-span-2 lg:col-span-2 lg:flex lg:justify-start'>{detDesc}</p>
            </div>

            <p className=' flex justify-end lg:justify-center text-red-500'>{detMonto}</p>
          </div>
          <div className={mostrar === detId ? 'block text-gray-500 border-t-2 py-2' : 'hidden'} >
            <p>{detDesc}</p>
            <div className='flex justify-between'>
            <p>{longDate(detDate)}</p>
            <p>{detMonto}</p>
            </div>
          </div>

          </div>
      ))}
      <div id='end'></div>
    </div>
    </>
  )
}

export default Datagrid
