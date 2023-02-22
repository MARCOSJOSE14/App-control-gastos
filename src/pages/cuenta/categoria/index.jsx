import Datagrid from '@/components/Datagrid'
import Nav from '@/components/Nav'
import TituloCat from '@/components/TituloCat'
import { MyContextProvider } from '@/contexts/Cuenta'

export default function categoria () {
  return (
  <>
    <MyContextProvider>
      <TituloCat/>
      <Datagrid/>
      <div className='container mx-auto'>
        <Nav/>
      </div>
    </MyContextProvider>
  </>
  )
}
