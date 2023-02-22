import { contexto } from '@/contexts/Cuenta'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Categoria = ({ abrir, cerrar }) => {
  const { contCat, camCat } = contexto()
  const [datoscat, setDatoscat] = useState()

  useEffect(() => {
    const datacat = async () => {
      const { data } = await axios.get('/api/categoria')
      setDatoscat(data)
      camCat(data[0])
    }

    datacat()

    const retroceder = () => cerrar()

    window.addEventListener('popstate', retroceder)

    return () => {
      window.removeEventListener('popstate', retroceder)
    }
  }, [])

  const mostCat = (categoria) => {
    camCat(categoria)
    cerrar()
  }

  if (!datoscat) return <h1>Cargando</h1>
  return (
<>
  {abrir && (
    <div className={('grid grid-cols-2 fixed inset-0 bg-black/50')}>
      <Link href={'/cuenta/categoria'} onClick={() => { cerrar() }} className='col-span-1'></Link>
      <div className='col-span-1 flex items-end bg-white border-l rounded-lg'>
        <div className=' grid grid-cols-1 overflow-y-scroll w-full'>
          <h1 className='pl-3 fixed w-full border-b pb-3 pt-5 border-black/30 font-bold text-lg'>Lista de Categorias</h1>

          <div className='py-7'></div>

            {datoscat.map((datoscat) => (
                <Link href={'/cuenta/categoria'} onClick={() => mostCat(datoscat)} key={datoscat.catId} className={('flex gap-3 text-left p-3 items-center hover:bg-blue-300 hover:text-gray-500').concat(contCat.catId === datoscat.catId ? ' text-blue-600 font-medium fill-blue-600 ' : '')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                    {datoscat.catDesc}
                </Link>
            ))}

            <Link href={'/cuenta/categoria'} onClick={cerrar} className='text-red-500 flex flex-row-reverse items-center p-3 fill-red-500 gap-1'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"/></svg>
              Cerrar
            </Link>
        </div>
      </div>
    </div>
  )}

</>
  )
}

export default Categoria
