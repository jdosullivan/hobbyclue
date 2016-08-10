import config from '../../../config';

function createActionName(area, name) {
  return `${config.app.title}/${area}/${name}`;
}

function createPostActionNames(name) {
  return createActionName('posts', name);
}

const postActions = {
  LOAD_SUCCESS: createPostActionNames('LOAD_SUCCESS'),
  LOAD_FAIL: createPostActionNames('LOAD_FAIL'),
  LOAD: createPostActionNames('LOAD'),
  TOGGLE: createPostActionNames('TOGGLE'),
  NEW_POST: createPostActionNames('NEW_POST'),
  NEW_POST_SUCCESS: createPostActionNames('NEW_POST_SUCCESS'),
  NEW_POST_FAIL: createPostActionNames('NEW_POST_FAIL'),
  DELETE_POST: createPostActionNames('DELETE_POST'),
  DELETE_POST_SUCCESS: createPostActionNames('DELETE_POST_SUCCESS'),
  DELETE_POST_FAIL: createPostActionNames('DELETE_POST_FAIL')
};

export default { ...postActions };
