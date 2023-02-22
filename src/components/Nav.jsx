import Link from 'next/link'
import { useState } from 'react'
import Categoria from './Categoria'
import Form from './Form'

const Nav = () => {
  const [openCat, setOpenCat] = useState(false)
  const [openNew, setOpenNew] = useState(false)

  const openSS = () => setOpenCat(true)

  const closeSS = () => setOpenCat(false)

  const openMO = () => setOpenNew(true)

  const closeMO = () => setOpenNew(false)

  return (
    <>
      <div className="text-xs fixed grid grid-cols-3 w-full border-t max-[1023px]:bottom-0 bg-white">
        <Link href={'/cuenta'} className=' py-1 col-span-1 flex flex-col items-center  fill-black'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Cuenta
        </Link>

        <Link href={'#cat'} onClick={openSS} className=" py-1  col-span-1 flex flex-col items-center  fill-black">
          <svg height="23" viewBox="0 0 24 24" width="23" xmlns="http://www.w3.org/2000/svg"><path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11 4h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6h-4v-4h4v4zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"/></svg>
          Categorias
        </Link>

        <Link href={'#new'} onClick={openMO} className="py-1 col-span-1 flex flex-col items-center  fill-black">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
          Nuevo
        </Link>
      </div>
        <Form abrir={openNew} cerrar={closeMO}/>
        <Categoria abrir={openCat} cerrar={closeSS}/>
    </>
  )
}

export default Nav
