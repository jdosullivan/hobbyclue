import GraphQLReducer from './base/graphQLReducer';
import path from 'path';

const currentFileName = path.basename(__filename).replace(/\.[^/.]+$/, '');
const graphQLQuery = `{city{id,name,state}}`;
const baseReducer = new GraphQLReducer(currentFileName, graphQLQuery);

const reducer = (state, action = {}) => { return baseReducer.reduce(state, action); };
const isLoaded = (globalState) => { return baseReducer.isLoaded(globalState); };
const load = () => { return baseReducer.load(); };

export {reducer as default, isLoaded, load};
