import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

export default new ObjectType({
  name: 'City',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    state: { type: StringType },
    createdAt: { type: StringType },
    updateAt: { type: StringType }
  }
});

