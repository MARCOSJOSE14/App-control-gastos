import TituloNav from '@/components/plantiila/TituloNav'
import { contexto } from '@/contexts/Cuenta'
import { apiSure } from '@/hooks/apiSure'
import { pen } from '@/hooks/Fecha'
import { hooApi } from '@/hooks/hooApi'
import Toast from '@/hooks/Toast'

const Titulo = ({ numero }) => {
  const { ctxTostada } = contexto()

  const datainfo = apiSure(`cuenta/titulo/?id=${numero}`)
  const saldo = hooApi(`cuenta/${numero}/apiSaldoActual`, '', 'GET', [ctxTostada])

  if (!datainfo || saldo === undefined) return Toast(true, 1)
  return (
    <>
    <TituloNav>
      <div className='flex justify-evenly w-full'>
        <p className='font-normal'>
          {datainfo.cueDes}
        </p>

        <p>
          {pen(saldo)}
        </p>
      </div>
    </TituloNav>

    </>
  )
}

export default Titulo
