import { pool } from 'config/db'
import { serialize } from 'cookie'
import { sign } from 'jsonwebtoken'

export default async function actUsuario (req, res) {
  if (req.method === 'PUT') {
    const { usuNom, usuApe, usuEmail, usuId } = req.body
    const [resp] = await pool.query('call SpActUsuario  (?, ?, ?, ?)', [usuId, usuNom, usuApe, usuEmail])

    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 30,
        resp: { usuId, usuNom, usuApe, usuEmail }
      },
      'Secreto'
    )

    const serialized = serialize('LoginToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 30,
      path: '/'
    })

    res.setHeader('Set-Cookie', serialized)
    return res.status(200).send(resp)
  } else {
    return res.status(405).end()
  }
}
