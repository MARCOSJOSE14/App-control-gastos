import { contexto } from '@/contexts/Cuenta'
import { hooCat } from '@/hooks/hooCat'
import { hooFiltroCat } from '@/hooks/hooFiltroCat'
import Toast from '@/hooks/Toast'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function ModalCat ({ turnModal, estado, camCatId, traTipo }) {
  const { ctxUsuario } = contexto()

  const [dataCat, setDataCat] = useState()
  const [esTipoCat, setEsTipoCat] = useState(traTipo)

  const fnTipoCat = ({ target: { name } }) => setEsTipoCat(name)

  const fnStop = (e) => e.stopPropagation()

  const fnRdbCat = (catId, img, des, color) => {
    camCatId(catId, esTipoCat, img, des, color)
    turnModal()
  }

  useEffect(() => {
    axios.get(`/api/usuario/${ctxUsuario.usuId}/apiCat`)
      .then(({ data }) => {
        setDataCat(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  if (!dataCat) return Toast(true, 1)
  return (
    <>
      {estado && (
          <div onClick={fnStop} className='w-full flex flex-col bg-white  rounded-t-xl p-3 fixed'>
            <div className='flex gap-2 flex-col px-3 py-2'>
              {hooFiltroCat(dataCat)[esTipoCat].map(({ catImg, catDes, catId, catColor, catModo }) => (
                <button onClick={() => fnRdbCat(catId, catImg, catDes, catColor)} key={catId} className='flex rounded-full gap-3 items-center m-1'>
                    <div className='flex rounded-full p-2 h-full fill-white self-center' style={{ backgroundColor: catColor }}>
                      {hooCat(catImg)}
                    </div>

                    <h1>{catDes} </h1>
                </button>
              ))}
            </div>

            <div className='flex justify-evenly uppercase font-bold text-[#324c5b] text-center border-t py-2'>
              <button onClick={fnTipoCat} name='ingreso' className={(esTipoCat === 'ingreso') ? ('underline text-green-600') : ('no-underline')}>Ingresos</button>
              <button onClick={fnTipoCat} name='gasto' className={(esTipoCat === 'gasto') ? ('underline text-red-600') : ('no-underline')}>Gastos</button>
            </div>
          </div>
      )}
    </>
  )
}
