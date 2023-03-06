import Datagrid from '@/components/cuenta/Transacc/Datagrid'
import Titulo from '@/components/cuenta/Transacc/Titulo.'
import Layout from '@/components/plantiila/Layout'
import Nav from '@/components/plantiila/Nav'
import Toast from '@/hooks/Toast'
import { useRouter } from 'next/router'

export default function id () {
  const { id } = useRouter().query

  if (!id) return Toast(true, 1)
  return (
    <>
      <Titulo numero={id}/>
      <Datagrid numero={id}/>
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
