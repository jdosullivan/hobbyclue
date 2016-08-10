import actions from '../actions';

function isLoaded(globalState) {
  return globalState.city && globalState.city.loaded;
}

function load() {
  return {
    types: [actions.CITY_LOAD, actions.CITY_LOAD_SUCCESS, actions.CITY_LOAD_FAIL],
    promise: (client) => client.post('/graphql', {data: { query: `{city{id,name,state}}` }})
  };
}

export {isLoaded, load};
