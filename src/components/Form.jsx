import { contexto } from '@/contexts/Cuenta'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Form ({ abrir, cerrar }) {
  const { push } = useRouter()

  const { contCat, camNue } = contexto()

  const [formulario, setFormulario] = useState({
    fecha: '',
    descri: '',
    monto: ''
  })

  const datos = ({ target: { name, value } }) => {
    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  const nuevo = async (e) => {
    e.preventDefault()
    await axios.post('/api/nuevo', formulario)
    cerrar()
    camNue()
    push('/cuenta/categoria')
  }

  const tipoNuevo = (e) => {
    e.preventDefault()
    console.log(e.target.id)
    setFormulario({
      ...formulario,
      tipo: parseInt(e.target.id)
    })
  }

  useEffect(() => {
    setFormulario({
      ...formulario,
      catId: contCat.catId,
      tipo: 2
    })

    const retroceder = () => {
      cerrar()
    }

    window.addEventListener('popstate', retroceder)

    return () => {
      window.removeEventListener('popstate', retroceder)
    }
  }, [contCat])

  return (
<>
  {abrir && (
    <>
  <div className='fixed inset-0 flex flex-col bg-black/50'>
    <Link href={'/cuenta/categoria'} onClick={cerrar} className='grow'/>
    <div className=' self-end w-full flex flex-col bg-white  rounded-t-xl p-3 '>
    <Link href={'/cuenta/categoria'} onClick={cerrar} className='self-end px-2 fill-black text-sm flex items-center gap-2'>
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
    </Link>
    <form onSubmit={nuevo} className="px-5 w-full flex flex-col gap-5 justify-center py-2 text-xl items-start self-center lg:flex-row  ">

        <div className='grid grid-cols-2 w-full'>
          <p className='col-span-2 text-center text-blue-800 border-b-2 py-1 w-full text-xl font-semibold'>
            Añadir Nuevo a {contCat.catDesc}
          </p>

          <button onClick={tipoNuevo} id={2} className={formulario.tipo === 2 ? 'font-semibold text-red-600' : 'text-gray-500' }>Gasto</button>

          <button onClick={tipoNuevo} id={1} className={formulario.tipo === 1 ? 'font-semibold text-green-600' : 'text-gray-500' }>Ingreso</button>
        </div>

        <div className='flex flex-col w-full'>
        <label className='font-medium'>Descripción</label>
        <textarea rows={1} className="rounded-lg pl-3 border border-black " required onChange={datos} type="text" name="descri" placeholder="Ingresa la Descripcion" maxLength="30"/>
        </div>

        <div className='w-full grid grid-cols-5 gap-5'>
          <div className='col-span-3 flex flex-col'>
          <label className='font-medium'>Fecha</label>
          <input className="rounded-lg pl-3 border border-black" required onChange={datos} type="date" name="fecha" />
          </div>

          <div className='col-span-2 flex flex-col'>
          <label className='font-medium'>Monto</label>
          <input className="rounded-lg pl-3 border border-black" required onChange={datos} type="number" step="0.01" min="0.01" max="999.99" name="monto" maxLength="3" placeholder="S/. 00.00" />
          </div>
        </div>

        <button className='self-center bg-blue-800 text-white font-semibold text-lg px-5  py-2 rounded-lg hover:font-semibold hover:bg-blue-900 hover:text-gray-100'> Ingresar Gasto</button>
    </form>
    </div>
  </div>
  </>
  )}
</>
  )
}
