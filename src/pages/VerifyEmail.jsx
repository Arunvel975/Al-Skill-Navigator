import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';

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
                alert("Verification email sent!");
            }).catch((error) => {
                alert(error.message);
            });
        }
    };

    const logout = () => {
        auth.signOut().then(() => {
            alert("Logged out successfully!");
        }).catch((error) => {
            alert(error.message);
        });
    };

    return (
        <div>
            <h1>Please verify your email</h1>
            <p>A verification email has been sent to your email address. Please check your inbox and verify your email.</p>
            <button onClick={resendVerificationEmail}>Resend Verification Email</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default VerifyEmail;