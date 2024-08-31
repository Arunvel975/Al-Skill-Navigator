import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSetup from "./pages/ProfileSetup";
import UserRoute from './components/UserRoute';
import VerifyEmail from './pages/VerifyEmail';
import ForgetPassword from './pages/ForgetPassword';
import AdminHome from './pages/Home/AdminHome';
import InstructorHome from './pages/Home/InstructorHome';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth, firestore } from './firebase';
import { setUser } from './redux/actions';

const App = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userDoc = await firestore.collection('users').doc(authUser.uid).get();
        dispatch(setUser({ ...authUser, role: userDoc.data().role }));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  const getHomePage = () => {
    if (currentUser) {
      switch (currentUser.role) {
        case 'Admin':
          return <Redirect to="/admin-home" />;
        case 'Instructor':
          return <Redirect to="/instructor-home" />;
        case 'Candidate':
        default:
          return <Redirect to="/home" />;
      }
    }
    return <Redirect to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile-setup" component={ProfileSetup} />
          <Route path="/verify-email" component={VerifyEmail} />
          <Route path="/forget-password" component={ForgetPassword} />
          <UserRoute path="/home" component={Home} />
          <UserRoute path="/admin-home" component={AdminHome} />
          <UserRoute path="/instructor-home" component={InstructorHome} />
          <UserRoute path="/" component={getHomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;