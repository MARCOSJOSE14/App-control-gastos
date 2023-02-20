import { pool } from 'config/db'

export default async function nuevo (req, res) {
  if (req.method === 'POST') {
    const { fecha, descri, monto, catId } = req.body
    console.log('Estos son los datos recibidos', req.body)
    await pool.query('insert into detCat(detDate, detMonto, detDesc, catId) values(?,?,?,?)', [fecha, monto, descri, catId])
  } else {
    return res.status(405).end()
  }
}
