const defaultSettings = {
  url: process.env.DATABASE_URL || 'postgres://jahmaiosullivan:Star2016@localhost:5432/HobbyClue',
  dialect: "postgres",
  migrationStorageTableName: "migrations"
};

module.exports = {
  development: defaultSettings,
  test: defaultSettings,
  production: defaultSettings
};
