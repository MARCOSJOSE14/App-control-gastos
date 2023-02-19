import { pool } from 'config/db'

export default async function datos (req, res) {
  if (req.method === 'GET') {
    const cat = 'mercado'
    const [resp] = await pool.query('select detFecha, detDesc, detMonto from detalleGas', [cat])
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
