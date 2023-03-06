import { pool } from 'config/db'

export default async function cuentas (req, res) {
  if (req.method === 'GET') {
    const [resp] = await pool.query('select * from cuenta order by cueDate')
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
