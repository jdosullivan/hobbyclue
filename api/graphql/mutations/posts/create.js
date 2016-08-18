import PostType from '../../types/PostType';
import Post from '../../../database/models/Post';
import util from 'util';
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

export default {
  type: PostType,
  args: {
    title: {type: new NonNull( StringType )},
    body: {type: new NonNull( StringType )},
    images: {type: StringType }
  },
  async resolve(value, newValues) {
    console.log(`creating a post like ${util.inspect(newValues)}`);
    return await Post.create(newValues);
  }
};
