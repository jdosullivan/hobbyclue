import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/authReducer';

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
    return (
      <div>
        <Helmet title="Register"/>
        <h1>New User Registration</h1>
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
      </div>
    );
  }
}
