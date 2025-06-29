import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,

} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    //create user with email and password
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //signin user
  const signin = (email, password) => {
    setLoading(true);
    //sign in with email and password
    return signInWithEmailAndPassword(auth, email, password);
  };
  //sign in with google

  const googleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }

  //logut user
  const logout = () => {
    setLoading(true);
    //sign out user
    return signOut(auth);
  };

  
  //  }
  //next
  useEffect(() => {
    const unsubscribe = onAuthStateChanged( auth, currentUser => {
      setUser(currentUser);
      console.log('Current User:', currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const authInfo = {
    user,
    createUser,
    signin,
    loading,
    logout,
    googleSignin,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
