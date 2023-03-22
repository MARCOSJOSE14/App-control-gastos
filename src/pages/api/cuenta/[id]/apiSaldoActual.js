import { pool } from 'config/db'

export default async function apiSaldoActual (req, res) {
  if (req.method === 'GET') {
    const { id } = req.query
    const [[[resp]]] = await pool.query('call Sp_SaldoActual (?)', [id])
    return res.status(200).send(resp.SaldoActual)
  } else {
    return res.status(405).end()
  }
}
