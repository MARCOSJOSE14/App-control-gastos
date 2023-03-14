import { contexto } from '@/contexts/Cuenta'
import { iconos } from '@/hooks/hooCat'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const CatUpdate = ({ cerrarModal, esModal, dataModa }) => {
  const colores = ['#D6CF30', '#2D74B6', '#D03434', '#6629B4', '#54A82D', '#C539B7', '#EC9006']
  const { ctxCamTos, ctxCamMen } = contexto()

  const [esDataCat, setEsDataCat] = useState(dataModa)

  const nuevaCat = (e) => {
    e.preventDefault()
    ctxCamTos(true, 1)
    if (dataModa.nombre === '') {
      axios.post('/api/cuenta/apiCatNew', esDataCat)
        .then(({ data }) => {
          ctxCamTos(data.modo, data.tipo)
        })
        .catch((error) => {
          ctxCamMen(true, 1)
          console.error(error)
        })
        .finally(() => {
          ctxCamTos()
          cerrarModal()
        })
    } else {
      axios.put('/api/categoria/apiCatEdit', esDataCat)
        .then(({ data }) => {
          ctxCamTos(data.modo, data.tipo)
        })
        .catch((error) => {
          ctxCamMen(true, 1)
          console.error(error)
        })
        .finally(() => {
          ctxCamTos()
          cerrarModal()
        })
    }
  }

  const fnDatosCat = ({ target: { name, value } }) => {
    setEsDataCat({
      ...esDataCat,
      [name]: value
    })
  }

  const btnEstado = () => ((esDataCat.nombre === '' || esDataCat.icono === 0 || esDataCat.color === '') || (esDataCat.nombre === dataModa.nombre && esDataCat.icono === dataModa.icono && esDataCat.color === dataModa.color))

  useEffect(() => {
    setEsDataCat(dataModa)

    const retroceder = () => {
      cerrarModal()
    }

    window.addEventListener('popstate', retroceder)

    return () => {
      window.removeEventListener('popstate', retroceder)
    }
  }, [esModal])

  return (
    <>
    {esModal && (
    <div className='fixed inset-0 flex flex-col bg-black/50 z-40'>
    <Link href='/config' onClick={cerrarModal} className='grow'/>
      <div className='bg-white mb-10 pb-10 rounded-xl flex flex-col px-3 py-3'>
        <Link href='/config' onClick={cerrarModal} className='self-end px-2 fill-black text-sm flex items-center gap-2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
        </Link>

        <h1 className='text-center font-semibold text-lg text-blue-800 my-3'>{(dataModa.nombre === '') ? ('Nueva') : ('Editar')} Categoria</h1>

        <form onSubmit={nuevaCat} className='flex flex-col px-5 gap-4'>

          <input type="text" name='nombre' placeholder='Nombre de la Categoria' className='border-b px-2 py-1' value={esDataCat.nombre} onChange={fnDatosCat}/>

          <div className='flex justify-evenly gap-3'>
            <label htmlFor='rdbgastos' className='flex gap-2 items-center'>
              Gastos <input type="radio" name="tipo" id="rdbgastos" value='gasto' onChange={fnDatosCat} checked={esDataCat.tipo === 'gasto'}/>
            </label>

            <label htmlFor='rdbingresos' className='flex gap-2 items-center'>
              Ingresos <input type="radio" name="tipo" id="rdbingresos" value='ingreso' onChange={fnDatosCat} checked={esDataCat.tipo === 'ingreso'}/>
            </label>
          </div>

          <div>
            <label className='text-[#7b93a4] font-medium text-sm'>
              Icono
            </label>
            <div className='flex gap-2 flex-wrap my-2 '>
              {iconos.map(({ imgId, imgValor }) => (
                <label
                className={'flex rounded-full p-2 m-1 h-full  bg-gray-400 '}
                style={{ fill: (Number(esDataCat.icono) === imgId ? '#fff' : '#000'), backgroundColor: (Number(esDataCat.icono) === imgId && esDataCat.color) }}
                htmlFor={imgId}
                key={imgId}>
                  {imgValor}
                  <input type="radio" id={imgId} name='icono' value={imgId} checked={esDataCat.icono === imgId} onChange={fnDatosCat} className="hidden"/>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className='text-[#7b93a4] font-medium text-sm'>Colores</label>
            <div className="flex items-center my-2 flex-wrap">
              {colores.map((colores) => (
                <label htmlFor={colores} className="m-1" key={colores}>
                  <div className="w-9 h-9 rounded-full  flex justify-center items-center fill-white" style={{ backgroundColor: colores }}>
                    {(esDataCat.color === colores) && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/></svg>)}
                  </div>
                  <input type="radio" name="color" id={colores} value={colores} className="hidden" checked={esDataCat.color === colores} onChange={fnDatosCat}/>
                </label>
              ))}
            </div>
          </div>

          <button
          disabled={btnEstado()}
          className={btnEstado() ? ' btnGris ' : ' btnVerde'}>
            {(dataModa.nombre === '') ? ('Crear Categoria') : ('Guardar Cambios')}
          </button>
        </form>
      </div>
    </div>
    )}
    </>
  )
}

export default CatUpdate
