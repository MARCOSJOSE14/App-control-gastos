import { createPool } from 'mysql2/promise'

const pool = createPool({
  host: 'colegio1.c0zyii5nlweg.sa-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Qubittos=2017',
  database: 'control',
  port: 3306
})

export { pool }
