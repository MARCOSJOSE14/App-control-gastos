import { pool } from 'config/db'

export default async function titulo (req, res) {
  const { id } = req.query
  if (req.method === 'GET') {
    const [[resp]] = await pool.query('select * from cuenta where cueId= (?)', id)
    console.log(resp)
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
