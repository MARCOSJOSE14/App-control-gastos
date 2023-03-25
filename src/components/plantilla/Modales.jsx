import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Modales = ({ fnAtras, enlace, z = 41, children }) => {
  const { push } = useRouter()

  const fnCloseForm = () => {
    fnAtras()
    push(enlace)
  }

  useEffect(() => {
    window.addEventListener('popstate', fnAtras)

    return () => {
      window.removeEventListener('popstate', fnAtras)
    }
  }, [])

  return (
    <>
      <div onClick={fnCloseForm} className='fixed inset-0 bg-black/50 flex flex-col justify-end' style={{ zIndex: z }}>
        <div onClick={(e) => e.stopPropagation()} className=' bg-white w-full pb-16 overflow-y-scroll'>
          <button onClick={fnCloseForm} className=' flex justify-end w-full p-3 sticky top-0 z-50' >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
          </button>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modales
