import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerInitiate } from '../redux/actions';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Register = () => {
    const [state, setState] = useState({
        displayName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: ""
    });

    const { currentUser } = useSelector((state) => state.user);
    const [captchaToken, setCaptchaToken] = useState(null);

    const history = useHistory(); // Correct usage of useHistory

    useEffect(() => {
        if (currentUser) {
            if (currentUser.role === "Admin" ) {
                history.push("/admin-home"); 
                if (currentUser.role === "Instructor") {
                    history.push("/instructor-home");
                }
                toast.success("Registration successful! Redirecting.");
            } else {
                history.push("/profile-setup"); // Redirect to profile setup for other roles
                toast.success("Registration successful! Please complete your profile.");
            }
        }
    }, [currentUser, history]);

    const dispatch = useDispatch();

    const { email, password, displayName, passwordConfirm, role } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm || !email || !password || !displayName || !role || !captchaToken) {
            toast.error("Please fill in all fields correctly and complete the captcha");
            return;
        }
        dispatch(registerInitiate(email, password, displayName, role));
        setState({ email: "", displayName: "", password: "", passwordConfirm: "", role: "" });
        toast.success("Registration initiated");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    }


    return (
        <div>
            <ToastContainer position="bottom-right" />
            <div id="register-form">
                <form className='form-signup' onSubmit={handleSubmit}>
                    <h1 className='h3 mb-3 font-weight-normal' style={{ textAlign: "center" }}>Sign Up</h1>

                    <input type="text"
                        id='displayName'
                        className='form-control'
                        name='displayName'
                        placeholder='Full Name'
                        onChange={handleChange}
                        value={displayName}
                        required />

                    <input type="email"
                        id='user-email'
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

                    <input type="password"
                        id='inputRePassword'
                        className='form-control'
                        name='passwordConfirm'
                        placeholder='Repeat Password'
                        onChange={handleChange}
                        value={passwordConfirm}
                        required />

                    <select name="role" value={role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        <option value="Candidate">Candidate</option>
                        <option value="Admin">Admin</option>
                        <option value="Instructor">Instructor</option>
                    </select>
                        
                    <HCaptcha
                        sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY}
                        onVerify={handleCaptchaChange}
                    />
                    <button className='btn btn-primary mx-auto ' type='submit' >
                        <i className='fas fa-user-plus'></i> Sign Up</button>
                    <Link to="/login">
                        <i className="fas fa-angle-left"></i> Back
                    </Link>
                </form>
                <br />
            </div>
        </div>
    );
};

export default Register;