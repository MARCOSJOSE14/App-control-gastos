import { pool } from 'config/db'
import { diario } from 'config/Filtro'

export default async function apiDetalle (req, res) {
  if (req.method === 'GET') {
    try {
      const { id, fechaf, fechai } = (req.query)
      const [[resp]] = await pool.query('call Sp_PD (?,?,?);', [id, fechai, fechaf])
      const datoRes = diario(resp)
      return res.status(200).json(datoRes)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ titulo: 'Error', message: 'Ha ocurrido un error al buscar la primera cuenta' })
    }
  } else {
    return res.status(405).end()
  }
}
