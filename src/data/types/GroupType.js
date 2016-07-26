import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import CustomGraphQLDateType from 'graphql-custom-datetype';

const GroupType = new ObjectType({
  name: 'Group',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    coverImage: { type: StringType },
    created: { type: CustomGraphQLDateType, resolve: () => new Date() }
  }
});
export default GroupType;
