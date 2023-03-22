import Filtro from '@/components/cuenta/Transacc/Filtro'
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

  const { push } = useRouter()

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
