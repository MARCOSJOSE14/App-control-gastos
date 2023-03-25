import CueUpdate from '@/components/cuenta/CueUpdate'
import Layout from '@/components/plantilla/Layout'
import Nav from '@/components/plantilla/Nav'
import TituloNav from '@/components/plantilla/TituloNav'
import { contexto } from '@/contexts/Cuenta'
import Toast from '@/hooks/Toast'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function cuenta () {
  const { push } = useRouter()

  const { ctxUsuario, ctxCamCue, ctxTostada, ctxCamMen } = contexto()

  const [estModalCat, setEstModalCat] = useState(false)
  const [datosCue, SetDatosCue] = useState()
  const [esEditCue, setEsEditCue] = useState({
    nombre: '',
    usuId: ctxUsuario.usuId,
    cueId: 0
  })

  const cerrarModal = () => {
    setEstModalCat(false)
    push('/cuenta')
  }

  const turnModal = () => {
    setEsEditCue({
      nombre: '',
      usuId: ctxUsuario.usuId,
      cueId: 0
    })
    setEstModalCat(!estModalCat)
  }

  const fnEditCue = (cueId, cueDes) => {
    setEsEditCue({
      nombre: cueDes,
      usuId: ctxUsuario.usuId,
      cueId
    })
    setEstModalCat(!estModalCat)
  }

  const enviocuenta = (cueId) => {
    ctxCamCue(cueId)
    push(`/cuenta/${cueId}`)
  }

  useEffect(() => {
    axios.get(`/api/cuenta/lista/?usuId=${ctxUsuario.usuId}`)
      .then(({ data }) => {
        SetDatosCue(data)
      })
      .catch((error) => {
        ctxCamMen(true, 1)
        console.error(error)
      })
  }, [ctxTostada])

  if (!datosCue) return Toast(1, true)

  return (
    <>
    <CueUpdate
    cerrarModal = {cerrarModal}
    esModal = {estModalCat}
    dataModa = {esEditCue}
    />
      <TituloNav>
        Cuentas
      </TituloNav>

      <div className='container mx-auto'>
        <div className="p-3  flex flex-col gap-3">

          {(!datosCue)
            ? (
              <div className='flex flex-col gap-3 p-3 '>
              <div className='h-5 bg-gray-200 w-3/4 mx-auto'/>
              <div className='h-8 bg-gray-200 w-3/4 mx-auto'/>
            </div>
              )
            : (datosCue.length === 0)
                ? (
              <p className='italic flex justify-center text-lg text-gray-500/70 font-semibold'>
                Hey!, Agrega una cuenta Bro
              </p>
                  )
                : (datosCue.map(({ cueId, cueDes }) => (
            <div key={cueId} className='flex justify-between gap-4 shadow rounded-lg border items-center px-3 py-2 bg-white'>
              <button onClick={() => enviocuenta(cueId)}>
                <div className=' text-lg font-semibold  flex items-center gap-3 grow'>
                <svg enableBackground="new 0 0 50 50" height="30px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="30px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" >
                  <rect fill="none" height="50" width="50"/>
                    <g>
                      <path d="M25,10.062   c0-3.59-2.913-6.5-6.5-6.5c-3.593,0-6.5,2.91-6.5,6.5c0,1.007,0.23,1.955,0.642,2.8" fill="none" stroke="#0DA000" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
                    </g>
                    <path d="  M45.375,24.029h-1.627c-0.848,0-1.25-0.377-1.312-0.762c-0.443-2.789-2.255-6.413-6.809-8.003c-0.044-2.523,0.519-4.343,1.615-7.304  c-2.547,0.639-5.361,2.026-7.027,5.7c-1.877-0.459-3.883-0.707-5.978-0.707c-5.485,0-9.622,1.664-12.934,4.242  c-2.991,2.329-4.87,6.229-4.647,11.549c0.168,4.013,2.963,7.075,5.107,8.79c0.309,0.244,0.925,0.635,0.603,1.632  c-0.323,0.995-0.903,2.384-0.903,2.384c-0.338,0.886,0.111,1.881,0.996,2.218l3.218,1.216c0.886,0.338,1.881-0.109,2.218-0.996  c0,0,0.428-1.115,0.776-2.045c0.661-1.748,1.065-0.33,5.566-0.33c4.677,0,5.149-0.912,5.638,0.52  c0.313,0.935,0.703,1.855,0.703,1.855c0.334,0.887,1.33,1.334,2.219,0.996l3.214-1.216c0.888-0.337,1.338-1.332,0.999-2.218  l-0.516-1.365c0,0-0.525-0.9,0.6-1.511c2.242-1.22,3.932-3.071,5.028-5.357c0.233-0.49,0.577-1.156,1.626-1.156h1.627  c0.896,0,1.625-0.729,1.625-1.624v-4.879C47,24.761,46.271,24.029,45.375,24.029z" fill="none" stroke="#0DA000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
                    <path d="M36.48,26.922c-1.059,0-1.916-0.857-1.916-1.914c0-1.055,0.857-1.912,1.916-1.912c1.056,0,1.91,0.857,1.91,1.912  C38.391,26.064,37.536,26.922,36.48,26.922z"/>
                    <path d="  M6.826,23.096c0,0-3.826-0.876-3.826-4.327c0-1.415,0.714-2.717,1.963-3.256" fill="none" stroke="#0DA000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
                </svg>
                  <p>{cueDes}</p>
                </div>
              </button>

              <button onClick={() => fnEditCue(cueId, cueDes)}>
                <svg className='fill-orange-600' xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z"/></svg>
              </button>
            </div>
                  )))}

        </div>
        <div className='container mx-auto fixed bottom-0 w-full px-10 z-30'>
          <button
          onClick={turnModal}
          className=' mb-20 w-full btnVerde'>
            Agregar Nueva Cuenta
          </button>
        </div>
      </div>
    </>
  )
}

cuenta.getLayout = function getLayout (page) {
  return (
    <Layout>
      <Nav>
        {page}
      </Nav>
    </Layout>
  )
}
