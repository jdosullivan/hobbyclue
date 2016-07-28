const LOAD = 'redux-example/graphql/LOAD';
const LOAD_SUCCESS = 'redux-example/graphql/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/graphql/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
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
        data: action.result,
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
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.graphql && globalState.graphql.loaded;
}

export function load(query) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    graphQL: (graphQLClient) => graphQLClient.get(query) // params not used, just shown as demonstration
  };
}
