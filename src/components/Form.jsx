import axios from 'axios'
import { useEffect, useState } from 'react'
import Datagrid from './Datagrid'

export default function Form ({ catId }) {
  const [count, setCount] = useState(true)

  const [formulario, setFormulario] = useState({
    fecha: '',
    descri: '',
    monto: ''
  })
  useEffect(() => {
    setFormulario({
      ...formulario,
      catId
    })
  }, [catId])

  const datos = ({ target: { name, value } }) => {
    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  const nuevo = async (e) => {
    e.preventDefault()
    setCount(!count)
    await axios.post('api/nuevo', formulario)
  }

  return (
<>

  <div className='flex justify-center lg:pt-14'>
    <form onSubmit={nuevo} className="shadow border border-black bg-white rounded-xl my-5 flex flex-col gap-5 justify-center p-5 text-xl items-start lg:flex-row  ">
        <div className='flex flex-col '>
        <label className='font-medium'>Fecha</label>
        <input className="rounded-lg pl-3 border border-black" required onChange={datos} type="date" name="fecha" />
        </div>

        <div className='flex flex-col '>
        <label className='font-medium'>Descripción</label>
        <textarea className="rounded-lg pl-3 border border-black " required onChange={datos} type="text" name="descri" placeholder="Ingresa la Descripcion" />
        </div>

        <div className='flex flex-col '>
        <label className='font-medium'>Monto</label>
        <input className="rounded-lg pl-3 border border-black" required onChange={datos} type="number" step="0.01" min="0" max="9999.99"name="monto" placeholder="S/. 00.00"/>
        </div>

        <button className='bg-blue-800 text-white font-semibold text-lg px-5  py-2 rounded-lg hover:font-semibold hover:bg-blue-900 hover:text-gray-100'>Ingresar Gasto</button>
    </form>
  </div>

  <Datagrid actuli={count}
  catId={catId}/>
</>
  )
}
