import { pool } from 'config/db'

export default async function titulo (req, res) {
  const { id } = req.query
  if (req.method === 'GET') {
    const [[resp]] = await pool.query('select * from cuentas where cueId= (?)', id)
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
