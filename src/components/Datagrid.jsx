import axios from 'axios'
import { useEffect, useState } from 'react'

const Datagrid = ({ actuli }) => {
  const [datosgasto, setDatosgasto] = useState()

  useEffect(() => {
    const databla = async () => {
      const { data } = await axios.get('api/datos')
      setDatosgasto(data)
    }
    databla()
  }, [actuli])

  if (!datosgasto) return <h1>Cargando</h1>

  return (
    <>
    <div className='px-5 flex flex-col justify-center'>
      <div className="grid grid-cols-3 font-semibold text-lg ">
        <div className='grid grid-rows-2 grid-cols-3 justify-start col-span-2  lg:flex-row lg:justify-center'>
          <p className='row-start-2 row-end-3 col-span-3 font-normal text-xs -mt-1 text-gray-500 lg:mt-0 lg:text-black lg:font-semibold lg:row-span-2 lg:col-span-1 lg:text-lg '>Fecha</p>

          <p className='row-start-1 row-end-2 col-span-3 lg:row-span-2 lg:col-span-2  lg:flex lg:justify-center'>Descripción</p>
        </div>

        <p className=' flex justify-end lg:justify-center '>Monto</p>
      </div>

      {datosgasto.map(({ detDesc, detFecha, detMonto }, index) => (
          <div key={index} className="grid grid-cols-3 text-lg border-t pt-1.5">
            <div className='grid grid-rows-2 grid-cols-3 justify-start col-span-2  lg:flex-row lg:justify-center'>
              <p className='row-start-2 row-end-3 col-span-3 font-normal text-xs -mt-1 text-gray-500 lg:text-lg lg:mt-0 lg:text-black lg:font-normal lg:row-span-2 lg:col-span-1'>{((new Date(detFecha)).toLocaleDateString('es-ES'))}</p>

              <p className='row-start-1 row-end-2 col-span-3 overflow-hidden text-ellipsis whitespace-nowrap lg:row-span-2 lg:col-span-2 lg:flex lg:justify-start'>{detDesc}</p>
            </div>

            <p className=' flex justify-end lg:justify-center '>{detMonto}</p>
          </div>
      ))}
    </div>
    </>
  )
}

export default Datagrid
