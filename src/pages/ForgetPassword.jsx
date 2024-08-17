import React, { useState } from 'react';
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/assets/css/ForgetPassword.css';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await auth.sendPasswordResetEmail(email);
            toast.success('Password reset email sent! Check your inbox.');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <ToastContainer position="bottom-right" />
            <h1>Forget Password</h1>
            <form id="forget-password" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Password Reset Email</button>
                <br />
                <Link to="/login" className="back-link">
                    <i className="fas fa-angle-left"></i> Back
                </Link>
            </form>
        </div>
    );
};

export default ForgetPassword;