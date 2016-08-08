const LOAD = 'yoorcity/groups/LOAD';
const LOAD_SUCCESS = 'yoorcity/groups/LOAD_SUCCESS';
const LOAD_FAIL = 'yoorcity/groups/LOAD_FAIL';

const graphQlGroupsQuery = `{groups{id,name,coverImage,created}}`;
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
        data: action.result.data.groups,
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
  return globalState.groups && globalState.groups.loaded;
}

function loadGroups() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/graphql', {data: { query: graphQlGroupsQuery }})
  };
}

export {reducer as default, isLoaded, loadGroups};
