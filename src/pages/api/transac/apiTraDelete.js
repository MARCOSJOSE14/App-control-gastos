import { pool } from 'config/db'

export default async function apiTraDelete (req, res) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query
      const [resp] = await pool.query('call SpTraDelete (?);', [id])
      if (resp.affectedRows === 0) {
        return res.status(200).json({ modo: true, tipo: 4 })
      }
      return res.status(200).json({ modo: true, tipo: 2 })
    } catch (error) {
      return res.status(500).json({ modo: true, tipo: 1 })
    }
  } else {
    return res.status(405).end()
  }
}
