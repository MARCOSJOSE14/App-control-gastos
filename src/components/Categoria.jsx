import axios from 'axios'
import { useEffect, useState } from 'react'
import Form from './Form'

const Categoria = () => {
  const [numCat, setNumCat] = useState(1)
  const [datoscat, setDatoscat] = useState()

  const mostCat = (catId) => {
    setNumCat(catId)
  }

  useEffect(() => {
    const datacat = async () => {
      const { data } = await axios.get('api/categoria')
      setDatoscat(data)
    }
    datacat()
  }, [])

  if (!datoscat) return <h1>Caragando</h1>
  return (
<>
    <div className=''>
        <div className='flex justify-center container bg-blue-800 text-lg text-white fixed max-[1023px]:bottom-0 lg:top-0'>
            <div className='grid grid-cols-3 justify-items-center '>
                {datoscat.map(({ catId, catDesc }) => (
                    <button onClick={() => mostCat(catId)} id={catId} key={catId} className={numCat === catId ? 'bg-white text-blue-800 p-3' : 'p-3'}>
                        {catDesc}
                    </button>
                ))}
            </div>
        </div>
        <div className='mb-20 lg:mt'>
        <Form
        catId={numCat}/>
        </div>
    </div>
</>
  )
}

export default Categoria
