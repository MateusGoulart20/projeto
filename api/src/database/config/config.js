module.exports = {
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: process.env.PORT ? Number(process.env.PORT) : 5432,
    database: 'nodejs',
    define: { logging: false }
}
// nodejs e postgresql