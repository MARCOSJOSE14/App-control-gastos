import { contexto } from '@/contexts/Cuenta'
import { espeDate } from '@/hooks/Fecha'
import { hooApi } from '@/hooks/hooApi'
import hooAtras from '@/hooks/hooAtras'
import { hooCat } from '@/hooks/hooCat'
import Toast from '@/hooks/Toast'

const ModalTraDetalle = ({ closeModal, data }) => {
  const { ctxCuenta } = contexto()
  const { id, fechaI, fechaF } = data

  const datos = hooApi(`cuenta/${ctxCuenta}/apiDetalle/?fechai=${fechaI}&fechaf=${fechaF}&catId=${id}`)

  hooAtras(closeModal)

  if (!datos) return Toast(true, 1)

  return (
    <>
      <div onClick={closeModal} className='fixed inset-0 bg-black/50 z-[39] flex flex-col justify-end'>
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
                  {((index === 0) || (Fecha !== dataCat[index - 1].Fecha)) && <h1 className='flex mt-6 italic text-sm font-semibold text-gray-500'>{espeDate(Fecha)}</h1>}
                  <div className='flex justify-between border-b px-2 py-2'>
                    <h1>{Descripcion}</h1>
                    <h1>{Monto}</h1>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalTraDetalle
