import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Modales = ({ fnAtras, enlace, children }) => {
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
      <div onClick={fnCloseForm} className='fixed inset-0 bg-black/50 z-[39] flex flex-col justify-end'>
        {children}
      </div>
    </>
  )
}

export default Modales
