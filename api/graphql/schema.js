import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import groups from './queries/groups/all';
import group from './queries/groups/single';
import events from './queries/events/all';
import posts from './queries/posts/all';
import event from './queries/events/single';
import city from './queries/cities/single';

import createPost from './mutations/posts/create';
import deletePost from './mutations/posts/delete';

export default  new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      groups,
      group,
      events,
      event,
      posts,
      city
    }
  }),
  mutation: new ObjectType({
    name: 'Mutations',
    description: 'These are the things we can change',
    fields: () => ({
      createPost,
      deletePost
    })
  })
});
