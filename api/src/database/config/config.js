module.exports = {
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 5432,
    database: 'nodejs',
    define: { logging: false }
}
// nodejs e postgresql