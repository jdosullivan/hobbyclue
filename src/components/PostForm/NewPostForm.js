import React, {Component, PropTypes} from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import * as newPostActions from 'redux/actions/postsActionCreators';
import {connect} from 'react-redux';
import PostForm from './PostForm';

@connect(
  (state) => ({
    showStatus: state.posts.showStatus,
    newPost: state.posts.newPost
  }), {...newPostActions} )

export default class NewPost extends Component {
  static propTypes = {
    showStatus: PropTypes.bool.isRequired,
    newPost: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
    createNewPost: PropTypes.func.isRequired,
    saveFile: PropTypes.func.isRequired
  };

  render() {
    const {createNewPost, saveFile, showStatus, toggle, newPost } = this.props;
    return (
      <div>
        <div>
          <Nav bsStyle="pills" activeKey={1} onSelect={toggle}>
            <NavItem eventKey={1} href="#">New Post</NavItem>
          </Nav>
        </div>
        {showStatus &&
        <div>
          <PostForm formKey="newPost"
                    submitHandler={(formValues) => { return createNewPost(formValues, newPost); }}
                    saveFileHandler={saveFile} />
        </div>
        }
      </div>
    );
  }
}
