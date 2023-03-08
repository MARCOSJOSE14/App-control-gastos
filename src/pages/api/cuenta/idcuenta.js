import { pool } from 'config/db'

export default async function idcuenta (req, res) {
  if (req.method === 'GET') {
    const { usuId } = req.query
    try {
      const [[resp]] = await pool.query('select cueId from cuentas where usuId = (?) LIMIT 1;', usuId)
      return res.status(200).send(resp)
    } catch (error) {
      return res.status(500).json({ titulo: 'Error', message: 'Ha ocurrido un error al buscar la primera cuenta' })
    }
  } else {
    return res.status(405).end()
  }
}
