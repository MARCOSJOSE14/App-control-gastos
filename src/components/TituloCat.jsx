import { contexto } from '@/contexts/Cuenta'

const TituloCat = () => {
  const { contCat } = contexto()
  return (
    <>
      <h1 className='border-b fixed w-full bg-white flex justify-center p-3 font-bold text-xl text-red-500'>{contCat.catDesc}</h1>
    </>
  )
}

export default TituloCat
