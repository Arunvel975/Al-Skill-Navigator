import * as  types from "./actionTypes"
import {auth,googleAuthProvider, githubAuthProvider} from "../firebase"
import {firestore} from "../firebase"

const registerStart = () =>({
    type:types.REGISTER_START,
})

const registerSuccess = (user) =>({
    type:types.REGISTER_SUCCESS,
    payload:user,
})

const registerFail = (error) =>({
    type:types.REGISTER_FAIL,
    payload:error,
})


const loginStart = () =>({
    type:types.LOGIN_START,
})

const loginSuccess = (user) =>({
    type:types.LOGIN_SUCCESS,
    payload:user,
})

const loginFail = (error) =>({
    type:types.LOGIN_FAIL,
    payload:error,
})

const googleSignInStart = () =>({
    type:types.GOOGLE_SIGN_IN_START,
})

const googleSignInSuccess = (user) =>({
    type:types.GOOGLE_SIGN_IN_SUCCESS,
    payload:user,
})

const googleSignInFail = (error) =>({
    type:types.GOOGLE_SIGN_IN_FAIL,
    payload:error,
})


const logoutStart = () =>({
    type:types.LOGOUT_START,
})

const logoutSuccess = () =>({
    type:types.LOGOUT_SUCCESS,
})

const logoutFail = (error) =>({
    type:types.LOGOUT_FAIL,
    payload:error,
})

export const setUser = (user) =>({
    type:types.SET_USER,
    payload:user,
})

const githubSignInStart = () =>({
    type:types.GITHUB_SIGN_IN_START,
})

const githubSignInSuccess = (user) =>({
    type:types.GITHUB_SIGN_IN_SUCCESS,
    payload:user,
})

const githubSignInFail = (error) =>({
    type:types.GITHUB_SIGN_IN_FAIL,
    payload:error,
})


export const registerInitiate = (email, password, displayName, role) => {
    return function (dispatch) {
        dispatch(registerStart());
        auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
            user.sendEmailVerification();
            firestore.collection('users').doc(user.uid).set({
                displayName,
                email,
                role,
                profile: {}
            });
            dispatch(registerSuccess(user));
        })
        .catch((error) => dispatch(registerFail(error.message)));
    }
}

export const loginInitiate = (email, password) => {
    return function (dispatch) {
        dispatch(loginStart());
        auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
            if (user.emailVerified) {
                dispatch(loginSuccess(user));
            } else {
                dispatch(loginSuccess(user));
                alert("Please verify your email before logging in.");
            }
        })
        .catch((error) => dispatch(loginFail(error.message)));
    }
}

export const logoutInitiate = ()=>{
    return function (dispatch){
        dispatch(logoutStart());
        auth
        .signOut()
        .then((resp)=>dispatch(logoutSuccess()))
        .catch((error)=>dispatch(logoutFail(error.message)));
    }
}


export const googleSignInInitiate = () => {
    return async (dispatch) => {
        dispatch(googleSignInStart());
        try {
            const { user } = await auth.signInWithPopup(googleAuthProvider);
            const userDoc = await firestore.collection('users').doc(user.uid).get();
            let isNewUser = false;
            if (!userDoc.exists) {
                await firestore.collection('users').doc(user.uid).set({
                    displayName: user.displayName,
                    email: user.email,
                    role: 'Candidate',
                    profile: {}
                });
                isNewUser = true;
            }
            dispatch(googleSignInSuccess(user));
            return isNewUser;
        } catch (error) {
            dispatch(googleSignInFail(error.message));
            return false;
        }
    };
};

export const githubSignInInitiate = () => {
    return async (dispatch) => {
        dispatch(githubSignInStart());
        try {
            const { user } = await auth.signInWithPopup(githubAuthProvider);
            const userDoc = await firestore.collection('users').doc(user.uid).get();
            let isNewUser = false;
            if (!userDoc.exists) {
                await firestore.collection('users').doc(user.uid).set({
                    displayName: user.displayName,
                    email: user.email,
                    role: 'Candidate',
                    profile: {}
                });
                isNewUser = true;
            }
            dispatch(githubSignInSuccess(user));
            return isNewUser;
        } catch (error) {
            dispatch(githubSignInFail(error.message));
            return false;
        }
    };
};
