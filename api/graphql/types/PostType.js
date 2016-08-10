import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';

export default new ObjectType({
  name: 'Post',
  fields: {
    id: { type: new NonNull(ID) },
    title: { type: StringType },
    body: { type: StringType },
    createdAt: { type: StringType },
    updateAt: { type: StringType }
  }
});

