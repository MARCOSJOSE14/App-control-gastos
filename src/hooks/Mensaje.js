import { contexto } from '@/contexts/Cuenta'
import { useRouter } from 'next/router'

export const Mensaje = (activo, tipo, funcion, objeto1, objeto2) => {
  const { ctxCamMen } = contexto()
  const { push } = useRouter()

  const respuesta = () => funcion()
  const cancelar = () => ctxCamMen(false, 0, () => (console.log('agrega funcion')))

  if (activo) {
    switch (tipo) {
      case 1:
        return (
            <div className="fixed inset-0 bg-black/50 flex items-end z-[51]">
              <div className="bottom-0 w-full bg-white p-4 rounded-lg flex flex-col gap-5">
                <button onClick={cancelar} className='self-end '>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
                </button>

                <div className="flex justify-center fill-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 24 24"><path d="M16.971 0h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-4.971 19.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm.5-4.25h-1l-1-10h3l-1 10z"/></svg>
                </div>

                <div className='self-center font-bold text-xl'>
                  <p>Hubo un error</p>
                </div>

                <div className="flex flex-col text-lg font-medium gap-3 py-2">
                  <button onClick={() => push('/')} className="rounded-lg border py-1 text-white bg-red-600">
                    ACEPTAR
                  </button>

                  <a href="mailto:qubittos@gmail.com" className="rounded-lg border py-1 text-center text-white bg-gray-500/70" rel="noreferrer">
                    REPORTAR A CORREO
                  </a>
                </div>
              </div>
            </div>
        )

      case 2:
        return (
          <>
            <div className="fixed inset-0 bg-black/50 flex items-end z-50">
              <div className="bottom-0 w-full bg-white p-4 rounded-lg flex flex-col gap-5">
                <div className="flex justify-center fill-red-600">
                  <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
                </div>

                <div className="flex justify-center "> <p className="text-center text-gray-500 ">¿Estás seguro que quieres eliminar {objeto1}?</p></div>

                <div className="flex flex-col text-lg font-medium gap-3 py-2">
                  <button onClick={respuesta} className="rounded-lg border py-1 text-white bg-red-600">Eliminar {objeto2}</button>

                  <button className=" underline underline-offset-1 text-gray-500">Cancelar</button>
                </div>
              </div>
            </div>
          </>
        )

      default:
        break
    }
  }
}
