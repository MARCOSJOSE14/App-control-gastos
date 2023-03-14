import { isoDate } from './Fecha'

export const diario = (fechai, fechaf, arreglo) => {
  const total = { ingreso: 0, gasto: 0 }

  const resultado = arreglo.reduce((acumula, { traId, traDes, traDate, traMonto, traTipo, catDes, catImg, catColor }) => {
    if (isoDate(traDate) >= fechai && isoDate(traDate) <= fechaf) {
      total[traTipo] = total[traTipo] + Number(traMonto)
      if (acumula[traTipo]) {
        if (acumula[traTipo].at(-1)?.catDes === catDes) {
          if (acumula[traTipo].at(-1)?.traDate.at(-1).fecha === traDate) {
            acumula[traTipo].at(-1)?.traDate.at(-1).traDetalles.push(
              { traId, traDes, traMonto }
            )
          } else {
            acumula[traTipo].at(-1)?.traDate.push(
              {
                fecha: traDate,
                traDetalles: [{ traId, traDes, traMonto }]
              }
            )
          }
          acumula[traTipo].at(-1).sumCat = acumula[traTipo].at(-1).sumCat + Number(traMonto)
        } else {
          acumula[traTipo].push({
            catDes,
            catImg,
            catColor,
            sumCat: Number(traMonto),
            traDate: [{
              fecha: traDate,
              traDetalles: [{ traId, traDes, traMonto }]
            }]
          })
        }
      } else {
        acumula[traTipo] = [{
          catDes,
          catImg,
          catColor,
          sumCat: Number(traMonto),
          traDate: [{
            fecha: traDate,
            traDetalles: [{ traId, traDes, traMonto }]
          }]
        }]
      }
    }
    return acumula
  }, {})

  // let total = 0
  // const resultado = arreglo.reduce((acumula, { traId, traDes, traDate, traMonto, traTipo, catDes, catImg }) => {
  //   if (isoDate(traDate) >= fechai && isoDate(traDate) <= fechaf) {
  //     total = total + Number(traMonto)
  //     if (acumula.at(-1)?.categoria === catDes) {
  //       if (acumula.at(-1)?.fechas.at(-1).titulo === traDate) {
  //         acumula.at(-1)?.fechas.at(-1).datosF.push(
  //           { traId, traDes, traMonto, traTipo, traDate }
  //         )
  //       } else {
  //         acumula.at(-1)?.fechas.push(
  //           {
  //             titulo: traDate,
  //             datosF: [{ traId, traDes, traMonto, traTipo, traDate }]
  //           }
  //         )
  //       }
  //       acumula.at(-1).suma = acumula?.at(-1).suma + (traTipo === 'ingreso' ? (Number(traMonto)) : (Number(traMonto) * -1))
  //     } else {
  //       acumula.push({
  //         categoria: catDes,
  //         catImg,
  //         suma: (traTipo === 'ingreso' ? (Number(traMonto)) : (Number(traMonto) * -1)),
  //         fechas: [{
  //           titulo: traDate,
  //           datosF: [{ traId, traDes, traMonto, traTipo, traDate }]
  //         }]
  //       })
  //     }
  //   }
  //   return acumula
  // }, [])

  // const respf = resultado.map(({ suma, fechas, categoria }) => (
  //   {
  //     categoria,
  //     fechas,
  //     suma,
  //     porcentaje: Number(((suma / total) * 100).toFixed(2))
  //   }
  // ))
  return { resultado, total }
}
