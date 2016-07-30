import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  () => ({}),
  authActions)
export default class Register extends Component {
  static propTypes = {
    register: PropTypes.func
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    this.props.register(email.value, password.value);
    email.value = '';
    password.value = '';
  };

  render() {
    const {user} = this.props;
    return (
      <div>
        <Helmet title="Register"/>
        <h1>New User Registration</h1>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="email" placeholder="Enter your email" className="form-control"/>
              <input type="text" ref="password" placeholder="Enter password" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Register
            </button>
          </form>
        </div>
        }
      </div>
    );
  }
}



/*
import React, {Component, PropTypes} from 'react';
import {register} from 'redux/modules/auth';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

@connect(
  state => ({}),
  register)
export default class Register extends Component {
  static propTypes = {
    register: PropTypes.func
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    this.props.register(username.value, password.value);
    username.value = '';
    password.value = '';
  };

  render() {
    return (<div>
      <h1>New User Registration</h1>
      <Helmet title="Register"/>
      <form className="login-form form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" ref="username" placeholder="Enter your username" className="form-control"/>
          <input type="text" ref="password" placeholder="Enter password" className="form-control"/>
        </div>
        <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Register</button>
      </form>
    </div>);
  }
}*/
