import config from '../../../config';

function createActionName(area, name) {
  return `${config.app.title}/${area}/${name}`;
}

const postActions = {
  POST_LOAD_SUCCESS: createActionName( 'posts', 'LOAD_SUCCESS' ),
  POST_LOAD_FAIL: createActionName( 'posts', 'LOAD_FAIL' ),
  POST_LOAD: createActionName( 'posts', 'LOAD' ),
  POST_NEW_TOGGLE: createActionName( 'posts', 'TOGGLE' ),
  POST_NEW: createActionName( 'posts', 'NEW_POST' ),
  POST_NEW_SUCCESS: createActionName( 'posts', 'NEW_POST_SUCCESS' ),
  POST_NEW_FAIL: createActionName( 'posts', 'NEW_POST_FAIL' ),
  POST_DELETE: createActionName( 'posts', 'DELETE_POST' ),
  POST_DELETE_SUCCESS: createActionName( 'posts', 'DELETE_POST_SUCCESS' ),
  POST_DELETE_FAIL: createActionName( 'posts', 'DELETE_POST_FAIL' )
};

const cityActions = {
  CITY_LOAD: createActionName('city', 'LOAD'),
  CITY_LOAD_SUCCESS: createActionName('city', 'LOAD_SUCCESS'),
  CITY_LOAD_FAIL: createActionName('city', 'LOAD_FAIL')
};

export default {...postActions, ...cityActions};