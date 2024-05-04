const Pool = require ("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "spider-type-rds-instance.cxzxxuebgdfx.eu-west-1.rds.amazonaws.com",
    database: "SpiderTypeDB",
    password: "GAqr2PEH-6Yx%4WHRgM{n5}}(9m|",
    port: 5432,
});

module.exports = pool;