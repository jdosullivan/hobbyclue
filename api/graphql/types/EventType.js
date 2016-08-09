import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import CustomGraphQLDateType from 'graphql-custom-datetype';
import util from 'util';

export default const EventType = new ObjectType({
  name: 'Event',
  fields: {
    id: { type: new NonNull(ID) },
    title: { type: StringType },
    content: { type: StringType },
    views: { type: StringType },
    time: { type: StringType },
    coverImage: { type: StringType },
    created: { type: CustomGraphQLDateType, resolve: () => new Date() },
    bigSecret: {
      type: StringType,
      resolve(parent, args, session) {
        return 'Really big secret';
      }
    }
  }
});
