import superagent from 'superagent';
import config from '../../config';
import cookie from 'react-cookie';

const userCookieName = 'loginResult';
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

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split( ';' );
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt( 0 ) == ' ') {
      c = c.substring( 1 );
    }
    if (c.indexOf( name ) == 0) {
      return c.substring( name.length, c.length );
    }
  }
  return "";
}

export default class ApiClient {
  constructor(req) {
    methods.forEach( (method) =>
      this[method] = (path, {params, data} = {}) => new Promise( (resolve, reject) => {
        const request = superagent[method]( formatUrl( path ) );

        let token = ((__SERVER__ && cookie && cookie.load( userCookieName ))
                              ? cookie.load( userCookieName )
                              : JSON.parse( unescape( getCookie( userCookieName ) ) )).token;

        request.set( 'authorization', 'Bearer ' + token );


        if (params) {
          request.query( params );
        }

        if (__SERVER__ && req.get( 'cookie' )) {
          request.set( 'cookie', req.get( 'cookie' ) );
        }

        if (data) {
          request.send( data );
        }

        request.end( (err, {body} = {}) => err ? reject( body || err ) : resolve( body ) );
      } ) );
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
