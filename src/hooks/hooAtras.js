import { useEffect } from 'react'

const hooAtras = (fnAtras) => {
  useEffect(() => {
    window.addEventListener('popstate', fnAtras)

    return () => {
      window.removeEventListener('popstate', fnAtras)
    }
  }, [])
}

export default hooAtras
