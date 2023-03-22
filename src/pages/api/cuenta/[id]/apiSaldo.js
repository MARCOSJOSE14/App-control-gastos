import { pool } from 'config/db'

export default async function apiSaldo (req, res) {
  const { id, fecha } = req.query
  if (req.method === 'GET') {
    const [[[resp]]] = await pool.query('call Sp_SaldoAnterior (?, ?)', [fecha, id])
    return res.status(200).send(resp.SaldoAnterior)
  } else {
    return res.status(405).end()
  }
}
