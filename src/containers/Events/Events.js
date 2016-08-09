import React, {Component, PropTypes} from 'react';
import Post from './Post';
import Sidebar from './Sidebar';
import NewPost from './NewPost';
import {connect} from 'react-redux';
import {isLoaded, loadEvents as load} from 'redux/reducers/eventsReducer';
import {asyncConnect} from 'redux-async-connect';

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


    return (
      <div className="container-fluid">
        <section className="pageContent">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                {user &&
                <div className="row">
                  <NewPost />
                </div>
                }
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
