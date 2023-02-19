import { pool } from 'config/db'

export default async function nuevo (req, res) {
  if (req.method === 'POST') {
    const { fecha, descri, monto } = req.body
    const cat = 'mercado'
    const gasid = 1
    await pool.query('insert into detalleGas(detFecha, detMonto, detDesc, detCat, gasId) values(?,?,?,?,?)', [fecha, monto, descri, cat, gasid])
  } else {
    return res.status(405).end()
  }
}
