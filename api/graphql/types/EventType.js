import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import CustomGraphQLDateType from 'graphql-custom-datetype';

const EventType = new ObjectType({
  name: 'Event',
  fields: {
    id: { type: new NonNull(ID) },
    title: { type: StringType },
    content: { type: StringType },
    views: { type: StringType },
    time: { type: StringType },
    coverImage: { type: StringType },
    created: { type: CustomGraphQLDateType, resolve: () => new Date() }
  }
});
export default EventType;
