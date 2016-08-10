import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/reducers/authReducer';
import {
  App,
  Chat,
  Home,
  Widgets,
  Groups,
  About,
  Login,
  Register,
  LoginSuccess,
  Survey,
  NotFound,
  Events
} from './containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {user}} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace( '/' );
      }
      cb();
    }

    if (!isAuthLoaded( store.getState() )) {
      store.dispatch( loadAuth() ).then( checkAuth );
    } else {
      checkAuth();
    }
  };

  const requireAnonymous = (nextState, replace) => {
    const {auth: {user}} = store.getState();
    if (user) {
      console.log( `already logged in: redirect to home page` );
      // oops, logged in, so can't be here!
      replace( '/' );
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Events}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>

      <Route onEnter={requireAnonymous}>
        <Route path="login" component={Login}/>
        <Route path="register" component={Register}/>
      </Route>

      { /* Routes */ }
      <Route path="about" component={About}/>
      <Route path="home" component={Home}/>
      <Route path="events" component={Events}/>
      <Route path="groups" component={Groups}/>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
