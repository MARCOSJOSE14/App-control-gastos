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
      <div className='flex flex-col container mx-auto p-3 gap-5 '>
        <h1 className='text-center text-2xl font-bold text-green-700 py-2 my-2 border-b'>TRANSACCIONES +</h1>

        <div className='px-4 text-justify flex flex-col gap-3 text-lg'>
          <p className='text-center text-lg'>
            ¡Bienvenido/a a nuestra nueva app web para llevar un control de tus gastos e ingresos!
          </p>

          <p>
            Nuestro objetivo es ayudarte a tomar mejores decisiones financieras y lograr tus metas de ahorro a largo plazo. La app es fácil de usar y cuenta con una interfaz intuitiva que te permitirá agregar tus ingresos y gastos en segundos, así como también categorizarlos y verlos en gráficos y estadísticas.
          </p>

          <p>
          ¡Esperamos que esta app sea de gran ayuda en tu camino hacia una mejor gestión financiera! ¡Bienvenido/a y gracias por usar nuestra aplicación!
          </p>

        </div>

        <Link href={'/login'} className='px-3 py-3 font-bold rounded-md bg-green-600 text-white mx-3 text-center'>
          INGRESAR
        </Link>

      </div>

        <nav className='fixed bottom-0 left-0 w-full text-center bg-gray-600/70 text-sm p-4 text-white justify-center'>
            <p>
              Creado por los ingenieros:
            </p>

            <p>
              - Marcos Ramos José Luis
            </p>

            <p>
              - Quispe Oropeza, Jhean Giomar
            </p>
        </nav>
    </>
  )
}
