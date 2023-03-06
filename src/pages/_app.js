import { MyContextProvider } from '@/contexts/Cuenta'
import '@/styles/globals.css'

export default function App ({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
  <MyContextProvider>
{ getLayout(
    <Component {...pageProps} />
)}
  </MyContextProvider>

  )
}
