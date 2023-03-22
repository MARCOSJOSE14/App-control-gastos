import { pool } from 'config/db'

export default async function apiCueNew (req, res) {
  if (req.method === 'POST') {
    try {
      const { nombre, usuId } = req.body
      const [resp] = await pool.query('call SpCueNew (?, ?);', [nombre, usuId])
      if (resp.affectedRows === 0) {
        return res.status(404).json({ modo: true, tipo: 4 })
      }
      return res.status(200).json({ modo: true, tipo: 2 })
    } catch (error) {
      return res.status(500).json({ modo: true, tipo: 1 })
    }
  } else {
    return res.status(405).end()
  }
}
