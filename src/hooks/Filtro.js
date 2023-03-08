import { isoDate } from './Fecha'

export const diario = (fechai, fechaf, arreglo) => {
  // const resultado = arreglo.reduce((acumula, { detId, detDesc, detDate, detMonto, detTipo, catDesc }) => {
  //   if (acumula.at(-1)?.afecha === detDate) {
  //     acumula.at(-1)?.datosE.push({ detId, detDesc, detMonto, detTipo, catDesc })
  //     acumula.at(-1).bmonto = acumula?.at(-1).bmonto + (detTipo === 'ingreso' ? (Number(detMonto)) : (Number(detMonto) * -1))
  //   } else {
  //     acumula.push({
  //       afecha: detDate,
  //       bmonto: (detTipo === 'ingreso' ? (Number(detMonto)) : (Number(detMonto) * -1)),
  //       datosE: [{ detId, detDesc, detMonto, detTipo, catDesc }]
  //     })
  //   }
  //   return acumula
  // }, [])

  // Prueba de filtro por fecha
  let total = 0
  const resultado = arreglo.reduce((acumula, { traId, traDes, traDate, traMonto, traTipo, catDes, catImg }) => {
    if (isoDate(traDate) >= fechai && isoDate(traDate) <= fechaf) {
      total = total + Number(traMonto)
      if (acumula.at(-1)?.categoria === catDes) {
        if (acumula.at(-1)?.fechas.at(-1).titulo === traDate) {
          acumula.at(-1)?.fechas.at(-1).datosF.push(
            { traId, traDes, traMonto, traTipo, traDate }
          )
        } else {
          acumula.at(-1)?.fechas.push(
            {
              titulo: traDate,
              datosF: [{ traId, traDes, traMonto, traTipo, traDate }]
            }
          )
        }
        acumula.at(-1).suma = acumula?.at(-1).suma + (traTipo === 'ingreso' ? (Number(traMonto)) : (Number(traMonto) * -1))
      } else {
        acumula.push({
          categoria: catDes,
          catImg,
          suma: (traTipo === 'ingreso' ? (Number(traMonto)) : (Number(traMonto) * -1)),
          fechas: [{
            titulo: traDate,
            datosF: [{ traId, traDes, traMonto, traTipo, traDate }]
          }]
        })
      }
    }
    return acumula
  }, [])

  const respf = resultado.map(({ suma, fechas, categoria }) => (
    {
      categoria,
      fechas,
      suma,
      porcentaje: Number(((suma / total) * 100).toFixed(2))
    }
  ))
  return respf
}
