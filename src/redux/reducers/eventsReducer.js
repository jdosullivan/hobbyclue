import util from 'util';

const LOAD = 'yoorcity/events/LOAD';
const LOAD_SUCCESS = 'yoorcity/events/LOAD_SUCCESS';
const LOAD_FAIL = 'yoorcity/events/LOAD_FAIL';
const LOAD_POSTS_SUCCESS = 'yoorcity/events/LOAD_POSTS_SUCCESS';
const TOGGLE = 'yoorcity/posts/TOGGLE';
const NEW_POST = 'yoorcity/posts/NEW_POST';
const NEW_POST_SUCCESS = 'yoorcity/events/NEW_POST_SUCCESS';
const NEW_POST_FAIL = 'yoorcity/events/NEW_POST_FAIL';

const graphQlEventsQuery = `{events{id,title,content,views,time,coverImage,created,bigSecret}}`;
const initialState = {
  loaded: false,
  showStatus: false,
  title: '',
  body: '',
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
      console.log(`successfully loaded data ${util.inspect(action.result.data)}`);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data.events,
        error: null
      };
    case LOAD_FAIL:
      console.log(`faile loaded data ${util.inspect(action.error)}`);
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case LOAD_POSTS_SUCCESS:
      console.log(`LOAD_POSTS_SUCCESS successfully loaded data ${util.inspect(action.result.data)}`);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data.posts,
        error: null
      };
    case TOGGLE:
      return {
        ...state,
        showStatus: !state.showStatus
      };
    case NEW_POST:
      console.log(`NEW_POST`);
      return {
        ...state,
        saving: true
      };
    case NEW_POST_SUCCESS:
      console.log(`NEW_POST_SUCCESS with data ${util.inspect(action.result.data.createPost)}`);
      return {
        ...state,
        data: [...state.data, action.result.data.createPost],
        saving: false
      };
    case NEW_POST_FAIL:
      console.log(`NEW_POST_FAIL with error ${util.inspect(action.error)}`);
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
  return globalState.events && globalState.events.loaded;
}

function loadEvents() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post( '/graphql', {data: {query: graphQlEventsQuery}} )
  };
}

function loadPosts() {
  return {
    types: [LOAD, LOAD_POSTS_SUCCESS, LOAD_FAIL],
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
    promise: (client) => client.post('/graphql', {data: { query: graphQlMutationQuery }})
  };
}

export {reducer as default, isLoaded, loadEvents, loadPosts, toggle, createNewPost};
