import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import groups from './queries/groups/all';
import group from './queries/groups/single';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      groups,
      group
    }
  })
});

export default schema;
