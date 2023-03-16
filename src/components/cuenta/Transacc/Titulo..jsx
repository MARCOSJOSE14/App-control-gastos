import TituloNav from '@/components/plantiila/TituloNav'
import { apiSure } from '@/hooks/apiSure'
import Toast from '@/hooks/Toast'

const Titulo = ({ numero }) => {
  const datainfo = apiSure(`cuenta/titulo/?id=${numero}`)

  if (!datainfo) return Toast(true, 1)
  return (
    <>
    <TituloNav>
      {datainfo.cueDes}
    </TituloNav>

    </>
  )
}

export default Titulo
