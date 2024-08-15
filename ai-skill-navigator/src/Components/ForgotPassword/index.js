import "./index.css";
import { Component } from "react";

class ForgotPassword extends Component {
  state = {
    email: "",
    emailError: "",
    showCheckMail: false,
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

  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  handleButtonClick = () => {
    if (this.validateEmail(this.state.email)) {
      this.setState({ showCheckMail: true });
    } else {
      this.setState({ emailError: "Please enter a valid email address." });
    }
  };

  render() {
    return (
      <div className="forgot-password-bg-container">
        <form className="forgot-password-form-container">
          <h1>Account Recovery</h1>
          <label
            className="forgot-password-label-text"
            htmlFor="forgotPasswordEmail"
          >
            Email
          </label>
          <input
            className="forgot-password-input-element"
            id="forgotPasswordEmail"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          {this.state.emailError && (
            <p className="error-message">{this.state.emailError}</p>
          )}
          <button type="button" onClick={this.handleButtonClick}>
            Reset Password
          </button>
          {this.state.showCheckMail && (
            <p className="forgot-password-check-mail-message">
              Please check your email for instructions to reset your password.
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
