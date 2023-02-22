import axios from 'axios'
import { useEffect, useState } from 'react'

const Lista = () => {
  const [datoscue, setDatoscue] = useState()
  useEffect(() => {
    const datacue = async () => {
      const { data } = await axios.get('api/cuenta/lista')
      setDatoscue(data)
    }
    datacue()
  }, [])

  if (!datoscue) return <h1>Cargando</h1>
  return (
        <>
          <div className='container mx-auto flex flex-col justify-center items-center'>
            <h1 className='my-5 text-xl font-bold'>Lista de Gastos</h1>
            <ul>
            {
            datoscue.map(({ gasId, gasDes, gasFecha }) => (
              <div key={gasId}>
              <li>{gasDes}</li>
              <li>{gasFecha}</li>
              </div>
            ))
            }
            </ul>
          </div>
        </>
  )
}

export default Lista
