import jwt from 'jsonwebtoken'

export default function profileHandler (req, res) {
  const { LoginToken } = req.cookies

  if (!LoginToken) {
    return res.status(401).json({ error: 'Not logged in' })
  }

  const { resp } = jwt.verify(LoginToken, 'Secreto')
  return res.status(200).json(resp)
}
