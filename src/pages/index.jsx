import Form from '@/components/Form'
import Head from 'next/head'

export default function Home () {
  return (
    <>
      <Head>
        <title>Control Gastos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container mx-auto'>
        <Form/>

      </div>
    </>
  )
}
