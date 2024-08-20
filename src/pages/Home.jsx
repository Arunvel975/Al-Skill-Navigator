import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutInitiate } from '../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && !currentUser.emailVerified) {
      toast.warn(
        <div>
          Please verify your email. <Link to="/verify-email">Click here to verify</Link>
        </div>
      );
    }
  }, [currentUser]);

  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <h2 style={{ textAlign: "center", fontWeight: "bold", marginTop: "30px" }}>
        Welcome to our Homepage
      </h2>
      <br />
      <button
        className='btn btn-danger'
        onClick={handleAuth}
        style={{
          textAlign: "center",
          display: "flex",
          margin: "0 auto"
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;