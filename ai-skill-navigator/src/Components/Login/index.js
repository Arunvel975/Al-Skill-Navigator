// Go to /login in browser to view this page!

import "./index.css";

import { Component } from "react";

import { Navigate } from "react-router-dom";

class Login extends Component {
  state = {
    shouldRedirectHome: false,
    shouldRedirectSignup: false,
    shouldRedirectForgotPassword: false,
  };

  onSubmitLoginForm = (event) => {
    event.preventDefault();
  };

  onClickLoginButton = () => {
    if (this.isUserAuthenticated()) {
      this.setState({ shouldRedirectHome: true });
    } else {
      //Add logic to get appropriate error msg from firebase and display
    }
  };

  isUserAuthenticated = () => {
    //Add logic for authentication
    //'true' is assumed temporatily
    return true;
  };

  onClickSignupButton = () => {
    this.setState({ shouldRedirectSignup: true });
  };

  onClickForgotPassword = () => {
    this.setState({ shouldRedirectForgotPassword: true });
  };

  render() {
    const {
      shouldRedirectHome,
      shouldRedirectSignup,
      shouldRedirectForgotPassword,
    } = this.state;
    if (shouldRedirectSignup) {
      return <Navigate to="/signup" />;
    }

    if (shouldRedirectHome) {
      return <Navigate to="/home" replace />;
    }

    if (shouldRedirectForgotPassword) {
      return <Navigate to="/forgotpassword" />;
    }

    return (
      <div className="bg-container">
        <form onSubmit={this.onSubmitLoginForm} className="form-container">
          <h1>Login</h1>
          <label className="label-text" htmlFor="usernameInput">
            Username
          </label>
          <input className="input-element" id="usernameInput"></input>
          <label className="label-text" htmlFor="passwordInput">
            Password
          </label>
          <input
            className="input-element"
            id="passwordInput"
            type="password"
          ></input>
          <button onClick={this.onClickLoginButton} className="login-button">
            Login
          </button>
          <button onClick={this.onClickSignupButton} className="signup-button">
            Sign Up
          </button>
          <a onClick={this.onClickForgotPassword} className="forgot-password">
            Forgot Password?
          </a>
          <h1>Other Options</h1>
          <button>Continue with Google</button>
        </form>
      </div>
    );
  }
}

export default Login;
