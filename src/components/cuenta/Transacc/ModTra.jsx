import { contexto } from '@/contexts/Cuenta'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FormTran from './FormTran'
import ModalCat from './ModalCat'

const ModTra = ({ turnModal, estado, dataModal }) => {
  const [estModCat, setEstModCat] = useState(true)
  const [dataCat, setDataCat] = useState({
    catId: dataModal.catId,
    catImg: dataModal.catImg,
    catDes: dataModal.catDes,
    catColor: dataModal.catColor,
    traTipo: dataModal.traTipo
  })

  const { ctxCuenta } = contexto()

  const { push } = useRouter()

  /* Funciones que controlan al componente actual(ModTra) */
  const fnCloseForm = () => {
    turnModal()
    push(`/cuenta/${ctxCuenta}`)
  }

  /* Funciones que controlan al componente ModalCat */
  const fnTurnModCat = () => {
    setEstModCat(!estModCat)
  }

  const fnCamCatId = (idCat, tipoTra, imgCat, desCat, colorCat) => {
    setDataCat({
      ...dataCat,
      catId: idCat,
      traTipo: tipoTra,
      catImg: imgCat,
      catDes: desCat,
      catColor: colorCat
    })
  }

  /* Funciones que controlan al componente FornmTran */
  const fnEditData = (datos) => {
    setDataCat(
      ...dataCat,
      datos
    )
  }

  useEffect(() => {
    setEstModCat(true)
    window.addEventListener('popstate', fnCloseForm)

    return () => {
      window.removeEventListener('popstate', fnCloseForm)
    }
  }, [])

  return (
    <>
      {estado && (
        <div onClick={fnCloseForm} className='fixed mx-auto inset-0 flex flex-col justify-end bg-black/50 pb-12 z-40'>
          <FormTran turnModal={fnCloseForm } camEstCat={fnTurnModCat} firstData={dataModal} dataCat={dataCat} editData={fnEditData}/>
          <ModalCat turnModal={fnTurnModCat} estado={estModCat} camCatId={fnCamCatId} traTipo={dataModal.traTipo}/>
        </div>
      )}
    </>
  )
}

export default ModTra
