const LOAD = 'yoorcity/city/LOAD';
const LOAD_SUCCESS = 'yoorcity/city/LOAD_SUCCESS';
const LOAD_FAIL = 'yoorcity/city/LOAD_FAIL';

const graphQlQuery = `{city{id,name,state}}`;
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
        data: action.result.data.city,
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

function isLoaded(globalState) {
  return globalState.city && globalState.city.loaded;
}

function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/graphql', {data: { query: graphQlQuery }})
  };
}

export {reducer as default, isLoaded, load};
