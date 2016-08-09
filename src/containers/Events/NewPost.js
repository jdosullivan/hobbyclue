import React, {Component} from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {showStatus: false};
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

    return (

      <div>
        <div>
          <Nav bsStyle="pills" activeKey={1} onSelect={toggle}>
            <NavItem eventKey={1} href="/home">New Post</NavItem>
          </Nav>
        </div>
        {this.state.showStatus &&
        <div>I am the reply form</div>
        }
      </div>
    );
  }
}
