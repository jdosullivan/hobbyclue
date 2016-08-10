module.exports = {
  development: {
    url: "postgres://jahmaiosullivan:Star2016@localhost:5432/HobbyClue",
    dialect: "pg",
    migrationStorageTableName: "migrations"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "pg",
    migrationStorageTableName: "migrations"
  }
};
