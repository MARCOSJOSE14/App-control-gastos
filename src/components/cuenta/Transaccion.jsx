import { contexto } from '@/contexts/Cuenta'
import axios from 'axios'

const Transaccion = () => {
  const eliminar = async (idDetalle) => {
    const { camCar } = contexto()

    camCar([true, 1])
    try {
      await axios.delete(`/api/cuenta/${idDetalle}/eliminar`)
      camCar([true, 2])
    } catch (error) {
      camCar([true, 3])
    } finally {
      setTimeout(() => { camCar([false, 0]) }, 700)
    }
  }
  return (
    <>
      <h1>esta es Transaccion</h1>
    </>
  )
}

export default Transaccion
