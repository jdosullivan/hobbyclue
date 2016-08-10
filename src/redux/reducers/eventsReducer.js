const LOAD = 'yoorcity/events/LOAD';
const LOAD_SUCCESS = 'yoorcity/events/LOAD_SUCCESS';
const LOAD_FAIL = 'yoorcity/events/LOAD_FAIL';
const LOAD_POSTS_SUCCESS = 'yoorcity/events/LOAD_POSTS_SUCCESS';

const graphQlEventsQuery = `{events{id,title,content,views,time,coverImage,created,bigSecret}}`;
const initialState = {
  loaded: false
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
        data: action.result.data.events,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data.posts,
        error: null
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
    promise: (client) => client.post( '/graphql', {data: {query: `{posts{id, title,body, createdAt,updateAt }}`}} )
  };
}

export {reducer as default, isLoaded, loadEvents, loadPosts};
