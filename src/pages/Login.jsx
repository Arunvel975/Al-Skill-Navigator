import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/assets/css/Login.css";
import { googleSignInInitiate, loginInitiate, githubSignInInitiate } from '../redux/actions';
// import { googleSignInInitiate, loginInitiate, fbSignInInitiate, githubSignInInitiate } from '../redux/actions';

const Login = () => {
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const [captchaToken, setCaptchaToken] = useState(null);

    const { currentUser } = useSelector((state) => state.user);
    const history = useHistory();

    useEffect(() => {
        if (currentUser) {
            history.push("/");
            toast.success("Login successful!");
        }
    }, [currentUser, history]);

    const dispatch = useDispatch();
    const { email, password } = state;

    const handleGoogleSignIn = async () => {
        const isNewUser = await dispatch(googleSignInInitiate());
        toast.success("Google Sign In initiated");
        if (isNewUser) {
            history.push('/profile-setup'); // Navigate if user data does not exist
            toast.success("New user detected, please complete your profile");
        }
    };

    const handleGithubSignIn = async () => {
        const isNewUser = await dispatch(githubSignInInitiate());
        toast.success("Github Sign In initiated");
        if (isNewUser) {
            history.push('/profile-setup'); // Navigate if user data does not exist
            toast.success("New user detected, please complete your profile");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !captchaToken) {
            toast.error("Please fill in all fields and complete the captcha");
            return;
        }
        dispatch(loginInitiate(email, password));
        setState({ email: "", password: "" });
        toast.success("Login initiated");
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    return (
        <div>
            <ToastContainer position="bottom-right" />
            <div id="logreg-forms">
                <form className='form-signin' onSubmit={handleSubmit}>
                    <h1 className='h3 mb-3'>Sign In</h1>
                    <input type="email"
                        id='inputEmail'
                        className='form-control'
                        name='email'
                        placeholder='Email Address'
                        onChange={handleChange}
                        value={email}
                        required />

                    <input type="password"
                        id='inputPassword'
                        className='form-control'
                        name='password'
                        placeholder='Password'
                        onChange={handleChange}
                        value={password}
                        required />

                    <div className="captcha-wrapper">
                        <HCaptcha
                            sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY}
                            onVerify={handleCaptchaChange}
                        />
                    </div>

                    <button className='btn btn-secondary' type='submit'>
                        <i className='fas fa-sign-in-alt'></i> Sign In
                    </button>
                    <p>OR</p>
                    <div className="social-login">
                        <button className='btn google-btn social-btn' type='button' onClick={handleGoogleSignIn}>
                            <span>
                                <i className='fab fa-google-plus-g f'></i> <h6>Sign in with Google</h6>
                            </span>
                        </button>

                        <button className='btn github-btn social-btn' type='button' onClick={handleGithubSignIn}>
                            <span>
                                <i className='fab fa-github f'></i> <h6>Sign in with Github</h6>
                            </span>
                        </button>
                    </div>
                    <hr />
                    <Link to="/forget-password">
                        <button className='btn btn-primary' type='button' id='forgot_pswd'> Forgot password?</button>
                    </Link>
                    <Link to="/register">
                        <button className='btn btn-primary' type='button' id='btn-signup'>
                            <i className='fas fa-user-plus'></i> Sign Up New Account
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;