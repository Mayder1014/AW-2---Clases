import {Pool} from 'pg';

const pool = new Pool({
    host: '192.168.1.7',
    user: 'root',
    password: 'pass',
    database: 'admin',
    port: 5432,
})

export default pool