module.exports = {
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    host: process.env("DATABASE_URL"),
    port: process.env.PORT ? Number(process.env.PORT) : 5432,
    database: 'nodejs',
    define: { logging: false }
}
// nodejs e postgresql