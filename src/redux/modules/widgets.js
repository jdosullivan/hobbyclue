const LOAD = 'redux-example/widgets/LOAD';
const LOAD_SUCCESS = 'redux-example/widgets/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/widgets/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      console.log(`LOAD`);
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log(`LOAD_SUCCESS action is ${JSON.stringify(action)}`);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      console.log(`LOAD_FAIL`);
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
  return globalState.widgets && globalState.widgets.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/widget/load/param1/param2') // params not used, just shown as demonstration
  };
}

export function loadGraphQL() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    graphQL: (graphQLClient) => graphQLClient.get(`{groups{id,name,coverImage,created}}`) // params not used, just shown as demonstration
  };
}