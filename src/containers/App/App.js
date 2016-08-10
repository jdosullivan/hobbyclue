import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {IndexLink} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import {isLoaded as isInfoLoaded, load as loadInfo} from 'redux/reducers/infoReducer';
import {isLoaded as isAuthLoaded, load as loadAuth, logout} from 'redux/reducers/authReducer';
import {isLoaded as isCityLoaded, load as loadCity} from 'redux/actions/cityActionCreators';
import {push} from 'react-router-redux';
import config from '../../../config';
import {asyncConnect} from 'redux-async-connect';

@asyncConnect( [{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded( getState() )) {
      promises.push( dispatch( loadInfo() ) );
    }
    if (!isAuthLoaded( getState() )) {
      promises.push( dispatch( loadAuth() ) );
    }
    if (!isCityLoaded( getState() )) {
      promises.push( dispatch( loadCity() ) );
    }
    return Promise.all( promises );
  }
}] )
@connect(
  state => ({
    user: state.auth.user,
    city: state.city.data
  }),
  {
    logout,
    pushState: push
  } )

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    city: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState( '/' );
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState( '/' );
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user, city} = this.props;
    const styles = require( './App.scss' );

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar className={styles.headerBar}>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div className={styles.brand}/>
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            {user &&
            <Nav navbar pullRight>
              <LinkContainer to="/">
                <NavItem title={`Logged in as ${user.name}`} href="/">
                  <p className={styles.loggedInMessage}>{user.name}</p>
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/logout">
                <NavItem eventKey={6} className="logout-link" onClick={this.handleLogout}>
                  Logout
                </NavItem>
              </LinkContainer>
            </Nav>}
          </Navbar.Collapse>
          {city && <div className={styles.cityHeader}>
            <h1>{city.name}, {city.state}</h1>
            <div>
              <a className="change" href="#">change city ...</a>
            </div>
          </div>}
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
