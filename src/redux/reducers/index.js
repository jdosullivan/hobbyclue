import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from 'index.js/authReducer';
import counter from 'index.js/counterReducer';
import filters from 'index.js/filtersReducer';
import {reducer as form} from 'redux-form';
import info from 'index.js/infoReducer';
import widgets from 'index.js/widgetsReducer';
import groups from 'index.js/groupsReducer';
import posts from 'index.js/postsReducer';
import city from 'index.js/cityReducer';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  groups,
  posts,
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
