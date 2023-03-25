import Modales from '@/components/plantilla/Modales'
import { isoDate, shortDate } from '@/hooks/Fecha'
import { hooApi } from '@/hooks/hooApi'
import Toast from '@/hooks/Toast'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useRouter } from 'next/router'
import Exportar from './Exportar'

const DescargaPDF = ({ cuenta, fecha, camEstado }) => {
  const { push } = useRouter()

  const inicioI = shortDate(fecha.i)
  const inicioF = shortDate(fecha.f)

  const fnCloseModal = () => {
    camEstado()
    push(`/cuenta/${cuenta}`)
  }

  const dataD = hooApi(`cuenta/${cuenta}/apiPDF/?fechai=${isoDate(fecha.i)}&fechaf=${isoDate(fecha.f)}`)
  const saldo = hooApi(`cuenta/${cuenta}/apiSaldo?fecha=${isoDate(fecha.i)}`)

  if (!dataD || saldo === undefined) return Toast(true, 1)

  return (
    <>
      <Modales fnAtras={camEstado} enlace={`/cuenta/${cuenta}`}>
        <div className='flex flex-col gap-5'>
          <h1 className='text-center  font-semibold text-lg'>Vas a descargar el PDF fecha</h1>
          <div className='text-center flex justify-center fill-blue-800'>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-18 1h4v-7h4v7h4l-6 6-6-6z"/></svg>
          </div>

          <div className='flex justify-evenly gap-4'>
            <button className='px-3.5 rounded-md border  py-1 bg-gray-200 text-slate-500 font-semibold flex justify-center' onClick={fnCloseModal}>Cancelar</button>
            <PDFDownloadLink document={<Exportar fecha={fecha} data={dataD} saldo={saldo} />} fileName={`Reporte del ${inicioI} al ${inicioF}.pdf`}>
              <button className='py-1 px-3.5 btnVerde'>Descargar</button>
            </PDFDownloadLink>
          </div>
        </div>
      </Modales>
    </>
  )
}

export default DescargaPDF
