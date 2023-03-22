import { pool } from 'config/db'

export default async function apiTraEdit (req, res) {
  if (req.method === 'PUT') {
    try {
      const { traDes, traMonto, traDate, catId, traId } = req.body
      const [resp] = await pool.query('call SpTraEdit (?, ?, ?, ?, ?);', [traDes, traMonto, traDate, catId, traId])
      if (resp.affectedRows === 0) {
        return res.status(200).json({ modo: true, tipo: 4 })
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
