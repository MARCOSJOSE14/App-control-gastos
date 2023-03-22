import { pool } from 'config/db'

export default async function apiCat (req, res) {
  const { user } = req.query
  if (req.method === 'GET') {
    const [[resp]] = await pool.query('call SpCatUsu (?)', user)
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
