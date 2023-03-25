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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 1
  },
  totaldate: {
    borderTopWidth: 1,
    marginVertical: 5,
    fontFamily: 'Times-Italic',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  transaction: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 2,
    paddingLeft: 10,
    paddingRight: 60
  },
  resCategoria: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginVertical: 3,
    display: 'flex',
    flexDirection: 'row',
    flexBasis: 0,
    flexGrow: 6,
    gap: 10
  },
  resDatagrid: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    gap: 2,
    marginRight: 70
  },
  resDetalle: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    gap: 2
  },
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
  const traTipo = ['ingreso', 'gasto']

  const fechaSaldo = new Date(fecha.i)
  fechaSaldo.setMonth(fechaSaldo.getMonth() - 1)

  const dias = Math.floor((fecha.f - fecha.i) / 86400000)
  let titulo
  let tipo
  switch (true) {
    case dias === 0:
      tipo = 'del día'
      titulo = longDate(fecha.i)
      break
    case dias === 6:
      tipo = 'de la semana'
      titulo = espeDate(fecha.i) + ' - ' + espeDate(fecha.f)
      break
    case dias < 32:
      tipo = 'del mes'
      titulo = mesDate(fecha.i)
      break
    default:
      tipo = 'del año'
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
        <Text style={styles.title2}>Saldo {tipo} {tipo === 'del mes' ? mesDate(fechaSaldo) : tipo.concat(' anterior')}</Text>
        <Text style={styles.content}>{pen(saldo)}</Text>
      </View>

{traTipo.map((traTipo, index) => (
      <View key={index} style={{ marginVertical: 10 }}>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.resDtgTitulo}>
            <Text>{ traTipo === 'ingreso' ? 'Ingresos:' : 'Gastos'}</Text>
          </View>

          <View style={styles.resDatagrid}>
            {(!(resultado[traTipo]))

              ? (<Text>{ traTipo === 'ingreso' ? 'No hay Ingresos:' : 'No hay Gastos'}</Text>)

              : ((resultado[traTipo]).map(({ catDes, sumCat, catColor }, index) => (
                  <View key={index} style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1 }}>
                    <View style={styles.resCategoria}>
                      <Text style={{ flexBasis: 0, flexGrow: 5, color: catColor, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>{catDes}</Text>

                      <Text style={{ flexBasis: 0, flexGrow: 1, textAlign: 'right' }}>{((sumCat / total[traTipo]) * 100).toFixed(2) } %</Text>

                      <Text style={{ flexBasis: 0, flexGrow: 1, textAlign: 'right' }}>{sumCat.toFixed(2)}</Text>
                    </View>
                  </View>
                )))
            }
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopWidth: 1,
            paddingVertical: 1
          }}>
            <Text>{ traTipo === 'ingreso' ? 'Total Ingresos:' : 'Total Gastos'}</Text>
            <Text>{ traTipo === 'gasto' && '-'} {pen(total[traTipo])}</Text>
          </View>
        </View>
      </View>
))}
      <View style={styles.resDtgTitulo}>
        <Text style={styles.title2}>Resultado ( (+/-) Saldo + Ingresos - Gastos )</Text>
        <Text style={styles.content}>{pen(saldo - total.gasto + total.ingreso)}</Text>
      </View>

    </Page>

{traTipo.map((traTipo, index) => (
    <Page style={styles.page} key={index}>

      <View>
        <View style={styles.resDtgTitulo}>
          <Text>Detalles { traTipo === 'ingreso' ? 'Ingresos:' : 'Gastos'}</Text>

          <Text>{pen(total[traTipo])}</Text>
        </View>

        {(!(resultado[traTipo]))
          ? <Text style={styles.center}>No hay { traTipo === 'ingreso' ? 'ingresos:' : 'gastos'}</Text>
          : (
        <View style={styles.resDetalle}>
          {(resultado[traTipo]).map(({ catDes, sumCat, traDate, catColor }, index) => (
            <View key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginVertical: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontFamily: 'Helvetica-Bold', fontSize: '12pt' }}>
              <Text style={{ color: catColor }}>{catDes}</Text>

            </View>
            {traDate.map(({ fecha, traDetalles, sumFecha }) => (
              <View key={fecha} style={{ marginVertical: 5, marginHorizontal: 5, marginRight: 70 }}>
                <Text style={styles.date}>{espeDate(fecha)}</Text>

                {traDetalles.map(({ traDes, traId, traMonto }) => (
                  <View key={traId} style={styles.transaction}>
                    <View style={{ flexBasis: 0, flexGrow: 5 }}>
                      <Text style={{ textTransform: 'lowercase' }}>{traDes}</Text>
                    </View>

                    <Text style={{ flexBasis: 0, flexGrow: 2, textAlign: 'right' }}>{(Number(traMonto)).toFixed(2)}</Text>
                  </View>
                ))}

                <View style={styles.totaldate}>
                  <Text>{pen(sumFecha)}</Text>
                </View>
              </View>
            ))}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontFamily: 'Helvetica-Bold', fontSize: '12pt', borderTopWidth: 1, borderColor: catColor, paddingVertical: 2, paddingHorizontal: 1 }}>
              <Text style={{ color: catColor }}>Total {catDes}</Text>

              <Text>{pen(sumCat)}</Text>
            </View>
          </View>
          ))}
        </View>
            )
          }
    </View>
    </Page>
))}

  </Document>

  </>
  )
}

export default Exportar
