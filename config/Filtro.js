export const diario = (arreglo) => {
  const total = { ingreso: 0, gasto: 0 }

  const resultado = arreglo.reduce((acumula, { traId, traDes, traDate, traMonto, catTipo, catDes, catImg, catColor, catId }) => {
    total[catTipo] = total[catTipo] + Number(traMonto)
    if (acumula[catTipo]) {
      if (acumula[catTipo].at(-1)?.catDes === catDes) {
        if (acumula[catTipo].at(-1)?.traDate.at(-1).fecha === traDate) {
          acumula[catTipo].at(-1)?.traDate.at(-1).traDetalles.push(
            { traId, traDes, traMonto, catTipo, catId, fecha: traDate }
          )
        } else {
          acumula[catTipo].at(-1)?.traDate.push(
            {
              fecha: traDate,
              traDetalles: [{ traId, traDes, traMonto, catTipo, catId, fecha: traDate }]
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
            traDetalles: [{ traId, traDes, traMonto, catTipo, catId, fecha: traDate }]
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
          traDetalles: [{ traId, traDes, traMonto, catTipo, catId, fecha: traDate }]
        }]
      }]
    }
    return acumula
  }, {})
  return { resultado, total }
}
