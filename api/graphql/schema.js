import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import groups from './queries/groups/all';
import group from './queries/groups/single';
import events from './queries/events/all';
import event from './queries/events/single';
import city from './queries/cities/single';

export default  new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      groups,
      group,
      events,
      event,
      city
    }
  })
});
