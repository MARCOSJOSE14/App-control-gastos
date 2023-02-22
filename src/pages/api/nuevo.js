import { pool } from 'config/db'

export default async function nuevo (req, res) {
  if (req.method === 'POST') {
    const { fecha, descri, monto, catId, tipo } = req.body
    const [resp] = await pool.query('insert into detCat(detDate, detMonto, detDesc, catId, detTipo) values(?,?,?,?,?)', [fecha, monto, descri, catId, tipo])
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
