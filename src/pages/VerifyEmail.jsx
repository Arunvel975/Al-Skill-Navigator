import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { logoutInitiate } from '../redux/actions';
import { useDispatch } from 'react-redux';
import '../components/assets/css/VerifyEmail.css'




const VerifyEmail = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();

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

    const handleAuth = () => {
        if (currentUser) {
          dispatch(logoutInitiate());
          toast.success("Logged out successfully!");
        }
      };
    
    return (
        <div>
            <ToastContainer position="bottom-right" />
            <h1>Please verify your email</h1>
            <p>A verification email has been sent to your email address. Please check your inbox and verify your email.</p>
            <button onClick={resendVerificationEmail}>Resend Verification Email</button>
            <button onClick={handleAuth}>Logout</button>
            <br />
            <Link to="/login">
                <i className="fas fa-angle-left"></i> Back
            </Link>
        </div>
    );
};

export default VerifyEmail;