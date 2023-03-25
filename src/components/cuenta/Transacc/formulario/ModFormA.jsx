import Modales from '@/components/plantilla/Modales'
import { contexto } from '@/contexts/Cuenta'
import { hooApi } from '@/hooks/hooApi'
import { hooCat } from '@/hooks/hooCat'
import { hooFiltroCat } from '@/hooks/hooFiltroCat'
import Toast from '@/hooks/Toast'
import { useEffect, useState } from 'react'
import ModFormB from './ModFormB'

const ModFormA = ({ turnModal, dataModal }) => {
  const [newData, setNewData] = useState(dataModal)
  const [esTipoCat, setEsTipoCat] = useState(dataModal.tipo)
  const [esCat, setEsCat] = useState(true)

  const { ctxUsuario, ctxCuenta } = contexto()

  useEffect(() => {
    if (dataModal.tipoForm === 'editar' || dataModal.catId !== 0) {
      setEsCat(false)
    }
  }, [])

  const fnCamEsCat = () => {
    setEsCat(!esCat)
  }

  const fnTipoCat = ({ target: { name } }) => setEsTipoCat(name)

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

  const fnCat = () => {
    if (dataModal.catId === newData.catId && dataModal.tipoForm === 'editar') return false
    if (newData.catId !== 0) return true
    return false
  }

  const dataCat = hooApi(`usuario/${ctxUsuario.usuId}/apiCat`)

  useEffect(() => {
    if (dataModal.tipo !== newData.tipo || dataModal.traDate !== newData.traDate) {
      setEsTipoCat(dataModal.tipo)
      setNewData(dataModal)
    }
  }, [dataModal])

  if (!dataCat) return Toast(true, 1)
  return (
    <>
        {
          (esCat) &&
          <Modales fnAtras={turnModal} enlace={`/cuenta/${ctxCuenta}`} z={49}>
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
          </Modales>
          }

        {
          <ModFormB turnModal={turnModal} camEstCat={fnCamEsCat} data ={newData} cat={fnCat()} />
        }

    </>
  )
}

export default ModFormA
