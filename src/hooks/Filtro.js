import { isoDate } from './Fecha'

export const diario = (fechai, fechaf, arreglo) => {
  const total = { ingreso: 0, gasto: 0 }

  const resultado = arreglo.reduce((acumula, { traId, traDes, traDate, traMonto, traTipo, catDes, catImg, catColor, catId }) => {
    if (isoDate(traDate) >= fechai && isoDate(traDate) <= fechaf) {
      total[traTipo] = total[traTipo] + Number(traMonto)
      if (acumula[traTipo]) {
        if (acumula[traTipo].at(-1)?.catDes === catDes) {
          if (acumula[traTipo].at(-1)?.traDate.at(-1).fecha === traDate) {
            acumula[traTipo].at(-1)?.traDate.at(-1).traDetalles.push(
              { traId, traDes, traMonto, traTipo, catId, fecha: traDate }
            )
          } else {
            acumula[traTipo].at(-1)?.traDate.push(
              {
                fecha: traDate,
                traDetalles: [{ traId, traDes, traMonto, traTipo, catId, fecha: traDate }]
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
              traDetalles: [{ traId, traDes, traMonto, traTipo, catId, fecha: traDate }]
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
            traDetalles: [{ traId, traDes, traMonto, traTipo, catId, fecha: traDate }]
          }]
        }]
      }
    }
    return acumula
  }, {})
  return { resultado, total }
}
