import { createPool } from 'mysql2/promise'

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'jheanquispe4',
  database: 'casa',
  port: 3306
})

export { pool }
