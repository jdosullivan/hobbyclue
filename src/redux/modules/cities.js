import GraphQLReducer from './base/graphQLReducer';

const graphQlEventsQuery = `{city{id,name,state}}`;
const baseReducer = new GraphQLReducer('city', 'cities', graphQlEventsQuery);

function reducer(state, action = {}) {
  return baseReducer.reduce(state, action);
}

function isLoaded(globalState) {
  return baseReducer.isLoaded(globalState);
}

function load() {
  return baseReducer.load();
}

export {reducer as default, isLoaded, load};
