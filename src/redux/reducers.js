import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './reducers/authReducer';
import counter from './reducers/counterReducer';
import filters from './reducers/filtersReducer';
import {reducer as form} from 'redux-form';
import info from './reducers/infoReducer';
import widgets from './reducers/widgetsReducer';
import groups from './reducers/groupsReducer';
import events from './reducers/eventsReducer';
import city from './reducers/cityReducer';
import newPost from './reducers/newPostReducer';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  groups,
  events,
  city,
  filters,
  newPost,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets
});
