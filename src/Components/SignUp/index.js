import "./index.css";
import { Component } from "react";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handleEmailChange = (event) => {
    const email = event.target.value;
    this.setState({ email });

    if (!this.validateEmail(email)) {
      this.setState({ emailError: "Please enter a valid email address." });
    } else {
      this.setState({ emailError: "" });
    }
  };

  handlePasswordChange = (event) => {
    const password = event.target.value;
    this.setState({ password });

    if (!this.validatePassword(password)) {
      this.setState({
        passwordError:
          "Password must be at least 8 characters long,<br />include at least one capital letter,<br />and one special character.",
      });
    } else {
      this.setState({ passwordError: "" });
    }
  };

  handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    this.setState({ confirmPassword });

    if (confirmPassword !== this.state.password) {
      this.setState({ confirmPasswordError: "Passwords do not match." });
    } else {
      this.setState({ confirmPasswordError: "" });
    }
  };

  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  onSubmitSignupForm = (event) => {
    event.preventDefault();
  };

  onClickSignupButton = () => {
    //Add logic to sign up user
  };

  onClickContinueWithGoogleButton = () => {
    //Add logic to continue with google
  };

  render() {
    return (
      <div className="signup-bg-container">
        <form
          onSubmit={this.onSubmitSignupForm}
          className="signup-form-container"
        >
          <h1>Create your Account</h1>
          <label className="signup-label-text" htmlFor="signupUsername">
            Username
          </label>
          <input
            className="signup-input-element"
            id="signupUsername"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
          <label className="signup-label-text" htmlFor="signupEmail">
            Email
          </label>
          <input
            className="signup-input-element"
            id="signupEmail"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          {this.state.emailError && (
            <p className="error-message">{this.state.emailError}</p>
          )}
          <label className="signup-label-text" htmlFor="signupPassword">
            Password
          </label>
          <input
            className="signup-input-element"
            type="password"
            id="signupPassword"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          {this.state.passwordError && (
            <p
              className="error-message"
              dangerouslySetInnerHTML={{ __html: this.state.passwordError }}
            ></p>
          )}
          <label className="signup-label-text" htmlFor="signupConfirmPassword">
            Confirm Password
          </label>
          <input
            className="signup-input-element"
            type="password"
            id="signupConfirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPasswordChange}
          />
          {this.state.confirmPasswordError && (
            <p className="error-message">{this.state.confirmPasswordError}</p>
          )}
          <button onClick={this.onClickSignupButton}>Signup</button>
          <p>or</p>
          <button onClick={this.onClickContinueWithGoogleButton}>
            Continue with Google
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
