import Layout from '@/components/plantiila/Layout'
import Nav from '@/components/plantiila/Nav'

const id = () => {
  console.log('xd')
  return (
    <>
          <h1>estos son graficos</h1>
    </>
  )
}

export default id

id.getLayout = function getLayout (page) {
  return (
    <Layout>
      <Nav>
        {page}
      </Nav>
    </Layout>
  )
}
