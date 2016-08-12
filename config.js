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

  jwt: { secret: process.env.JWT_SECRET || 'Hobby Clue rocks!!!' },

  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID || '559702427573365',
    secret: process.env.FACEBOOK_APP_SECRET || '4afb33f446983cd71899681d75d1f120'
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
  },

  // https://apps.twitter.com/
  twitter: {
    key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
  }
};
const webSiteName = 'BrickAndCyber';
const tagLine = 'Promote and share your products with a local audience';

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 3030,
  databaseUrl: process.env.DATABASE_URL || 'postgres://jahmaiosullivan:Star2016@localhost:5432/HobbyClue',
  tagLine,
  auth,
  app: {
    title: webSiteName,
    description: '',
    head: {
      titleTemplate: `${webSiteName} - %s`,
      meta: [
        {name: 'description', content: ''},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: ''},
        {property: 'og:image', content: ''},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: webSiteName},
        {property: 'og:description', content: ''},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@jahmaiosullivan'},
        {property: 'og:creator', content: '@jahmaiosullivan'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  }
}, environment);
