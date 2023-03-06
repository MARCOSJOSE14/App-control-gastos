import Nav from '@/components/plantiila/Nav'
import Layout from '@/components/plantiila/Layout'
import Image from 'next/image'
import { useState } from 'react'

const config = () => {
  /* Aqui se deberia definir una constante con los datos del usuario actual de la cookie,
  y en caso edite comparar el estado actual con la cosntante,
  para que se ejecute el api en caso haya cambios
  */
  const datosUsuA = {
    nombre: 'JOSE LUIS',
    apellido: 'MARCOS RAMOS',
    email: 'joseluismarcosramos14@gmail.com'
  }

  const [esDatosUsu, setEsDatosUsu] = useState(datosUsuA)

  const newDatosUsu = (e) => {
    setEsDatosUsu({
      ...esDatosUsu,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
    <div className='container mx-auto'>
        <h1 className='text-xl font-bold flex justify-center'>Aqui estaran las configuraciones</h1>
        <div className='px-3'>
          <h1 className='text-lg font-semibold my-3'>Cuenta</h1>

          <div>
            <form action="" className='flex flex-col gap-3'>
              <input type="file" accept='image/*' src="/public/favicon.ico" alt="imagen" max="2048"/>

              <div className='flex flex-col '>
                <label className='text-gray-500'>
                  Nombre
                </label>

                <input
                  onChange={newDatosUsu}
                  name='nombre'
                  value={esDatosUsu.nombre}
                  className='bg-white rounded-md border pl-2 py-2 border-black/60'
                  type="text"
                />
              </div>

              <div className='flex flex-col '>
                <label className='text-gray-500'>
                  Apellido
                </label>

                <input
                  onChange={newDatosUsu}
                  name='apellido'
                  value={esDatosUsu.apellido}
                  className='bg-white rounded-md border pl-2 py-2 border-black/60'
                  type="text"
                />
              </div>

              <div className='flex flex-col '>
                <label className='text-gray-500'>
                  Email
                </label>

                <input
                  onChange={newDatosUsu}
                  name='email'
                  value={esDatosUsu.email}
                  className='bg-white rounded-md border pl-2 py-2 border-black/60'
                  type="text"
                />
              </div>

              <button className='rounded-md border my-1 py-1 text-white bg-green-600 font-medium'>Actualizar datos</button>

            </form>
          </div>
          </div>

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
