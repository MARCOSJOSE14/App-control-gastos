import { contexto } from '@/contexts/Cuenta'
import { hooCat } from '@/hooks/hooCat'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ModFormB = ({ turnModal, camEstCat, data, cat }) => {
  const { ctxCuenta, ctxCamTos, ctxCamMen } = contexto()

  const [dataForm, setDataForm] = useState(data)

  const { push } = useRouter()

  const datos = ({ target: { name, value } }) => {
    setDataForm({
      ...dataForm,
      [name]: value
    })
  }

  const fnFormulario = (event) => {
    event.stopPropagation()
  }

  const fnCloseForm = () => {
    turnModal()
    push(`/cuenta/${ctxCuenta}`)
  }

  const fnBtn = () => {
    if (cat || data.traDes !== dataForm.traDes || data.traMonto !== dataForm.traMonto || data.traDate !== dataForm.traDate) {
      return false
    }
    return true
  }

  const updateTra = (e) => {
    e.preventDefault()
    ctxCamTos(true, 1)
    if (data.tipoForm === 'nuevo') {
      axios.post('/api/cuenta/apiTraNew', dataForm)
        .then(({ data }) => {
          ctxCamTos(data.modo, data.tipo)
        })
        .catch((error) => {
          console.error(error)
          ctxCamMen(true, 1)
        })
        .finally(() => {
          setTimeout(() => {
            ctxCamTos()
          }, 750)
          turnModal()
        })
    } else {
      axios.put('/api/transac/apiTraEdit', dataForm)
        .then(({ data }) => {
          ctxCamTos(data.modo, data.tipo)
        })
        .catch((error) => {
          console.error(error)
          ctxCamMen(true, 1)
        })
        .finally(() => {
          setTimeout(() => {
            ctxCamTos()
          }, 750)
          turnModal()
        })
    }
  }

  const fnDelete = (e) => {
    e.preventDefault()
    ctxCamTos(true, 1)
    axios.delete(`/api/transac/apiTraDelete?id=${dataForm.traId}`)
      .then(({ data }) => {
        ctxCamTos(data.modo, data.tipo)
      })
      .catch((error) => {
        console.error(error)
        ctxCamMen(true, 1)
      })
      .finally(() => {
        setTimeout(() => {
          ctxCamTos()
        }, 750)
        turnModal()
      })
  }

  useEffect(() => {
    setDataForm(data)
    window.addEventListener('popstate', turnModal)

    return () => {
      window.removeEventListener('popstate', turnModal)
    }
  }, [data])

  return (
      <>
      <div onClick={fnCloseForm} className='fixed mx-auto inset-0 flex flex-col justify-end bg-black/50 pb-12 z-40'>
        <div onClick={fnFormulario} className='w-full flex flex-col bg-white  rounded-t-xl p-3 fixed'>
          <button onClick={turnModal} className='self-end px-2 fill-black text-sm flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
          </button>

          <div className='px-5 w-full flex flex-col gap-5 '>
            <div className='flex gap-5 items-center'>
              <label className='text-[#7b93a4] font-medium text-sm'>Categoria:</label>

              {(data.catId === 0)
                ? (
                <button onClick={camEstCat}>Seleccionar Categoria</button>
                  )
                : (
                <>
                  <button onClick={camEstCat} className='flex items-center gap-2'>
                    <div className='flex rounded-full p-2 h-full fill-white' style={{ backgroundColor: data.catColor }}>
                      {hooCat(data.catImg)}
                    </div>

                    <h1>{data.catDes}</h1>

                    <h1 className={(data.tipo === 'ingreso' ? 'text-green-600 uppercase' : 'text-red-600 uppercase')}>{data.tipo}</h1>

                    <svg className='fill-orange-600/70' xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z"/></svg>
                  </button>
                </>
                  )}

            </div>

            <form className='flex flex-col gap-5'>

                <div className='flex flex-col w-full'>
                  <label className='text-[#7b93a4] font-medium text-sm'>
                    Descripción
                  </label>

                  <textarea
                  value={dataForm.traDes}
                  rows={1}
                  className="rounded-lg pl-3 border-b py-1 border-gray-300"
                  required
                  onChange={datos}
                  type="text"
                  name="traDes"
                  placeholder="Ingresa la Descripcion"
                  maxLength="60"/>
                </div>

                <div className='w-full grid grid-cols-5 gap-5'>
                  <div className='col-span-3 flex flex-col'>
                    <label className='text-[#7b93a4] font-medium text-sm'>
                      Fecha
                    </label>

                    <input value={dataForm.traDate} className="rounded-lg pl-3 border-b py-1 border-gray-300" required onChange={datos} type="date" name="traDate" />
                  </div>

                  <div className='col-span-2 flex flex-col'>
                    <label className='text-[#7b93a4] font-medium text-sm'>
                      Monto
                    </label>

                    <input
                    value={dataForm.traMonto}
                    className="rounded-lg pl-3 border-b py-1 border-gray-300"
                    required
                    onChange={datos}
                    type="number"
                    step="0.01"
                    min="0.01"
                    max="999.99"
                    name="traMonto"
                    maxLength="3"
                    placeholder="S/. 00.00" />
                  </div>
                </div>

              <button
              disabled={fnBtn()}
              className={fnBtn() ? 'btnGris' : 'btnVerde'}
              onClick={updateTra}>
                {(data.tipoForm === 'nuevo') ? 'Nueva Transacción' : 'Editar Transacción'}
              </button>

              <button className='btnRed'
              onClick={fnDelete}>
                Eliminar Transacción
              </button>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default ModFormB