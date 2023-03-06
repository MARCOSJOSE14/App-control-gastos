import Layout from '@/components/plantiila/Layout'
import Nav from '@/components/plantiila/Nav'
import { contexto } from '@/contexts/Cuenta'
import { apiSure } from '@/hooks/apiSure'
import { useRouter } from 'next/router'

export default function cuenta () {
  const { push } = useRouter()

  const { ctxCamCue } = contexto()

  const datosCue = apiSure('cuenta/lista')

  const enviocuenta = (cueId) => {
    ctxCamCue(cueId)
    push(`/cuenta/${cueId}`)
  }

  return (
    <>
      <h1 className='container mx-auto z-10 fixed w-full flex top-0 justify-center py-2 border-b text-2xl font-bold self-center'>
        Cuentas
      </h1>

      <div className='container mx-auto'>
        <div className="p-3 mt-10">

          {(!datosCue)
            ? (
              <div className='flex flex-col gap-3 p-3 '>
              <div className='h-5 bg-gray-200 w-3/4 mx-auto'/>
              <div className='h-8 bg-gray-200 w-3/4 mx-auto'/>
            </div>
              )
            : (datosCue.length === 0)
                ? (
              <p className='italic flex justify-center text-lg text-gray-500/70 font-semibold'>
                Hey!, Agrega una cuenta Bro
              </p>
                  )
                : (datosCue.map(({ cueId, cueDes, cueDate }) => (
            <button onClick={() => enviocuenta(cueId)} key={cueId}>
              <div className='rounded-lg text-lg font-semibold py-2 border px-3 flex justify-between'>
                <p>{cueDes}</p>
              </div>
            </button>
                  )))}

        </div>
        <div className='container mx-auto fixed bottom-0 w-full px-10 z-30'>
          <button className=' mb-20 w-full py-1 flex justify-center rounded-md border my-1 text-white bg-green-600 font-medium'>
            Agregar Nueva Cuenta
          </button>
        </div>
      </div>
    </>
  )
}

cuenta.getLayout = function getLayout (page) {
  return (
    <Layout>
      <Nav>
        {page}
      </Nav>
    </Layout>
  )
}
