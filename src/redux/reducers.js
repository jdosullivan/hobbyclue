import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './modules/authReducer';
import counter from './modules/counterReducer';
import filters from './modules/filtersReducer';
import {reducer as form} from 'redux-form';
import info from './modules/infoReducer';
import widgets from './modules/widgetsReducer';
import groups from './modules/groupsReducer';
import events from './modules/eventsReducer';
import city from './modules/cityReducer';

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
