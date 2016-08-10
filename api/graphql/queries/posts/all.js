import Post from '../../../database/models/Post';
import {
  GraphQLList as List
} from 'graphql';
import PostType from '../../types/PostType';

export default  {
  type: new List(PostType),
  async resolve() {
    const allPosts = await Post.findAll();
    return allPosts;
  }
};
