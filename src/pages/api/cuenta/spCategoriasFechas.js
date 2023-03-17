import { pool } from 'config/db'

export default async function fechas (req, res) {
  if (req.method === 'POST') {
    const { cuentaId, fechaInicio, fechaFinal } = req.body
    // console.log(req)
    console.log(req.body)
    const [resp] = await pool.query('CALL Sp_Categorias_Fechas(?, ?, ?);', [cuentaId, fechaInicio, fechaFinal])
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
