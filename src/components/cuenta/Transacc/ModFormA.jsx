import { contexto } from '@/contexts/Cuenta'
import { hooCat } from '@/hooks/hooCat'
import { hooFiltroCat } from '@/hooks/hooFiltroCat'
import Toast from '@/hooks/Toast'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ModFormB from './ModFormB'

const ModFormA = ({ turnModal, estado, dataModal }) => {
  const [dataCat, setDataCat] = useState()
  const [newData, setNewData] = useState(dataModal)
  const [esTipoCat, setEsTipoCat] = useState(dataModal.tipo)
  const [esCat, setEsCat] = useState(true)

  const { ctxUsuario, ctxCuenta } = contexto()

  const { push } = useRouter()

  const fnCamEsCat = () => {
    setEsCat(!esCat)
  }

  const fnTipoCat = ({ target: { name } }) => setEsTipoCat(name)

  const fnStop = (e) => e.stopPropagation()

  const fnCloseForm = () => {
    turnModal()
    push(`/cuenta/${ctxCuenta}`)
  }

  const fnCatSelect = (catId, catImg, catDes, catColor, catTipo) => {
    setNewData({
      ...newData,
      catId,
      catImg,
      catDes,
      catColor,
      tipo: catTipo
    })
    setEsCat(false)
  }

  useEffect(() => {
    axios.get(`/api/usuario/${ctxUsuario.usuId}/apiCat`)
      .then(({ data }) => {
        setDataCat(data)
      })
      .catch((error) => {
        console.error(error)
      })
    window.addEventListener('popstate', turnModal)

    return () => {
      window.removeEventListener('popstate', turnModal)
    }
  }, [])

  console.log(newData.catId)
  useEffect(() => {
    if (dataModal.tipo !== newData.tipo || dataModal.traDate !== newData.traDate) {
      setEsTipoCat(dataModal.tipo)
      setNewData(dataModal)
    }
  }, [dataModal])
  if (!dataCat) return Toast(true, 1)
  return (
    <>
      {(estado) && (
        <>
        {
          (esCat) && <div onClick={fnCloseForm} className='fixed mx-auto inset-0 flex flex-col justify-end bg-black/50 pb-12 z-40'>
            <div onClick={fnStop} className='w-full flex flex-col bg-white  rounded-t-xl p-3 fixed'>
              <div className='flex  flex-col px-3 py-2'>
                {hooFiltroCat(dataCat)[esTipoCat].map(({ catId, catImg, catDes, catColor, catTipo }) => (
                  <button key={catId} onClick={() => fnCatSelect(catId, catImg, catDes, catColor, catTipo)}
                  className={('flex rounded-full gap-3 items-center m-1 border px-2 py-1 ').concat((newData.catId === catId) ? (' border-blue-600 bg-blue-100 shadow') : '')}>
                      <div className='flex rounded-full p-2 h-full fill-white self-center' style={{ backgroundColor: catColor }}>
                        {hooCat(catImg)}
                      </div>

                      <h1>{catDes} </h1>
                  </button>
                ))}
              </div>

              <div className='flex justify-evenly uppercase font-bold text-[#324c5b] text-center border-t py-2'>
                <button onClick={fnTipoCat} name='gasto' className={(esTipoCat === 'gasto') ? ('underline text-red-600') : ('no-underline')}>Gastos</button>
                <button onClick={fnTipoCat} name='ingreso' className={(esTipoCat === 'ingreso') ? ('underline text-green-600') : ('no-underline')}>Ingresos</button>
              </div>
            </div>
          </div>}

        {
          <ModFormB turnModal={fnCloseForm} camEstCat={fnCamEsCat} data ={newData} />
        }
      </>
      )
    }
    </>
  )
}

export default ModFormA
