import { apiSure } from '@/hooks/apiSure'
import Toast from '@/hooks/Toast'

const Titulo = ({ numero }) => {
  const datainfo = apiSure(`cuenta/titulo/?id=${numero}`)

  if (!datainfo) return Toast(true, 1)
  return (
    <>
    <h1 className='container mx-auto z-10 fixed w-full flex top-0 justify-center py-2 border-b text-2xl font-bold self-center bg-white print:hidden'>
      {datainfo.cueDes}
    </h1>

    </>
  )
}

export default Titulo
