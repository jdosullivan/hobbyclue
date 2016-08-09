import GraphQLReducer from './base/graphQLReducer';
import path from 'path';

const reducerPath = path.basename(__filename).replace(/\.[^/.]+$/, '').replace('Reducer', '');
const graphQLQuery = `{city{id,name,state}}`;
const baseReducer = new GraphQLReducer(reducerPath, graphQLQuery);

const reducer = (state, action = {}) => { return baseReducer.reduce(state, action); };
const isLoaded = (globalState) => { return baseReducer.isLoaded(globalState); };
const load = () => { return baseReducer.load(); };

export {reducer as default, isLoaded, load};
