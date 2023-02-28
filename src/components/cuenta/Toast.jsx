import { contexto } from '@/contexts/Cuenta'

const Toast = () => {
  const valor = contexto().cargando

  if (valor[0]) {
    switch (valor[1]) {
      case 1:
        return (
        <div className="flex justify-center ">
          <h1 className="flex gap-3 bg-white fixed rounded border shadow py-2 px-3 top-0 mt-3 ">
            <svg className="animate-spin " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.527 7.708c.741-.444 1.6-.708 2.527-.708 2.757 0 5 2.243 5 5h2c0-3.86-3.141-7-7-7-1.336 0-2.58.385-3.641 1.038l-1.359-2.038-1.719 6h5.719l-1.527-2.292zm5.054 8.584c-.741.444-1.6.708-2.527.708-2.757 0-5-2.243-5-5h-2c0 3.86 3.141 7 7 7 1.336 0 2.58-.385 3.641-1.038l1.359 2.038 1.719-6h-5.719l1.527 2.292z"/></svg>
            Cargando
          </h1>
        </div>
        )
      case 2:
        return (
        <div className="flex justify-center text-green-600 fill-green-600">
          <h1 className="flex gap-3 bg-white fixed rounded border shadow py-2 px-3 top-0 mt-3 ">
          <svg clipRule="evenodd" width="24" height="24" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fillRule="nonzero"/></svg>
            Exito
          </h1>
        </div>
        )
      case 3:
        return (
        <div className="flex justify-center text-red-600 fill-red-600">
          <h1 className="flex gap-3 bg-white fixed rounded border shadow py-2 px-3 top-0 mt-3 ">
            <svg clipRule="evenodd" width="24" height="24" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" fillRule="nonzero"/></svg>
            Error
          </h1>
        </div>
        )
      default:
        return null
    }
  }
}

export default Toast
