import { espeDate, pen } from '@/hooks/Fecha'
import { StyleSheet, View, Text, Page, Document } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: '50pt',
    fontFamily: 'Helvetica',
    fontSize: '12pt'
  },
  title: {
    textAlign: 'center',
    fontSize: '20pt',
    marginBottom: '20pt',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: '16pt',
    marginVertical: '5pt',
    fontFamily: 'Helvetica-Bold'
  },
  center: {
    textAlign: 'center'
  },
  container2: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  grid: {
    marginHorizontal: 1
  },
  row: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  left: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10
  },
  category: {
    fontWeight: 'bold'
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  date: {
    borderBottomWidth: 1,
    marginVertical: 5,
    fontWeight: 'bold',
    color: 'blue'
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
    paddingHorizontal: 10
  },
  resCategoria: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginVertical: 3,
    display: 'flex',
    flexDirection: 'row',
    flexBasis: 0,
    flexGrow: 6,
    gap: 15
  },
  resDatagrid: { display: 'flex', flexDirection: 'column', margin: 10, gap: 2 },
  resDtgTitulo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: '14pt'
  }
})

const Exportar = ({ fecha, data }) => {
  const { resultado, total } = data
  return (
  <>
<Document>
    <Page style={styles.page}>
      <View>
        <Text style={styles.title}>{espeDate(fecha.i)}</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Resumen</Text>
      </View>

      <View style={styles.resDtgTitulo}>
        <Text style={styles.title2}>Saldo:</Text>
        <Text style={styles.content}>XXXXX</Text>
      </View>

      <View style={{ marginVertical: 10 }}>
        <View style={styles.resDtgTitulo}>
          <Text>Ingresos:</Text>

          <Text>{pen(total.ingreso)}</Text>
        </View>

        <View style={styles.resDatagrid}>
          {(!(resultado.ingreso))
            ? (<Text>No hay Ingresos</Text>)
            : ((resultado.ingreso).map(({ catDes, sumCat, catColor }, index) => (
                <View key={index} style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1 }}>
                  <View style={styles.resCategoria}>
                    <Text style={{ flexBasis: 0, flexGrow: 6, color: catColor }}>{catDes}</Text>

                    <Text style={{ flexBasis: 0, flexGrow: 1, textAlign: 'right' }}>{((sumCat / total.ingreso) * 100).toFixed(2) } %</Text>

                    <Text style={{ flexBasis: 0, flexGrow: 1, textAlign: 'right' }}>{sumCat.toFixed(2)}</Text>
                  </View>
                </View>
              )))
          }
        </View>
      </View>

      <View style={{ marginVertical: 10 }}>
        <View style={styles.resDtgTitulo}>
          <Text>Gastos:</Text>

          <Text>{pen(total.gasto)}</Text>
        </View>

        <View style={styles.resDatagrid}>
          {(!(resultado.gasto))
            ? (<Text>No hay Gastos</Text>)
            : ((resultado.gasto).map(({ catDes, sumCat, catColor }, index) => (
                <View key={index} style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1 }}>
                  <View style={styles.resCategoria}>
                    <Text style={{ flexBasis: 0, flexGrow: 6, color: catColor }}>{catDes}</Text>

                    <Text style={{ flexBasis: 0, flexGrow: 1, textAlign: 'right' }}>{((sumCat / total.gasto) * 100).toFixed(2) } %</Text>

                    <Text style={{ flexBasis: 0, flexGrow: 1, textAlign: 'right' }}>{sumCat.toFixed(2)}</Text>
                  </View>
                </View>
              )))
          }
        </View>
      </View>

      <View style={styles.resDtgTitulo}>
        <Text style={styles.title2}>Resultado</Text>
        <Text style={styles.content}>XXXXX</Text>
      </View>

    </Page>

    <Page style={styles.page}>
    <View>
        <Text style={styles.subtitle}>Detalles</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title2}>Ingresos:</Text>
        <Text style={styles.content}>{pen(total.ingreso)}</Text>
      </View>

      {(!(resultado.ingreso))
        ? <Text style={styles.center}>No hay ingresos</Text>
        : (
    <View style={styles.container2}>
      <View style={styles.grid}>
        {(resultado.ingreso).map(({ catDes, sumCat, traDate, catColor }, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.left}>
              <Text style={[styles.category, { color: catColor }]}>{catDes}</Text>
            </View>
            <View style={styles.right}>
              <Text>{pen(sumCat)}</Text>
            </View>
            {traDate.map(({ fecha, traDetalles }) => (
              <View key={fecha}>
                <Text style={styles.date}>{espeDate(fecha)}</Text>
                {traDetalles.map(({ traDes, traId, traMonto }) => (
                  <View key={traId} style={styles.transaction}>
                    <Text>{traDes}</Text>
                    <Text>{pen(traMonto)}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
          )
}

      <View style={styles.container}>
        <Text style={styles.title2}>Gastos:</Text>
        <Text style={styles.content}>{pen(total.gasto)}</Text>
      </View>

      {(!(resultado.gasto))
        ? <Text style={styles.center}>No hay gastos</Text>
        : (
    <View style={styles.container2}>
      <View style={styles.grid}>
        {(resultado.gasto).map(({ catDes, sumCat, traDate, catColor }, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.left}>
              <Text style={[styles.category, { color: catColor }]}>{catDes}</Text>
            </View>
            <View style={styles.right}>
              <Text>{pen(sumCat)}</Text>
            </View>
            {traDate.map(({ fecha, traDetalles }) => (
              <View key={fecha}>
                <Text style={styles.date}>{espeDate(fecha)}</Text>
                {traDetalles.map(({ traDes, traId, traMonto }) => (
                  <View key={traId} style={styles.transaction}>
                    <Text>{traDes}</Text>
                    <Text>{pen(traMonto)}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
          )
}

    </Page>
  </Document>

  </>
  )
}

export default Exportar
