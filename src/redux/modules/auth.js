const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';
const REGISTER = 'redux-example/auth/REGISTER';
const REGISTER_SUCCESS = 'redux-example/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'redux-example/auth/REGISTER_FAIL';
const userCookieName = 'loginResult';

import cookie from 'react-cookie';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log(`LOAD_SUCCESS`);
      if (action.result) {
        cookie.save( userCookieName, action.result );
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      console.log(`LOAD_FAIL`);
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      // save the auth token user
      if (action.result) {
        cookie.save( userCookieName, action.result );
      }
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      cookie.remove(userCookieName);
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case REGISTER:
      return {
        ...state,
        registering: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        user: null
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registering: false,
        registerError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/auth/loadAuth')
  };
}

export function register(email, password) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/auth/register', {
      data: {
        email,
        password
      }
    })
  };
}

export function login(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/auth/login', {
      data: {
        email,
        password
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/auth/logout')
  };
}

