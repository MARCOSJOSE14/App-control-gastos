import { pool } from 'config/db'

export default async function id (req, res) {
  if (req.method === 'POST') {
    const { fechaInicio, fechaFinal, categoria } = req.body
    console.log(req.body)
    const [resp] = await pool.query('CALL Sp_Lista_Fechas(?, ?, ?)', [categoria, fechaInicio, fechaFinal])
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
