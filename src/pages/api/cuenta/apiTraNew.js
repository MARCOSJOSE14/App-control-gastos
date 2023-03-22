import { pool } from 'config/db'

export default async function apiTraNew (req, res) {
  if (req.method === 'POST') {
    try {
      const { traDes, traMonto, traDate, catId, cueId } = req.body
      const [resp] = await pool.query('call SpTraNew (?, ?, ?, ?, ?);', [traDes, traMonto, traDate, catId, cueId])
      if (resp.affectedRows === 0) {
        return res.status(404).json({ modo: true, tipo: 4 })
      }
      return res.status(200).json({ modo: true, tipo: 2 })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ modo: true, tipo: 1 })
    }
  } else {
    return res.status(405).end()
  }
}
