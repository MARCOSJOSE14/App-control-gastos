import { contexto } from '@/contexts/Cuenta'
import { espeDate, pen } from '@/hooks/Fecha'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Toast from './cuenta/Toast'

const Datagrid = () => {
  const { catId } = contexto().contCat
  const { nuevoI } = contexto()

  const [datosgasto, setDatosgasto] = useState()

  useEffect(() => {
    const databla = async () => {
      const { data } = await axios.get('/api/cuenta/datos')
      setDatosgasto(
        data.reduce((acumula, { detId, detDesc, detDate, detMonto, detTipo }, index) => {
          if (acumula.at(-1)?.afecha === detDate) {
            acumula.at(-1).datosE.push({ detId, detDesc, detMonto, detTipo })
            acumula.at(-1).bmonto = acumula?.at(-1).bmonto + (detTipo === 'ingreso' ? (Number(detMonto)) : (Number(detMonto) * -1))
          } else {
            acumula.push({
              afecha: detDate,
              bmonto: (detTipo === 'ingreso' ? (Number(detMonto)) : (Number(detMonto) * -1)),
              datosE: [{ detId, detDesc, detMonto, detTipo }]
            })
          }
          return acumula
        }, [])
      )
    }
    if (catId !== 0) databla()
  }, [catId, nuevoI])

  if (!datosgasto || catId === 0) return <h1>Cargando</h1>
  return (
    <>
      <Toast/>
      <div className='px-5 flex flex-col justify-center py-16'>

        <div className='rounded-xl bg-white py-3 '>
        {datosgasto.map(({ afecha, bmonto, datosE }, index, datosgasto) => (
          <div key={index} className=' px-3'>
            <div className='flex justify-between my-3'>
              <p className='font-medium'>
                {espeDate(afecha)}
              </p>
              <p className='font-bold text-gray-500/70'>
                {pen(bmonto)}
              </p>
            </div>
            <div className=''>
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
            </div>
            {(datosgasto.length - 1) !== index && (<div className='bg-gray-300/20 h-0.5 my-2'></div>)}
          </div>
        ))}
        </div>
      </div>
    </>
  )
}

export default Datagrid
