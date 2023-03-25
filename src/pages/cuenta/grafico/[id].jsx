import Layout from '@/components/plantilla/Layout'
import Nav from '@/components/plantilla/Nav'

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
