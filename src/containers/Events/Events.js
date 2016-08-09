import React, {Component, PropTypes} from 'react';
import Post from './Post';
import Sidebar from './Sidebar';
import {connect} from 'react-redux';
import {isLoaded, loadEvents as load} from 'redux/modules/eventsReducer';
import {asyncConnect} from 'redux-async-connect';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

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
    events: state.events.data,
    loading: state.events.loading
  }),
  {load} )

export default class Events extends Component {
  static propTypes = {
    events: PropTypes.array,
    user: PropTypes.object,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired
  };

  render() {
    const {events, user} = this.props;
    const styles = require( './Events.scss' );

    function handleSelect(selectedKey) {
      alert('selected ' + selectedKey);
    }

    return (
      <div className="container-fluid">
        <section className="pageContent">
          <div className="container">
            {user &&
            <div className="row">
              <Nav bsStyle="pills" activeKey={1} onSelect={handleSelect}>
                <NavItem eventKey={1} href="/home">New Post</NavItem>
                <NavItem title={user.name} href="/">
                  <p>{user.name}</p>
                </NavItem>
              </Nav>
            </div>
            }
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <div className={styles.postsContainer}>
                  { events.map( (event) => {
                    return (<Post {...event} key={event.id}>{event.content}</Post>);
                  } ) }
                </div>
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
