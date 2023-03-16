import { contexto } from '@/contexts/Cuenta'
import { isoDate, pen } from '@/hooks/Fecha'
import { diario } from '@/hooks/Filtro'
import { hooCat } from '@/hooks/hooCat'
import Toast from '@/hooks/Toast'
import { PDFDownloadLink } from '@react-pdf/renderer'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Exportar from './Exportar'
import ModalTraDetalle from './ModalTraDetalle'

const Datagrid = ({ numero, ffecha, esTraTipo }) => {
  const { ctxTostada, ctxCuenta } = contexto()

  const { push } = useRouter()

  const [datainfo, setDatainfo] = useState()
  const [datosModal, setDatosModal] = useState()
  const [modalEstado, setModalEstado] = useState(false)

  const fnModal = (catDes, sumCat, traDate, catImg, catColor, catId) => {
    setDatosModal({ catDes, sumCat, traDate, catImg, catColor, catId })
    setModalEstado(true)
  }

  const fnCerrarModal = () => {
    setModalEstado(false)
    push(`/cuenta/${ctxCuenta}`)
  }

  const fnActuDatos = () => {
    return (diario(isoDate(ffecha.i), isoDate(ffecha.f), datainfo))
  }

  useEffect(() => {
    axios.get(`/api/cuenta/${numero}/datos`)
      .then(({ data }) => {
        setDatainfo(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [ctxTostada])

  if (!datainfo) return Toast(true, 1)

  return (
    <>
      <PDFDownloadLink document={<Exportar fecha={ffecha} data={fnActuDatos()} />} fileName='Transacciones.pdf'>
        <button className='fixed top-0 right-0 p-3 z-30'>
          <svg className='fill-blue-800' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 13h4v-7h4v7h4l-6 6-6-6zm16-1c0 5.514-4.486 10-10 10s-10-4.486-10-10 4.486-10 10-10 10 4.486 10 10zm2 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z"/></svg>
        </button>
      </PDFDownloadLink>
      <ModalTraDetalle estado = {modalEstado} closeModal = {fnCerrarModal} datos = {datosModal} />
      <div className='pb-16 '>

        {(datainfo.length === 0
          ? (
            <p className='italic flex justify-center text-lg text-gray-500/70 font-semibold'>
              Hey!, Agrega tu primera Transacción
            </p>
            )
          : (
              <div className='flex flex-col gap-2'>
                {(!(fnActuDatos().resultado[esTraTipo]))
                  ? <p className='flex justify-center'>No hay {esTraTipo}s </p>
                  : fnActuDatos().resultado[esTraTipo].map(({ catDes, sumCat, traDate, catImg, catColor, catId }, index) => (
                  <Link href={'#detalle'} onClick={() => fnModal(catDes, sumCat, traDate, catImg, catColor, catId, traDate)}
                  key={index}
                  className='bg-white rounded-lg mx-2 border px-3 py-2 grid grid-cols-7 gap-2 '>
                    <div className='flex gap-2 col-span-4 items-center grow'>
                      <div className='flex rounded-full p-2 h-full fill-white ' style={{ backgroundColor: catColor }}>
                        {hooCat(catImg)}
                      </div>
                      <h1 className=''>{catDes}</h1>
                    </div>
                    <div className='col-span-3 grid grid-cols-2 gap-2 items-center'>
                      <h1 className='col-span-1 text-right'>{((sumCat / fnActuDatos().total[esTraTipo]) * 100).toFixed(0) } %</h1>
                      <h1 className='col-span-1 text-right'>{pen(sumCat) }</h1>
                    </div>
                  </Link>
                  )
                  )}
              </div>
            )
              )}
      </div>
    </>
  )
}

export default Datagrid
