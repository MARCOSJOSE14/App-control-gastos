export const hooFiltroCat = (arreglo) => {
  const resultado = arreglo.reduce((acumula, { catId, catDes, catImg, catTipo, catColor, catModo }) => {
    if (acumula[catTipo]) {
      acumula[catTipo].push(
        { catImg, catDes, catId, catColor, catModo, catTipo }
      )
    } else {
      acumula[catTipo] = [{
        catImg,
        catDes,
        catId,
        catColor,
        catModo,
        catTipo
      }]
    }
    return acumula
  }, {})
  return resultado
}
