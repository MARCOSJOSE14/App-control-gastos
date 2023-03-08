import { pool } from 'config/db'

export default async function cuentas (req, res) {
  if (req.method === 'GET') {
    const { usuId } = req.query
    const [[resp]] = await pool.query('call SpCuentasUsu(?)', usuId)
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
