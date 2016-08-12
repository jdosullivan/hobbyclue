import config from '../config';

const defaultSettings = {
  url: config.databaseUrl,
  dialect: "postgres",
  migrationStorageTableName: "migrations"
};

module.exports = {
  development: defaultSettings,
  test: defaultSettings,
  production: defaultSettings
};
