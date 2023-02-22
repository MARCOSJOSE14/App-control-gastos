import { pool } from 'config/db'

export default async function id (req, res) {
  if (req.method === 'GET') {
    const { id } = req.query
    const [resp] = await pool.query('select * from detCat where catID = (?) ;', [id])
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
