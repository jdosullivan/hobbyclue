import React, {Component, PropTypes} from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import * as newPostActions from 'redux/reducers/postsReducer';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

@connect(
  (state) => ({
    showStatus: state.posts.showStatus,
    title: state.posts.newPost.title,
    body: state.posts.newPost.body
  }), {...newPostActions} )
@reduxForm( {
  form: 'post',
  fields: ['title', 'body']
} )
export default class NewPost extends Component {
  static propTypes = {
    showStatus: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
    createNewPost: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  };

  render() {
    const {fields: {title, body}, handleSubmit, createNewPost, showStatus, toggle, resetForm } = this.props;
    return (
      <div>
        <div>
          <Nav bsStyle="pills" activeKey={1} onSelect={toggle}>
            <NavItem eventKey={1} href="#">New Post</NavItem>
          </Nav>
        </div>
        {showStatus &&
        <div>
          <form className="postForm" onSubmit={handleSubmit(() => createNewPost(title.value, body.value)
              .then(() => {
                resetForm();
              })
          )}>
            <input type="text" placeholder="Title of your post ..." {...title} />
            <input type="text" placeholder="Body of your post ..." {...body} />
            <input type="submit" value="Post"/>
          </form>
        </div>
        }
      </div>
    );
  }
}
