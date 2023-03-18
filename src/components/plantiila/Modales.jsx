const Modales = ({ children }) => {
  return (
    <>
            <div onClick={fnCloseForm} className='fixed mx-auto inset-0 flex flex-col justify-end bg-black/50 pb-12 z-40'>
              {children}
            </div>
    </>
  )
}

export default Modales
