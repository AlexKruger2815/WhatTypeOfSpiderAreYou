const Pool = require ("pg").Pool;
const user = process.env.DATABASE_USERNAME
const password =  process.env.DATABASE_PASSWORD
const host =  process.env.DATABASE_HOST
const dbName =  process.env.DATABASE_NAME

const pool = new Pool({
    user: user,
    host: host,
    database: dbName,
    password: password,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;