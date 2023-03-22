import { contexto } from '@/contexts/Cuenta'
import { isoDate, pen } from '@/hooks/Fecha'
import { hooApi } from '@/hooks/hooApi'
import { hooCat } from '@/hooks/hooCat'
import Toast from '@/hooks/Toast'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import DescargaPDF from './Descarga/DescargaPDF'
import ModalTraDetalle from './ModalTraDetalle'
import ModFormA from './formulario/ModFormA'

const Datagrid = ({ numero, ffecha, esTraTipo }) => {
  const { ctxTostada } = contexto()

  const { push } = useRouter()

  const [dataDetalle, setDataDetalle] = useState()
  const [modalEstado, setModalEstado] = useState(false)
  const [abrir, setAbrir] = useState(false)
  const [esDescarga, setEsDescarga] = useState(false)

  const dataModal = {
    traDes: '',
    tipo: esTraTipo,
    traMonto: '',
    traDate: (isoDate(ffecha.i) === isoDate(ffecha.f) ? isoDate(ffecha.i) : ''),
    catId: 0,
    catImg: 0,
    catDes: '',
    catColor: '',
    cueId: numero,
    traId: 0,
    tipoForm: 'nuevo'
  }

  const fnCerrarModal = (ID, ffechai, ffechaf) => {
    setDataDetalle({
      id: ID,
      fechaI: ffechai,
      fechaF: ffechaf
    })
    setModalEstado(!modalEstado)
  }

  const fnTurn = () => {
    setAbrir(false)
  }

  const fnOpenModal = () => {
    setAbrir(true)
    push('#newTra')
  }

  const fnEsPDF = () => {
    setEsDescarga(true)
    push('#descarga')
  }

  const dataA = hooApi(`cuenta/${numero}/apiDatos/?fechai=${isoDate(ffecha.i)}&fechaf=${isoDate(ffecha.f)}`, '', 'GET', [ffecha.i, ffecha.f, ctxTostada])

  if (!dataA) return Toast(true, 1)

  return (
    <>
      {abrir && <ModFormA turnModal={fnTurn} dataModal ={dataModal}/>}

      <div className='container mx-auto fixed bottom-0 w-full px-10 z-30 mb-12 py-2 bg-gray-200'>
        <button onClick={fnOpenModal} className='btnVerde px-5'>Agregar Transacción</button>
      </div>

      <button onClick={fnEsPDF} className='fixed top-0 right-0 p-2 z-30'>
        <svg className='fill-blue-800' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 13h4v-7h4v7h4l-6 6-6-6zm16-1c0 5.514-4.486 10-10 10s-10-4.486-10-10 4.486-10 10-10 10 4.486 10 10zm2 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z"/></svg>
      </button>

      {esDescarga && (<DescargaPDF cuenta={numero} fecha={ffecha} camEstado={() => setEsDescarga(false)}/>)}

      {(modalEstado) && <ModalTraDetalle closeModal = {fnCerrarModal} data = {dataDetalle} />}
      <div className='container flex justify-center text-2xl fixed z-30 mx-auto w-full py-1 font-bold bg-gray-200'>
        <h1 className='bg-white w-full mx-2 text-center rounded py-1'>{pen(dataA.totales[esTraTipo])}</h1>
      </div>

      <div className='pb-16 mt-12'>
        <div className='flex flex-col gap-2'>
          {(!dataA[esTraTipo])
            ? <p className='flex justify-center'>No hay {esTraTipo}s </p>
            : dataA[esTraTipo].map(({ ID, Categoria, catColor, catImg, Total, Porcentaje }) => (
              <Link
              href={'#detalle'}
              onClick={() => fnCerrarModal(ID, isoDate(ffecha.i), isoDate(ffecha.f))}
              key={ID}
              className='bg-white rounded-lg mx-2 border px-3 py-2 grid grid-cols-7 gap-2 '>
                <div className='flex gap-2 col-span-4 items-center grow '>
                  <div className='flex rounded-full p-2 h-full fill-white ' style={{ backgroundColor: catColor }}>
                    {hooCat(catImg)}
                  </div>
                  <h1>{Categoria}</h1>
                </div>
                <div className='col-span-3 grid grid-cols-2 gap-1 items-center text-right '>
                  <h1 className='text-gray-600'>{(Number(Porcentaje)).toFixed(0)}%</h1>
                  <h1>{Total}</h1>
                </div>
              </Link>
            ))
            }
        </div>
      </div>
    </>
  )
}

export default Datagrid
