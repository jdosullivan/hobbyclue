import util from 'util';

const LOAD_SUCCESS = 'yoorcity/posts/LOAD_SUCCESS';
const LOAD_FAIL = 'yoorcity/posts/LOAD_FAIL';
const LOAD = 'yoorcity/posts/LOAD';
const TOGGLE = 'yoorcity/posts/TOGGLE';
const NEW_POST = 'yoorcity/posts/NEW_POST';
const NEW_POST_SUCCESS = 'yoorcity/posts/NEW_POST_SUCCESS';
const NEW_POST_FAIL = 'yoorcity/posts/NEW_POST_FAIL';

const initialState = {
  loaded: false,
  showStatus: false,
  newPost: {
    title: '',
    body: ''
  },
  saving: false
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data.posts,
        error: null
      };
    case LOAD_FAIL:
      console.log( `failed loaded data ${util.inspect( action.error )}` );
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case TOGGLE:
      return {
        ...state,
        showStatus: !state.showStatus
      };
    case NEW_POST:
      console.log( `NEW_POST` );
      return {
        ...state,
        saving: true
      };
    case NEW_POST_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.result.data.createPost],
        saving: false
      };
    case NEW_POST_FAIL:
      console.log( `NEW_POST_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        saving: false,
        error: action.error
      };
    default:
      return state;
  }
}

function isLoaded(globalState) {
  return globalState.posts && globalState.posts.loaded;
}

function loadPosts() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post( '/graphql', {data: {query: `{posts{id, title,body, createdAt,updatedAt }}`}} )
  };
}

function toggle() {
  return {type: TOGGLE};
}

function createNewPost(title, body) {
  const newTitle = title.trim();
  const newBody = body.trim();
  if (!newTitle || !newBody) {
    return {type: ''};
  }
  const graphQlMutationQuery = `mutation CreatePost { createPost(title: \"${newTitle}\",body: \"${newBody}\") {id, title,body, createdAt,updatedAt }}`;

  return {
    types: [NEW_POST, NEW_POST_SUCCESS, NEW_POST_FAIL],
    promise: (client) => client.post( '/graphql', {data: {query: graphQlMutationQuery}} )
  };
}

export {reducer as default, isLoaded, loadPosts, toggle, createNewPost};
