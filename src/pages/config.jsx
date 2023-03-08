import Nav from '@/components/plantiila/Nav'
import Layout from '@/components/plantiila/Layout'
import Image from 'next/image'
import TituloNav from '@/components/plantiila/TituloNav'
import Uusario from '@/components/ajustes/Usuario'

const config = () => {
  return (
    <>
    <div className='container mx-auto'>
        <TituloNav>
          Ajustes
        </TituloNav>
        <Uusario/>
          <div className='px-3'>
            <h1 className='text-lg font-semibold my-3'>Categorias</h1>

            <div className='flex flex-col'>
              <div className='bg-white'>
                {/* Etiqueta guia para hacer el map de la lista de categorias - INICIO */}
                <div className='flex justify-between'>
                  <div className='flex gap-3 items-center'>
                      <Image
                        className='rounded-full bg-orange-500'
                        src="https://api.spendee.com/categories/cat_27.svg"
                        alt="icono"
                        width={34}
                        height={34}
                      />

                    <p>
                      Nombre de la caetgoria
                    </p>
                  </div>

                    <svg className='fill-green-600' height='30' width='30' clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" fillRule="nonzero"/></svg>
                </div>

                {/* Etiqueta guia para hacer el map de la lista de categorias - FIN */}
              </div>
              <button className='rounded-md border my-1 py-1 text-white bg-green-600 font-medium'>Crear Nueva Categoria</button>
            </div>
          </div>

          <div className='px-3'>
            <h1 className='text-lg font-semibold my-3'>Soporte, Terminos y Politicas ...</h1>
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
