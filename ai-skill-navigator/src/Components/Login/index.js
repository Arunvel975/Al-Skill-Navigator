import "./index.css";

import { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="bg-container">
        <form className="form-container">
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
          <button className="login-button">Login</button>
          <button className="signup-button">Sign Up</button>
          <a className="forgot-password">Forgot Password?</a>
          <h1>Other Options</h1>
          <button>Login with google</button>
        </form>
      </div>
    );
  }
}

export default Login;
