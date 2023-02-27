import { pool } from 'config/db'

export default async function eliminar (req, res) {
  if (req.method === 'DELETE') {
    try {
      const { categoria } = req.query
      const [results] = await pool.query('delete from detCat where detId = (?)', categoria)

      if (results.affectedRows === 0) {
        return res.status(404).json({ titulo: 'Advertencia', message: 'La transacción no existe' })
      }

      return res.status(200).json({ titulo: 'Correcto', message: 'La transacción se ha eliminado correctamente' })
    } catch (error) {
      return res.status(500).json({ titulo: 'Error', message: 'Ha ocurrido un error al eliminar la transacción' })
    }
  } else {
    return res.status(405).end()
  }
}
