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
import groups from './modules/groups';
import events from './modules/events';
import city from './modules/city';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  groups,
  events,
  city,
  filters,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets
});
