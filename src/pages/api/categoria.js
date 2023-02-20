import { pool } from 'config/db'

export default async function get (req, res) {
  if (req.method === 'GET') {
    const cuenta = 1
    const [resp] = await pool.query('select * from catCue where cueId = (?)', cuenta)
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
