import PostType from '../../types/PostType';
import Post from '../../../database/models/Post';
import util from 'util';
import {
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

export default {
  type: PostType,
  args: {
    id: {type: new NonNull( IntType )},
    title: {type: new NonNull( StringType )},
    body: {type: new NonNull( StringType )}
  },
  async resolve(value, {id, title, body}) {
    console.log(`update a post: ${util.inspect({id, title, body})}`);

    const existingPost = await Post.find({ where: {id} });
    if(existingPost) {
      return await existingPost.updateAttributes({title, body});
    }

    console.error(`Post to update with id ${id} not found in database`);
  }
};
