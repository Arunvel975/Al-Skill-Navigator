import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setUser(auth.currentUser);
        }
    }, [currentUser]);

    const resendVerificationEmail = () => {
        if (user) {
            user.sendEmailVerification().then(() => {
                toast.success("Verification email sent!");
            }).catch((error) => {
                toast.error(error.message);
            });
        }
    };

    const logout = () => {
        auth.signOut().then(() => {
            toast.success("Logged out successfully!");
        }).catch((error) => {
            toast.error(error.message);
        });
    };

    return (
        <div>
            <ToastContainer position="bottom-right" />
            <h1>Please verify your email</h1>
            <p>A verification email has been sent to your email address. Please check your inbox and verify your email.</p>
            <button onClick={resendVerificationEmail}>Resend Verification Email</button>
            <button onClick={logout}>Logout</button>
            <br />
            <Link to="/login">
                <i className="fas fa-angle-left"></i> Back
            </Link>
        </div>
    );
};

export default VerifyEmail;