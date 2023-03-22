import { pool } from 'config/db'

export default async function id (req, res) {
  if (req.method === 'GET') {
    try {
      const { fechai, fechaf, id } = req.query
      const [resp] = await pool.query('call Sp_Categorias_Fechas (?,?,?);', [id, fechai, fechaf])
      const ingreso = resp[0]
      const gasto = resp[1]
      const totales = { ingreso: resp[2][0].SumaIngresos, gasto: resp[2][0].SumaGastos }
      return res.status(200).json({ ingreso, gasto, totales })
    } catch (error) {
      return res.status(500).json({ titulo: 'Error', message: 'Ha ocurrido un error al buscar la primera cuenta' })
    }
  } else {
    return res.status(405).end()
  }
}
