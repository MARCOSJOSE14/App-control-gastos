import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Cuenta () {
  const [datosCue, setDatosCue] = useState()

  useEffect(() => {
    try {
      const datos = async () => {
        const { data } = await axios.get('/api/cuenta/lista')
        setDatosCue(data)
        console.log(data)
      }
      datos()
    } catch (error) {
      console.log(error)
    } finally {
      console.log('llegue al final')
    }
  }, [])

  if (!datosCue) {
    return (
      <>
        <div className='flex flex-col gap-3 container p-3 '>
          <div className='h-5 bg-gray-200 w-3/4 mx-auto'/>
          <div className='h-8 bg-gray-200 w-3/4 mx-auto'/>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="fixed inset-0 p-3 flex flex-col gap-3">
        <h1>Aquí se mostraran todas las cuentas o billeteras que son el conjuntos de transacciones de un hogar, persona, casa o cualquiera finanza con un nombre personalizado que se decida crear</h1>

        {datosCue.map(({ cueId, cueDes, cueDate }) => (
          <Link key={cueId} href={`/cuenta/${cueId}`}>
            <div className='rounded-lg text-lg font-semibold py-2 border px-3 flex justify-between'>
              <p>{cueDes}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
