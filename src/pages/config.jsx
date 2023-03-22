import Nav from '@/components/plantiila/Nav'
import Layout from '@/components/plantiila/Layout'
import TituloNav from '@/components/plantiila/TituloNav'
import Usuario from '@/components/ajustes/Usuario'
import axios from 'axios'
import { useRouter } from 'next/router'
import Categorias from '@/components/ajustes/Categorias'

const config = () => {
  const { reload } = useRouter()
  const cerrando = () => {
    axios.post('/api/logout')
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        reload()
      })
  }

  return (
    <>
    <div className='container mx-auto'>
        <TituloNav>
          Ajustes
        </TituloNav>
        <Usuario/>
        <Categorias/>

          <div className='text-red-600 fill-red-600 flex justify-center my-2 py-2'>
            <button onClick={cerrando} className='gap-3 flex'>
              Cerrar Sesión
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 2v2h12v16h-12v2h14v-20h-14zm0 7.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7z"/></svg>
              </button>
          </div>
    </div>
    </>
  )
}

export default config

config.getLayout = function getLayout (page) {
  return (
    <Layout>
      <Nav>
        {page}
      </Nav>
    </Layout>

  )
}
