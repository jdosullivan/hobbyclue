import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import groups from './queries/groups/all';
import group from './queries/groups/single';
import events from './queries/events/all';
import event from './queries/events/single';
import city from './queries/cities/single';

import createPost from './mutations/posts/create';

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
  }),
  mutation: new ObjectType({
    name: 'Mutations',
    description: 'These are the things we can change',
    fields: () => ({
      createPost
    })
  })
});
