import { espeDate, longDate, mesDate, pen, yearDate } from '@/hooks/Fecha'
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
    marginBottom: '24pt',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase'
  },
  subtitle: {
    fontSize: '16pt',
    marginVertical: '8pt',
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
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  date: {
    borderBottomWidth: 1,
    marginVertical: 5,
    fontFamily: 'Times-Italic',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
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

const Exportar = ({ fecha, data, saldo }) => {
  const dias = Math.floor((fecha.f - fecha.i) / 86400000)
  let titulo
  switch (true) {
    case dias === 0:
      titulo = longDate(fecha.i)
      break
    case dias === 6:
      titulo = espeDate(fecha.i) + ' - ' + espeDate(fecha.f)
      break
    case dias < 32:
      titulo = mesDate(fecha.i)
      break
    default:
      titulo = yearDate(fecha.i)
      break
  }
  const { resultado, total } = data
  return (
  <>
<Document>
    <Page style={styles.page}>
      <View>
        <Text style={styles.title}>{titulo}</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Resumen</Text>
      </View>

      <View style={styles.resDtgTitulo}>
        <Text style={styles.title2}>Saldo al {espeDate(fecha.i)}:</Text>
        <Text style={styles.content}>{pen(saldo)}</Text>
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
        <Text style={styles.title2}>Resultado ( (+/-) Saldo + Ingresos - Gastos )</Text>
        <Text style={styles.content}>{pen(saldo + total.gasto + total.ingreso)}</Text>
      </View>

    </Page>

    <Page style={styles.page}>
      <View>
        <Text style={styles.subtitle}>Detalles</Text>
      </View>

      <View>
        <View style={styles.resDtgTitulo}>
          <Text>Ingresos:</Text>

          <Text>{pen(total.ingreso)}</Text>
        </View>

        {(!(resultado.ingreso))
          ? <Text style={styles.center}>No hay ingresos</Text>
          : (
        <View style={styles.resDatagrid}>
          {(resultado.ingreso).map(({ catDes, sumCat, traDate, catColor }, index) => (
            <View key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginVertical: 10 }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontFamily: 'Helvetica-Bold', fontSize: '12pt' }}>
                <Text style={{ color: catColor }}>Total {catDes}</Text>

                <Text>{pen(sumCat)}</Text>
              </View>
              {traDate.map(({ fecha, traDetalles, sumFecha }) => (
                <View key={fecha} style={{ marginVertical: 5, marginHorizontal: 8 }}>
                  <View style={styles.date}>
                    <Text>{espeDate(fecha)}</Text>
                    <Text>{pen(sumFecha)}</Text>
                  </View>
                  {traDetalles.map(({ traDes, traId, traMonto }) => (
                    <View key={traId} style={styles.transaction}>
                      <Text>{traDes}</Text>
                      <Text>{(Number(traMonto)).toFixed(2)}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
            )
          }
    </View>
    </Page>

    <Page style={styles.page}>
    <View>
      <View style={styles.resDtgTitulo}>
        <Text>Gastos:</Text>

        <Text>{pen(total.ingreso)}</Text>
      </View>

      {(!(resultado.gasto))
        ? <Text style={styles.center}>No hay Gastos</Text>
        : (
      <View style={styles.resDatagrid}>
        {(resultado.gasto).map(({ catDes, sumCat, traDate, catColor }, index) => (
          <View key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginVertical: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontFamily: 'Helvetica-Bold', fontSize: '12pt' }}>
              <Text style={{ color: catColor }}>Total {catDes}</Text>

              <Text>{pen(sumCat)}</Text>
            </View>
            {traDate.map(({ fecha, traDetalles, sumFecha }) => (
              <View key={fecha} style={{ marginVertical: 5, marginHorizontal: 5 }}>
                  <View style={styles.date}>
                    <Text>{espeDate(fecha)}</Text>
                    <Text>{pen(sumFecha)}</Text>
                  </View>
                {traDetalles.map(({ traDes, traId, traMonto }) => (
                  <View key={traId} style={styles.transaction}>
                    <Text>{traDes}</Text>
                    <Text>{(Number(traMonto)).toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
          )
        }
      </View>
      </Page>

  </Document>

  </>
  )
}

export default Exportar
