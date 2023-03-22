import { contexto } from '@/contexts/Cuenta'
import axios from 'axios'
import { useState } from 'react'

const Usuario = () => {
  const { ctxUsuario, ctxCamTos, ctxCamUsu } = contexto()

  const [esDatosUsu, setEsDatosUsu] = useState(ctxUsuario)

  const newDatosUsu = (e) => {
    setEsDatosUsu({
      ...esDatosUsu,
      [e.target.name]: e.target.value
    })
  }

  const actDatos = (e) => {
    e.preventDefault()
    ctxCamTos(true, 1)
    axios.put('/api/usuario/actUsuario', esDatosUsu)
      .then(({ data }) => {
        ctxCamUsu(esDatosUsu)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        ctxCamTos(false, 0)
      })
  }

  const btnEstado = () => (esDatosUsu.usuNom !== ctxUsuario.usuNom || esDatosUsu.usuApe !== ctxUsuario.usuApe)
  return (
    <>
      <div className='px-3'>
        <h1 className='text-lg font-semibold my-3'>Cuenta</h1>

        <div>
          <form onSubmit={actDatos} className='flex flex-col gap-3'>
              <div className='flex flex-col '>
                <label className='text-gray-500'>
                  Nombre
                </label>

                <input
                  onChange={newDatosUsu}
                  name='usuNom'
                  value={esDatosUsu.usuNom}
                  className='bg-white rounded-md border pl-2 py-2 border-black/60'
                  type="text"
                />
              </div>

              <div className='flex flex-col '>
                <label className='text-gray-500'>
                  Apellido
                </label>

                <input
                  onChange={newDatosUsu}
                  name='usuApe'
                  value={esDatosUsu.usuApe}
                  className='bg-white rounded-md border pl-2 py-2 border-black/60'
                  type="text"
                />
              </div>

              <div className='flex flex-col '>
                <label className='text-gray-500'>
                  Email
                </label>

                <input
                  onChange={newDatosUsu}
                  name='usuEmail'
                  value={esDatosUsu.usuEmail}
                  className='rounded-md border pl-2 py-2 border-black/60 bg-white'
                  type="text"
                />
              </div>

              <button
              disabled={!btnEstado()}
              className={btnEstado() ? ' btnVerde' : ' btnGris '}>
                Actualizar datos
              </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default Usuario
