let LOAD;
let LOAD_SUCCESS;
let LOAD_FAIL;
let graphQlQuery;
let dataField;
let FileName;

const initialState = {
  loaded: false
};

export default class GraphQLReducer {
  constructor(dataFieldName, fileName, graphQLQuery) {
    LOAD = `yoorcity/${fileName}/LOAD`;
    LOAD_SUCCESS = `yoorcity/${fileName}/LOAD_SUCCESS`;
    LOAD_FAIL = `yoorcity/${fileName}/LOAD_FAIL`;
    graphQlQuery = graphQLQuery;
    dataField = dataFieldName;
    FileName = fileName;
  }

  reduce(state = initialState, action = {}) {
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
          data: action.result.data[dataField],
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

  isLoaded(globalState) {
    return globalState[FileName] && globalState[FileName].loaded;
  }

  load() {
    return {
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      promise: (client) => client.post( '/graphql', {data: {query: graphQlQuery}} )
    };
  }
}
