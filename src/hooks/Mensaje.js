export const Mensaje = (objeto1, objeto2, funcion) => {
  const respuesta = () => funcion()

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-end z-50">
        <div className="bottom-0 w-full bg-white p-4 rounded-lg flex flex-col gap-5">
          <div className="flex justify-center fill-red-600">
            <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
          </div>

          <div className="flex justify-center "> <p className="text-center text-gray-500 ">¿Estás seguro que quieres eliminar {objeto1}?</p></div>

          <div className="flex flex-col text-lg font-medium gap-3 py-2">
            <button onClick={respuesta} className="rounded-lg border py-1 text-white bg-red-600">Eliminar {objeto2}</button>

            <button className=" underline underline-offset-1 text-gray-500">Cancelar</button>
          </div>
        </div>
      </div>
    </>
  )
}
