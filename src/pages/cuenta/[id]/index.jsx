import Filtro from '@/components/cuenta/Transacc/Filtro'
import ModTra from '@/components/cuenta/Transacc/ModTra'
import Titulo from '@/components/cuenta/Transacc/Titulo.'
import Layout from '@/components/plantiila/Layout'
import Nav from '@/components/plantiila/Nav'
import { contexto } from '@/contexts/Cuenta'
import Toast from '@/hooks/Toast'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function id () {
  const { id } = useRouter().query

  const { ctxUsuario, ctxCamMen } = contexto()

  const [esCuentas, setEsCuentas] = useState()
  const [abrir, setAbrir] = useState(false)

  const { push } = useRouter()

  const dataModal = { traDes: '', traTipo: 'gasto', traMonto: '', traDate: '', catId: 0, catImg: 1, catDes: '', catColor: '' }

  const fnTurn = () => {
    setAbrir(false)
  }

  const fnOpenModal = () => {
    setAbrir(true)
    push('#newTra')
  }

  useEffect(() => {
    axios.get(`/api/cuenta/lista/?usuId=${ctxUsuario.usuId}`)
      .then(({ data }) => {
        setEsCuentas(data)
      })
      .catch((error) => {
        ctxCamMen(true, 1)
        console.error(error)
      })
  }, [])

  if (!esCuentas || !id) return Toast(true, 1)
  else {
    if (!(esCuentas.some(({ cueId }) => cueId === Number(id)))) push('/cuenta')
  }

  return (
    <>
      <Titulo numero={id}/>
      <Filtro numero={id}/>
      <div className='container mx-auto fixed bottom-0 w-full px-10 z-30 mb-12 py-2 bg-gray-200'>
        <button onClick={fnOpenModal} className='btnVerde px-5 w-full'>Agregar Transacción</button>
      </div>
      <ModTra turnModal={fnTurn} estado={abrir} dataModal ={dataModal}/>
    </>
  )
}

id.getLayout = function getLayout (page) {
  return (
    <Layout>
      <Nav>
        {page}
      </Nav>
    </Layout>
  )
}
