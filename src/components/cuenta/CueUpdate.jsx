import { contexto } from '@/contexts/Cuenta'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const CueUpdate = ({ cerrarModal, esModal, dataModa }) => {
  const { ctxCamTos, ctxCamMen } = contexto()

  const [esDataCat, setEsDataCat] = useState(dataModa)

  const nuevaCat = (e) => {
    e.preventDefault()
    ctxCamTos(true, 1)
    if (dataModa.nombre === '') {
      axios.post('/api/usuario/apiCueNew', esDataCat)
        .then(({ data }) => {
          ctxCamTos(data.modo, data.tipo)
        })
        .catch((error) => {
          ctxCamMen(true, 1)
          console.error(error)
        })
        .finally(() => {
          ctxCamTos()
          cerrarModal()
        })
    } else {
      axios.put('/api/cuenta/apiCueEdit', esDataCat)
        .then(({ data }) => {
          ctxCamTos(data.modo, data.tipo)
        })
        .catch((error) => {
          ctxCamMen(true, 1)
          console.error(error)
        })
        .finally(() => {
          ctxCamTos()
          cerrarModal()
        })
    }
  }

  const fnDatosCat = ({ target: { name, value } }) => {
    setEsDataCat({
      ...esDataCat,
      [name]: value
    })
  }

  const btnEstado = () => ((esDataCat.nombre === '') || (esDataCat.nombre === dataModa.nombre))

  useEffect(() => {
    setEsDataCat(dataModa)

    const retroceder = () => {
      cerrarModal()
    }

    window.addEventListener('popstate', retroceder)

    return () => {
      window.removeEventListener('popstate', retroceder)
    }
  }, [esModal])

  return (
    <>
    {esModal && (
    <div className='fixed inset-0 flex flex-col bg-black/50 z-40'>
    <Link href='/cuenta' onClick={cerrarModal} className='grow'/>
      <div className='bg-white mb-10 pb-10 rounded-xl flex flex-col px-3 py-3'>
        <Link href='/cuenta' onClick={cerrarModal} className='self-end px-2 fill-black text-sm flex items-center gap-2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
        </Link>

        <h1 className='text-center font-semibold text-lg text-blue-800 my-3'>{(dataModa.nombre === '') ? ('Nueva') : ('Editar')} Cuenta</h1>

        <form onSubmit={nuevaCat} className='flex flex-col px-5 gap-4'>

          <input type="text" name='nombre' placeholder='Nombre de la Categoria' className='border-b px-2 py-1' value={esDataCat.nombre} onChange={fnDatosCat}/>

          <button
          disabled={btnEstado()}
          className={btnEstado() ? ' btnGris ' : ' btnVerde'}>
            {(dataModa.nombre === '') ? ('Crear Cuenta') : ('Guardar Cambios')}
          </button>
        </form>
      </div>
    </div>
    )}
    </>
  )
}
export default CueUpdate
