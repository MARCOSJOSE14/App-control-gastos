const TituloNav = ({ children }) => {
  return (
    <>
      <h1 className='container mx-auto z-30 fixed w-full flex top-0 justify-center py-2 border-b text-2xl font-bold self-center bg-white'>
        {children}
      </h1>

    <div className='w-full h-12 '>
    </div>
    </>
  )
}

export default TituloNav
