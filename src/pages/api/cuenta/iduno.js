import { pool } from 'config/db'

export default async function iduno (req, res) {
  if (req.method === 'GET') {
    try {
      const [resp] = await pool.query('select cueId from cuenta LIMIT 1;')
      return res.status(200).send(resp)
    } catch (error) {
      return res.status(500).json({ titulo: 'Error', message: 'Ha ocurrido un error al buscar la primera cuenta' })
    }
  } else {
    return res.status(405).end()
  }
}
