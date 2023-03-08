const RecorridoHijo = ({ categoria }) => {
  console.log(categoria[0])
  return (<div>
        {
            categoria[0].map(({ ID, Categoría, Total, Porcentaje }, index) => (
                <div key={ID}>
                    <p>{Categoría} {Total} {Porcentaje}</p>
                </div>
            ))
        }
    </div>)
}

export default RecorridoHijo
