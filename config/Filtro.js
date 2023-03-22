
export const diario = (arreglo) => {
  const isoDate = (datafecha) => (new Date(datafecha)).toISOString().slice(0, 10)
  const total = { ingreso: 0, gasto: 0 }

  const resultado = arreglo.reduce((acumula, { traId, traDes, traDate, traMonto, catTipo, catDes, catImg, catColor, catId }) => {
    total[catTipo] = total[catTipo] + Number(traMonto)
    if (acumula[catTipo]) {
      if (acumula[catTipo].at(-1)?.catDes === catDes) {
        if (isoDate(acumula[catTipo].at(-1)?.traDate.at(-1).fecha) === isoDate(traDate)) {
          acumula[catTipo].at(-1).traDate.at(-1).sumFecha = acumula[catTipo].at(-1).traDate.at(-1).sumFecha + Number(traMonto)

          acumula[catTipo].at(-1)?.traDate.at(-1).traDetalles.push(
            { traId, traDes, traMonto, catTipo, catId }
          )
        } else {
          acumula[catTipo].at(-1)?.traDate.push(
            {
              fecha: traDate,
              sumFecha: Number(traMonto),
              traDetalles: [{ traId, traDes, traMonto, catTipo, catId }]
            }
          )
        }
        acumula[catTipo].at(-1).sumCat = acumula[catTipo].at(-1).sumCat + Number(traMonto)
      } else {
        acumula[catTipo].push({
          catDes,
          catImg,
          catColor,
          sumCat: Number(traMonto),
          traDate: [{
            fecha: traDate,
            sumFecha: Number(traMonto),
            traDetalles: [{ traId, traDes, traMonto, catTipo, catId }]
          }]
        })
      }
    } else {
      acumula[catTipo] = [{
        catDes,
        catImg,
        catColor,
        sumCat: Number(traMonto),
        traDate: [{
          fecha: traDate,
          sumFecha: Number(traMonto),
          traDetalles: [{ traId, traDes, traMonto, catTipo, catId }]
        }]
      }]
    }
    return acumula
  }, {})
  return { resultado, total }
}
