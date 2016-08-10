import PostType from '../../types/PostType';
import Post from '../../../database/models/Post';
import util from 'util';
import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

export default {
  type: PostType,
  args: {
    id: {type: new NonNull( IntType )}
  },
  async resolve(value, { id }) {
    await Post.destroy({ where: { id } });
    return { id };
  }
};
