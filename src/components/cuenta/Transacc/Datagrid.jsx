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

  const fnModal = (catDes, sumCat, traDate, catImg, catColor) => {
    setModalEstado(true)
    setDatosModal({ catDes, sumCat, traDate, catImg, catColor })
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
        <button className='fixed top-0 z-50 right-0 mt-2 mr-2'>Descargar</button>
      </PDFDownloadLink>
      <ModalTraDetalle estado = {modalEstado} closeModal = {fnCerrarModal} datos = {datosModal} />
      <div className='mt-52 pt-6 overflow-y-auto h-full bg-gr'>

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
                  : fnActuDatos().resultado[esTraTipo].map(({ catDes, sumCat, traDate, catImg, catColor }, index) => (
                  <Link href={'#detalle'} onClick={() => fnModal(catDes, sumCat, traDate, catImg, catColor)} key={index} className='bg-white rounded-lg mx-5 border px-3 py-2 flex items-center'>
                    <div className='flex gap-2 grow items-center'>
                      <div className='flex rounded-full p-2 h-full fill-white ' style={{ backgroundColor: catColor }}>
                        {hooCat(catImg)}
                      </div>
                      <h1 className=''>{catDes}</h1>
                    </div>
                    <div className='flex gap-5'>
                      <h1>{((sumCat / fnActuDatos().total[esTraTipo]) * 100).toFixed(2) } %</h1>
                      <h1>{pen(sumCat) }</h1>
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
