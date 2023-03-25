import Modales from '@/components/plantilla/Modales'
import { contexto } from '@/contexts/Cuenta'
import { espeDate2, isoDate, pen } from '@/hooks/Fecha'
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
  const [esNewTra, setEsNewTra] = useState(false)

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

  const [dataNewTra, setDataNewTra] = useState({
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
    tipoForm: 'nuevo'
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

  const fnNewTra = (img, catDes, color, tipo, catId) => {
    setDataNewTra({
      ...dataNewTra,
      catImg: img,
      catDes,
      catColor: color,
      tipo,
      catId
    })
    setEsNewTra(true)
    push('#newTra')
  }

  let filTotal
  const datos = hooApi(`cuenta/${ctxCuenta}/apiDetalle/?fechai=${fechaI}&fechaf=${fechaF}&catId=${id}`, '', 'GET', [ctxTostada])

  if (datos) { filTotal = totalDate(datos.dataCat) }

  if (!datos || !filTotal) return Toast(true, 1)

  return (
    <>
      {esNewTra && <ModFormA turnModal={() => setEsNewTra(false)} dataModal ={dataNewTra}/>}

      {abrir && <ModFormA turnModal={fnTurn} dataModal ={dataModal}/>}

      <div className='container mx-auto fixed bottom-0 w-full px-10 z-[45] mb-12 py-2 bg-white'>
        <button onClick={() => fnNewTra(datos.total.img, datos.total.catDes, datos.total.color, datos.total.tipo, datos.total.catId)} className='btnVerde px-5'>Agregar Transacción</button>
      </div>

      <Modales fnAtras={closeModal} enlace={`/cuenta/${ctxCuenta}`} z={44}>
        <div className='pb-14'>
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
              datos.dataCat.map(({ Fecha, suma, dataTra }, index) => (
                <div key={index} className='grid grid-cols-7'>
                    <div className='col-span-7 flex  mt-6 italic  font-semibold '>
                      <h1>{espeDate2(Fecha)}</h1>
                    </div>

                    {dataTra.map(({ ID, Monto, Descripcion }) => (
                      <div
                      key={ID}
                      onClick={() => fnOpenModal(datos.total, ID, Monto, Fecha, Descripcion)}
                      className='col-span-6 flex justify-between border-b py-2 px-1 border-black/60 gap-2 '>
                        <h1 className='col-span-4 lowercase'>{Descripcion}</h1>

                        <h1 className='col-span-2 '>{((Number(Monto)).toFixed(2))}</h1>
                      </div>
                    ))}

                    <div className='col-span-7 flex justify-end mt-6 italic font-semibold border-t border-black/60'>
                      <h1>{pen(suma)}</h1>
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
