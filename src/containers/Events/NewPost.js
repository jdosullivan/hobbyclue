import React, {Component} from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      showStatus: false,
      title: '',
      body: ''
    };
  }

  render() {
    const toggle = (selectedKey) => {
      switch (selectedKey) {
        case 1:
          this.setState( {showStatus: !this.state.showStatus} );
          break;
        default:
          break;
      }
    };

    const handleTitleChange = (event) => {
      this.setState({title: event.target.value});
    };

    const handleBodyChange = (event) => {
      this.setState({body: event.target.value});
    };

    const createNewPost = (event) => {
      event.preventDefault();
      const title = this.state.title.trim();
      const body = this.state.body.trim();
      if (!title || !body) {
        return;
      }
      // TODO: send request to the server
      this.setState({title: '', body: ''});
    };

    return (
      <div>
        <div>
          <Nav bsStyle="pills" activeKey={1} onSelect={toggle}>
            <NavItem eventKey={1} href="#">New Post</NavItem>
          </Nav>
        </div>
        {this.state.showStatus &&
        <div>
          <form className="postForm" onSubmit={createNewPost}>
            <input type="text" placeholder="Title" value={this.state.title} onChange={handleTitleChange} />
            <input type="text" placeholder="Body" value={this.state.body} onChange={handleBodyChange} />
            <input type="submit" value="Post" />
          </form>
        </div>
        }
      </div>
    );
  }
}
