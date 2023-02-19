import axios from 'axios'
import { useState } from 'react'
import Datagrid from './Datagrid'

export default function Form () {
  const [count, setCount] = useState(true)

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
    setCount(!count)
    e.preventDefault()
    await axios.post('api/nuevo', formulario)
  }

  return (
<>
  <div className='flex justify-center '>
    <form onSubmit={nuevo} className="shadow border border-black bg-white rounded-xl my-5 flex flex-col gap-5 justify-center p-5 text-xl items-start lg:flex-row  ">
        <label>Fecha</label>
        <input className="rounded-lg pl-3 border border-black" required onChange={datos} type="date" name="fecha" />

        <label>Descripción</label>
        <textarea className="rounded-lg pl-3 border border-black " required onChange={datos} type="text" name="descri" placeholder="Ingresa la Descripcion" />

        <label>Monto</label>
        <input className="rounded-lg pl-3 border border-black" required onChange={datos} type="number" step="0.01" min="0" max="9999.99"name="monto" placeholder="Monto"/>

        <button className='bg-black text-white font-semibold text-lg px-5  py-2 rounded-lg hover:font-bold hover:bg-white hover:text-black'>Ingresar Gasto</button>
    </form>
  </div>

  <Datagrid actuli={count}/>
</>
  )
}
