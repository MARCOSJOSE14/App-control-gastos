import { pool } from 'config/db'

export default async function apiDetalle (req, res) {
  if (req.method === 'GET') {
    try {
      const { id, catId, fechaf, fechai } = (req.query)
      const [resp] = await pool.query('call Sp_Lista_Fechas (?,?,?,?);', [id, catId, fechai, fechaf])
      const dataCat = resp[0]
      const total = { monto: resp[1][0].MontoTotal, catDes: resp[1][0].NombreCategoria, img: resp[1][0].catImg, color: resp[1][0].catColor, tipo: resp[1][0].catTipo, catId: resp[1][0].catId }
      return res.status(200).json({ dataCat, total })
    } catch (error) {
      return res.status(500).json({ titulo: 'Error', message: 'Ha ocurrido un error al buscar la primera cuenta' })
    }
  } else {
    return res.status(405).end()
  }
}
