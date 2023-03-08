import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const login = () => {
  const { push } = useRouter()

  const [datof, setDatof] = useState({
    id: '',
    pas: ''
  })
  const [passVer, setPassVer] = useState(false)
  const [incorrecto, setIncorrecto] = useState(false)

  const tiposPass = (e) => {
    e.preventDefault()
    setPassVer(!passVer)
  }

  const savedato = ({ target: { name, value } }) => {
    setDatof({
      ...datof,
      [name]: value
    })
  }

  const vali = async (e) => {
    e.preventDefault()
    setIncorrecto(false)
    const { data } = await axios.post('/api/login', datof)
    if (data) {
      push('/cuenta')
    } else {
      setIncorrecto(true)
    }
  }

  return (
    <>
      <div className="h-screen w-screen bg-[#f4f7fa] items-center justify-center flex flex-col">
        <h1 className=" p-5 font-bold text-center text-3xl mb-5 text-black">
          TRANSACCIONES +
        </h1>

        <div className="bg-white p-5 rounded-xl grid shadow border">
          <form
          className="flex flex-col "
          onSubmit={vali}>
            {incorrecto && <label className='text-center text-red-600'>Correo y/o contraseña Incorrectos</label>}

            <input
              className="m-3 pl-2 text-base py-2 rounded-lg border-black border mb-1 w-72"
              type="email"
              name="id"
              required
              maxLength="50"
              placeholder="Ingresa tu Correo"
              onChange={savedato}
            />

            {/* {((!/^\d+$/.test(datof.id)) && datof.id.length !== 0) &&
              <label className='text-xs flex justify-center text-red-500'>EL DNI solo debe tener números</label>
            } */}
            <div className='overflow-hidden rounded-lg border-black border m-3 flex'>
              <input
                type={passVer ? 'text' : 'password'}
                className="  p-2 text-base grow"
                name="pass"
                required
                placeholder="Ingresa tu Contraseña"
                onChange={savedato}
              />

              <button onClick={tiposPass} className='px-2 flex items-center'>
                <svg className='fill-black' height='25' width='25' clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" fillRule="nonzero"/></svg>
              </button>
            </div>

            <button className="mt-3 py-3 border rounded-xl bg-green-600 font-medium text-white">
              Iniciar Sesión
            </button>
          </form>

          <span className="underline underline-offset-1 flex justify-center mt-12 ">
            <Link href={'/'}>¿Olvidaste tu contraseña?</Link>
          </span>
        </div>
      </div>
    </>
  )
}
export default login
