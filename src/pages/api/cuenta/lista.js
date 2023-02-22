import { pool } from 'config/db'

export default async function datos (req, res) {
  if (req.method === 'GET') {
    const [resp] = await pool.query('select * from gastos')
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
