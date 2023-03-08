import { pool } from 'config/db'

export default async function actUsuario (req, res) {
  if (req.method === 'PUT') {
    const { usuNom, usuApe, usuEmail } = req.body
    console.log(usuNom, usuApe, usuEmail)
    // const [resp] = await pool.query('insert into detCat(detDate, detMonto, detDesc, catId, detTipo) values(?,?,?,?,?)', [fecha, monto, descri, catId, tipo])
    return res.status(200).send()
  } else {
    return res.status(405).end()
  }
}
