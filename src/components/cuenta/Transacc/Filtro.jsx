import { espeDate, mesDate, shortDate, yearDate } from '@/hooks/Fecha'
import { useState } from 'react'
import Datagrid from './Datagrid'

const Filtro = ({ numero }) => {
  const [ffecha, setFfecha] = useState(
    {
      i: (new Date()),
      f: (new Date())
    }
  )

  const [fTipo, setFTipo] = useState('day')
  const [esTraTipo, setEsTraTipo] = useState('gasto')

  const cambioFecha = (fechaBase) => {
    switch (fTipo) {
      case 'day': {
        const dayA = fechaBase
        setFfecha(
          {
            i: dayA,
            f: dayA
          }
        )
        break
      }

      case 'week': {
        const weekA = new Date(fechaBase.getFullYear(), fechaBase.getMonth(), fechaBase.getDate() - fechaBase.getDay())
        setFfecha(
          {
            i: weekA,
            f: new Date(weekA.getFullYear(), weekA.getMonth(), weekA.getDate() + 6)
          }
        )
        break
      }

      case 'month': {
        const monthA = new Date(fechaBase.getFullYear(), fechaBase.getMonth(), 1)
        setFfecha(
          {
            i: monthA,
            f: (new Date(monthA.getFullYear(), monthA.getMonth() + 1, 0))
          }
        )
        break
      }

      case 'year': {
        const yearA = new Date(fechaBase.getFullYear(), 0, 1)
        setFfecha(
          {
            i: yearA,
            f: (new Date(yearA.getFullYear(), 11, 31))
          }
        )
        break
      }

      case 'perso': {
        const yearA = new Date(fechaBase.getFullYear(), 0, 1)
        setFfecha(
          {
            i: yearA,
            f: (new Date(yearA.getFullYear(), 11, 31))
          }
        )
        break
      }

      default:
        break
    }
  }

  const atrasF = () => {
    const fechaBase = new Date(ffecha.i)
    fechaBase.setDate(ffecha.i.getDate() - 1)
    cambioFecha(fechaBase)
  }

  const adelanteF = () => {
    const fechaBase = new Date(ffecha.f)
    fechaBase.setDate(ffecha.f.getDate() + 1)
    cambioFecha(fechaBase)
  }

  const btnFiltro = (e) => {
    setFTipo(e.target.id)
    switch (e.target.id) {
      case 'day': {
        const diaN = new Date(ffecha.i)
        setFfecha(
          {
            i: diaN,
            f: diaN
          }
        )
        break
      }

      case 'week': {
        const semanaN = new Date(ffecha.i.getFullYear(), ffecha.i.getMonth(), ffecha.i.getDate() - ffecha.i.getDay())
        setFfecha(
          {
            i: semanaN,
            f: new Date(ffecha.f.getFullYear(), ffecha.f.getMonth(), semanaN.getDate() + 6)
          }
        )
        break
      }

      case 'month': {
        const mesN = new Date(ffecha.i.getFullYear(), ffecha.i.getMonth(), 1)
        setFfecha(
          {
            i: mesN,
            f: (new Date(mesN.getFullYear(), mesN.getMonth() + 1, 0))
          }
        )
        break
      }

      case 'year': {
        const yearN = new Date(ffecha.i.getFullYear(), 0, 1)
        setFfecha(
          {
            i: yearN,
            f: (new Date(yearN.getFullYear(), 11, 31))
          }
        )
        break
      }

      case 'perso': {
        setFfecha(
          {
            i: (new Date()),
            f: (new Date())
          }
        )
        break
      }

      default:
        break
    }
  }

  const mostrarF = () => {
    switch (fTipo) {
      case 'day':
        return espeDate(ffecha.i)

      case 'week': {
        const retorna = shortDate(ffecha.i) + ' - ' + shortDate(ffecha.f)
        return retorna
      }

      case 'month':
        return mesDate(ffecha.i)

      case 'year':
        return yearDate(ffecha.i)
      default:
        break
    }
  }

  const fnCamTipo = (e) => {
    setEsTraTipo(e.target.name)
  }
  return (
    <>
        <div className='fixed pt-16 top-0 container mx-auto bg-white border-b shadow print:hidden'>
          <div className='flex justify-evenly uppercase font-bold text-[#324c5b] text-center'>
            <button onClick={fnCamTipo} name='gasto' className={(esTraTipo === 'gasto' ? 'underline' : 'no-underline')}>Gastos</button>
            <button onClick={fnCamTipo} name='ingreso' className={(esTraTipo === 'ingreso' ? 'underline' : 'no-underline')}>Ingresos</button>
          </div>

          <div className='grid grid-cols-5  py-2 my-3'>
            <button id='day' onClick={btnFiltro} className={(fTipo === 'day') ? 'underline font-medium' : 'text-gray-600'}>Día</button>
            <button id='week' onClick={btnFiltro} className={(fTipo === 'week') ? 'underline font-medium' : 'text-gray-600'}>Semana</button>
            <button id='month' onClick={btnFiltro} className={(fTipo === 'month') ? 'underline font-medium' : 'text-gray-600'}>Mes</button>
            <button id='year' onClick={btnFiltro} className={(fTipo === 'year') ? 'underline font-medium' : 'text-gray-600'}>Año</button>
            <button id='perso' onClick={btnFiltro} className={(fTipo === 'perso') ? 'underline font-medium' : 'text-gray-600'}>Descargar</button>
          </div>

          <div className='flex justify-between items-center px-5 py-3 my-3'>
          <button onClick={atrasF}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          </button>

          <p className='flex justify-center  font-medium text-blue-800'>
            {
              mostrarF()
            }
          </p>

          <button onClick={adelanteF}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </button>

          </div>
        </div>

        <div className=' hidden print:block'>
          <h1 className='uppercase flex justify-center font-bold text-2xl my-3'>{mostrarF()}</h1>
        </div>
        <Datagrid numero={numero} ffecha= {ffecha} esTraTipo= {esTraTipo}/>

    </>
  )
}

export default Filtro
