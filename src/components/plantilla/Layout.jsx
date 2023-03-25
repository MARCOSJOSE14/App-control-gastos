import { contexto } from '@/contexts/Cuenta'
import { Mensaje } from '@/hooks/Mensaje'
import Toast from '@/hooks/Toast'

const Layout = ({ children }) => {
  const { ctxTostada, ctxMensaje } = contexto()

  return (
    <>
      {Mensaje(ctxMensaje.a, ctxMensaje.b, ctxMensaje.c)}
      {Toast(ctxTostada.a, ctxTostada.b, ctxTostada.c)}
      {children}
    </>
  )
}

export default Layout
