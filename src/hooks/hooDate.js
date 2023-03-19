export const totalDate = (dato) => {
  const resp = dato.reduce((acumula, { Fecha, Monto }) => {
    if (acumula.at(-1)?.fecha === Fecha) {
      acumula.at(-1).total = acumula.at(-1).total + Number(Monto)
    } else {
      acumula.push({
        fecha: Fecha,
        total: Number(Monto)
      })
    }
    return acumula
  }, [])

  return resp
}
