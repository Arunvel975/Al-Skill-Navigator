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
          <input id="usernameInput"></input>
          <label className="label-text" htmlFor="passwordInput">
            Password
          </label>
          <input id="passwordInput"></input>
          <button className="login-button">Login</button>
        </form>
        <h1>Other Options</h1>
        <button>Login with google</button>
      </div>
    );
  }
}

export default Login;
