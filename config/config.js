module.exports = {
  development: {
    url: "postgres://jahmaiosullivan:Star2016@localhost:5432/HobbyClue",
    dialect: "postgres",
    migrationStorageTableName: "migrations"
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    migrationStorageTableName: "migrations"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    migrationStorageTableName: "migrations"
  }
};
