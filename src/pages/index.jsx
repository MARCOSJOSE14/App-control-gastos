import Head from 'next/head'
import Link from 'next/link'

export default function Home () {
  return (
    <>
      <Head>
        <title>Control Gastos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col container p-3 gap-5'>
        <h1>Esta es la pagina inicial, se explicará para que sirve la app web .... index.jsx</h1>
        <Link href={'/cuenta'} className='px-3 py-2 rounded-md bg-blue-800 text-white mx-3 text-center'>Ir a lista de cuentas</Link>
      </div>

    </>
  )
}
