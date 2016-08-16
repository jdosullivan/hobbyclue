import React, {Component, PropTypes} from 'react';
import Post from './Post';
import Sidebar from './Sidebar';
import NewPostForm from '../../components/PostForm/NewPostForm';
import {connect} from 'react-redux';
import {isLoaded, loadPosts as load} from 'redux/actions/postsActionCreators';
import * as postsActionCreators from 'redux/actions/postsActionCreators';
import {asyncConnect} from 'redux-async-connect';
import { bindActionCreators } from 'redux';
import DropZone from '../../components/ImageUpload/DropZone';

@asyncConnect( [{
  deferred: true,
  promise: ({store}) => {
    if (!isLoaded( store.getState() )) {
      return store.dispatch( load() );
    }
  }
}] )
@connect(
  state => ({
    user: state.auth.user,
    posts: state.posts.data,
    editing: state.posts.editing,
    loading: state.posts.loading
  }),
  {load} )

export default class Events extends Component {
  static propTypes = {
    posts: PropTypes.array,
    user: PropTypes.object,
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired
  };

  render() {
    const {posts, user, editing, dispatch} = this.props;
    const styles = require( './Events.scss' );
    const boundActionCreators = bindActionCreators(postsActionCreators, dispatch);

    return (
      <div className="container-fluid">
        <section className="pageContent">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <DropZone />
                {user &&
                <div className="row">
                  <NewPostForm />
                </div>
                }
                <ul className={styles.postsContainer}>
                  { posts && posts.map( (post) => {
                    return (<Post {...post} editing={editing[post.id]} key={post.id} {...boundActionCreators}>{post.body}</Post>);
                  })}
                </ul>
              </div>
              <div className="col-lg-4 col-md-4">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
