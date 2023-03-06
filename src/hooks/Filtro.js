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
  const resultado = arreglo.reduce((acumula, { detId, detDesc, detDate, detMonto, detTipo, catDesc }) => {
    if (isoDate(detDate) >= fechai && isoDate(detDate) <= fechaf) {
      total = total + Number(detMonto)
      if (acumula.at(-1)?.categoria === catDesc) {
        if (acumula.at(-1)?.fechas.at(-1).titulo === detDate) {
          acumula.at(-1)?.fechas.at(-1).datosF.push(
            { detId, detDesc, detMonto, detTipo, detDate }
          )
        } else {
          acumula.at(-1)?.fechas.push(
            {
              titulo: detDate,
              datosF: [{ detId, detDesc, detMonto, detTipo, detDate }]
            }
          )
        }
        acumula.at(-1).suma = acumula?.at(-1).suma + (detTipo === 'ingreso' ? (Number(detMonto)) : (Number(detMonto) * -1))
      } else {
        acumula.push({
          categoria: catDesc,
          suma: (detTipo === 'ingreso' ? (Number(detMonto)) : (Number(detMonto) * -1)),
          fechas: [{
            titulo: detDate,
            datosF: [{ detId, detDesc, detMonto, detTipo, detDate }]
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
