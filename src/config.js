require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];


const auth = {

  jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID || '186244551745631',
    secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
  },

  // https://apps.twitter.com/
  twitter: {
    key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
  },

};

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',
  auth,
  app: {
    title: 'React Redux Example',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'React Redux Example: %s',
      meta: [
        {name: 'description', content: 'All the modern best practices in one example.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'React Redux Example'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'React Redux Example'},
        {property: 'og:description', content: 'All the modern best practices in one example.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
