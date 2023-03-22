import { contexto } from '@/contexts/Cuenta'
import { hooCat } from '@/hooks/hooCat'
import { hooFiltroCat } from '@/hooks/hooFiltroCat'
import Toast from '@/hooks/Toast'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CatUpdate from './CatUpdate'

const Categorias = () => {
  const { usuId } = contexto().ctxUsuario
  const { ctxTostada, ctxCamTos, ctxCamMen, ctxUsuario } = contexto()

  const [dataCat, setDataCat] = useState()
  const [esTipoCat, setEsTipoCat] = useState('ingreso')
  const [estModalCat, setEstModalCat] = useState(false)
  const [esEditCat, setEsEditCat] = useState({
    nombre: '',
    tipo: esTipoCat,
    icono: 0,
    color: '',
    catId: 0,
    user: ctxUsuario.usuId
  })

  const { push } = useRouter()

  const camCatModo = (catId) => {
    ctxCamTos(true, 1)
    axios.get(`/api/categoria/${catId}/apiModCat`)
      .then(({ data }) => {
        ctxCamTos(data.modo, data.tipo)
      })
      .catch((error) => {
        ctxCamMen(true, 1)
        console.error(error)
      })
      .finally(() => {
        setTimeout(() => {
          ctxCamTos(false)
        }, 750)
      })
  }

  const fnTipoCat = (e) => {
    setEsTipoCat(e.target.name)
  }

  const fnEditCat = (catImg, catDes, catId, catColor, catTipo) => {
    setEsEditCat({
      ...esEditCat,
      nombre: catDes,
      tipo: catTipo,
      icono: catImg,
      color: catColor,
      catId,
      user: ctxUsuario.usuId
    })
    setEstModalCat(!estModalCat)
  }

  const cerrarModal = () => {
    setEstModalCat(false)
    push('/config')
  }

  const turnModal = () => {
    setEsEditCat({
      ...esEditCat,
      nombre: '',
      tipo: esTipoCat,
      icono: 0,
      color: '',
      catId: 0,
      user: ctxUsuario.usuId
    })
    setEstModalCat(!estModalCat)
  }

  useEffect(() => {
    axios.get(`/api/usuario/${usuId}/apiCat`)
      .then(({ data }) => {
        setDataCat(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [ctxTostada])

  if (!dataCat) return Toast(true, 1)

  return (
    <>
          <CatUpdate
          cerrarModal = {cerrarModal}
          esModal = {estModalCat}
          dataModa = {esEditCat}
          />
          <div className='px-3'>
            <h1 className='text-lg font-semibold my-3'>Categorias</h1>

            <div className='flex flex-col'>
              <Link
              href='#newcat'
              onClick={turnModal}
              className='btnVerde'>
                Crear Nueva Categoria
              </Link>
              <div className='bg-white flex flex-col gap-5 my-5'>
                <div className='flex justify-evenly uppercase font-bold text-[#324c5b] text-center'>
                  <button onClick={fnTipoCat} name='ingreso' className={(esTipoCat === 'ingreso') ? ('underline') : ('no-underline')}>Ingresos</button>
                  <button onClick={fnTipoCat} name='gasto' className={(esTipoCat === 'gasto') ? ('underline') : ('no-underline')}>Gastos</button>
                </div>

                      <div className='flex flex-col gap-2 justify-center'>
                        {hooFiltroCat(dataCat)[esTipoCat].map(({ catImg, catDes, catId, catColor, catModo, catTipo }) => (
                          <div key={catId} className='flex justify-between  gap-4  items-center border-b py-2'>
                              <div className='flex rounded-full p-2 h-full fill-white' style={{ backgroundColor: catColor }}>
                                {hooCat(catImg)}
                              </div>

                              <h1 className='flex grow h-full'>{catDes} </h1>

                            <button onClick={() => fnEditCat(catImg, catDes, catId, catColor, catTipo)}>
                              <svg className='fill-orange-600' xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z"/></svg>
                            </button>

                            <button onClick={() => camCatModo(catId)}>
                              <svg className={catModo ? ('fill-green-600') : ('fill-red-600')} height='25' width='25' clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" fillRule="nonzero"/></svg>
                            </button>
                          </div>
                        ))}
                      </div>

              </div>
            </div>
          </div>
    </>
  )
}

export default Categorias
