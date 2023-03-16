import { contexto } from '@/contexts/Cuenta'
import Toast from '@/hooks/Toast'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Nav = ({ children }) => {
  const { ctxCamUsu, ctxUsuario, ctxCuenta, ctxCamCue, ctxCamTos, ctxCamMen } = contexto()

  useEffect(() => {
    axios.get('/api/perfil')
      .then(({ data }) => {
        ctxCamUsu(data)
        if (!ctxCuenta) {
          axios.get(`/api/cuenta/idcuenta/?usuId=${data.usuId}`)
            .then(({ data }) => {
              ctxCamCue(data.cueId)
            })
            .catch((error) => {
              console.log(error)
              ctxCamMen(true, 1)
            })
        }
      })
      .catch((error) => {
        ctxCamMen(true, 1)
        console.log(error)
      })
  }, [])

  const { push } = useRouter()

  const graficof = () => {
    if ((!ctxCuenta) || (ctxCuenta.length === 0)) {
      ctxCamTos(true, 5, 'Agrega una Cuenta')
      setTimeout(() => ctxCamTos(false, 0), 2000)
      push('/cuenta')
    } else {
      push(`/cuenta/grafico/${ctxCuenta}`)
    }
  }

  const transacf = () => {
    if ((!ctxCuenta) || (ctxCuenta.length === 0)) {
      ctxCamTos(true, 5, 'Agrega una Cuenta')
      setTimeout(() => ctxCamTos(false, 0), 2000)
      push('/cuenta')
    } else {
      push(`/cuenta/${ctxCuenta}`)
    }
  }
  if (!ctxUsuario) return Toast(true, 1)

  return (
    <>
<div className='container mx-auto '>
  <div className='mb-12  '>
    {children}
  </div>
  <div className="container mx-auto z-40 text-xs fixed grid grid-cols-4 w-full border-t bottom-0 bg-white print:hidden">
    <Link href={'/config'} className="py-1 col-span-1 flex flex-col items-center justify-end  fill-black">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z"/></svg>
      Ajustes
    </Link>

    <Link href={'/cuenta'} className="py-1 col-span-1 flex flex-col items-center justify-end fill-black">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 21h-4v-11h4v11zm7-11h-4v11h4v-11zm7 0h-4v11h4v-11zm2 12h-22v2h22v-2zm-23-13h24l-12-9-12 9z"/></svg>
      Cuentas
    </Link>

    <button onClick={graficof} className=" py-1  col-span-1 flex flex-col items-center justify-end fill-black">
      <svg height="23" viewBox="0 0 24 24" width="23" xmlns="http://www.w3.org/2000/svg"><path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11 4h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6h-4v-4h4v4zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"/></svg>
      Gráficos
    </button>

    <button onClick={transacf} className=' py-1 col-span-1 flex flex-col items-center justify-end fill-black'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      Transacciones
    </button>

  </div>
</div>
    </>
  )
}

export default Nav
