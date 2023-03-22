import Modales from '@/components/plantiila/Modales'
import { contexto } from '@/contexts/Cuenta'
import { espeDate, isoDate, pen } from '@/hooks/Fecha'
import { hooApi } from '@/hooks/hooApi'
import { hooCat } from '@/hooks/hooCat'
import { totalDate } from '@/hooks/hooDate'
import Toast from '@/hooks/Toast'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ModFormA from './formulario/ModFormA'

const ModalTraDetalle = ({ closeModal, data }) => {
  const { ctxCuenta, ctxTostada } = contexto()
  const { id, fechaI, fechaF } = data

  const { push } = useRouter()

  const [abrir, setAbrir] = useState(false)

  const [dataModal, setDataModal] = useState({
    traDes: '',
    tipo: '',
    traMonto: '',
    traDate: '',
    catId: 0,
    catImg: 0,
    catDes: '',
    catColor: '',
    cueId: ctxCuenta,
    traId: 0,
    tipoForm: 'editar'
  })

  const fnTurn = () => {
    setAbrir(false)
  }

  const fnOpenModal = ({ catDes, color, img, tipo, catId }, idTra, montoTra, fecha, desTra) => {
    setDataModal({
      ...dataModal,
      catImg: img,
      catDes,
      catColor: color,
      traMonto: montoTra,
      traDate: isoDate(fecha),
      traDes: desTra,
      traId: idTra,
      tipo,
      catId
    })
    setAbrir(true)
    push('#ediTra')
  }

  let filTotal
  const datos = hooApi(`cuenta/${ctxCuenta}/apiDetalle/?fechai=${fechaI}&fechaf=${fechaF}&catId=${id}`, '', 'GET', [ctxTostada])

  if (datos) { filTotal = totalDate(datos.dataCat) }

  if (!datos || !filTotal) return Toast(true, 1)

  return (
    <>
      {abrir && <ModFormA turnModal={fnTurn} dataModal ={dataModal}/>}

      <Modales fnAtras={closeModal} enlace={`/cuenta/${ctxCuenta}`}>
        <div onClick={(e) => e.stopPropagation()} className=' bg-white w-full pb-16 overflow-y-scroll'>
          <div className='flex justify-center items-center gap-3 text-xl font-semibold py-3 rounded sticky top-0 bg-white'>
            <div className='flex rounded-full p-2 h-full fill-white ' style={{ backgroundColor: datos.total.color }}>
                    {hooCat(datos.total.img)}
            </div>

            <h1 style={{ color: datos.total.color }}>
            {datos.total.catDes}
            </h1>

            <h1 className='font-bold'>
              S/ {datos.total.monto}
            </h1>
          </div>

          <div className='flex flex-col px-4'>
            {
              datos.dataCat.map(({ ID, Descripcion, Fecha, Monto }, index, dataCat) => (
                <div key={ID}>
                  {((index === 0) || (Fecha !== dataCat[index - 1].Fecha)) && (
                    <div className='flex justify-between mt-6 italic text-sm font-semibold text-gray-500'>
                      <h1>{espeDate(Fecha)}</h1>
                      <h1>{pen((filTotal.find(({ fecha }) => fecha === Fecha)).total)}</h1>
                    </div>
                  )}
                  <div onClick={() => fnOpenModal(datos.total, ID, Monto, Fecha, Descripcion)} className='flex justify-between border-b px-2 py-2'>
                    <h1>{Descripcion}</h1>
                    <h1>{Monto}</h1>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </Modales>
    </>
  )
}

export default ModalTraDetalle
