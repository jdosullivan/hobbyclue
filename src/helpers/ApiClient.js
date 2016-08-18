import superagent from 'superagent';
import config from '../../config';
import cookie from 'react-cookie';

const getBearerAuthToken = () => {
  const userCookieName = 'loginResult';
  let cookieVal;
  if (__SERVER__ && cookie) {
    cookieVal = cookie.load( userCookieName );
  }

  if (!__SERVER__) {
    cookieVal = window.reactCookie.load( userCookieName );
  }

  const authToken = cookieVal ? 'Bearer ' + cookieVal.token : '';
  return authToken;
};

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach( (method) =>
      this[method] = (path, {params, data, attach, field} = {}) => new Promise( (resolve, reject) => {
        const request = superagent[method]( formatUrl( path ) );
        const jwBearerToken = getBearerAuthToken();
        if (jwBearerToken) {
          request.set( 'authorization', jwBearerToken );
        }

        if (params) {
          request.query( params );
        }

        if (__SERVER__ && req.get( 'cookie' )) {
          request.set( 'cookie', req.get( 'cookie' ) );
        }

        if ((attach || field) && data) {
          console.warn(`cannot use both attach/field and data params. Use either but not both.`);
        } else if (data) {
          request.send( data );
        } else if (attach || field) {
          const formData = new FormData();
          if (attach) {
            attach.forEach( (item) => {
              formData.append( item.name, item.value );
            } );
          }
          if (field) {
            field.forEach( item => {
              formData.append( item.name, item.value );
            } );
          }
          request.send( formData );
        }

        request.end( (err, {body} = {}) => err ? reject( body || err ) : resolve( body ) );
      }));
  }

  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {
  }
}
