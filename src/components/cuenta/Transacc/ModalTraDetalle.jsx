import { contexto } from '@/contexts/Cuenta'
import { espeDate, pen } from '@/hooks/Fecha'
import { hooCat } from '@/hooks/hooCat'
import Link from 'next/link'
import { useEffect } from 'react'

const ModalTraDetalle = ({ estado, closeModal, datos }) => {
  const { ctxCuenta } = contexto()

  useEffect(() => {
    const retroceder = () => {
      closeModal()
    }

    window.addEventListener('popstate', retroceder)

    return () => {
      window.removeEventListener('popstate', retroceder)
    }
  }, [])
  return (
    <>
    {estado && (
      <div className="fixed inset-0 flex flex-col bg-black/50 z-40">
        <div onClick={closeModal} className='grow'/>
        <div className='self-end w-full flex flex-col bg-white  rounded-t-xl p-3 pb-20'>
          <Link href={`/cuenta/${ctxCuenta}`} onClick={closeModal} className='self-end px-2 fill-black text-sm flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
          </Link>

          <div className='flex gap-2 grow items-center justify-center py-2 my-2'>
            <div className='flex rounded-full p-2 h-full fill-white' style={{ backgroundColor: datos.catColor }}>
              {hooCat(datos.catImg)}
            </div>
            <h1 className='text-xl font-medium'>{datos.catDes}</h1>
          </div>

          <div>
            {
              datos.traDate.map(({ fecha, traDetalles }) => (
                <div key={fecha} className='flex flex-col'>
                  <h1 className='border-b font-medium text-blue-800'>{espeDate(fecha)}</h1>
                  {
                    traDetalles.map(({ traDes, traId, traMonto }) => (
                      <div key={traId} className='flex gap-2 justify-between p-2 my-2'>
                        <h1>{traDes}</h1>
                        <h1>{pen(traMonto)}</h1>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
    }
    </>
  )
}

export default ModalTraDetalle
