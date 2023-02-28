import Datagrid from '@/components/Datagrid'
import Nav from '@/components/Nav'
import { MyContextProvider } from '@/contexts/Cuenta'

export default function categoria () {
  return (
  <>
    <MyContextProvider>
      <div className='bg-[#f4f7fa]'>
        <Datagrid/>
        <div className='container mx-auto'>
          <Nav/>
        </div>
      </div>
    </MyContextProvider>
  </>
  )
}
