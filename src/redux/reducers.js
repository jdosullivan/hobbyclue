import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './modules/auth';
import counter from './modules/counter';
import filters from './modules/filters';
import {reducer as form} from 'redux-form';
import info from './modules/info';
import widgets from './modules/widgets';
import graphql from './modules/graphql';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  graphql,
  filters,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets
});
