import React , { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import firebase from "firebase/app";

const Nav = () => {

  const { user, setUser } = useContext(AuthContext);

  firebase.auth().onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      setUser(firebaseUser);
    }
  });

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      console.log("Signed out")
      setUser(null);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <ul>
      {!user ? (
        <>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        </>
      ) : (
        <>
        <li>User: <strong>{user.email}</strong></li>
        <li><button type="button" onClick={handleLogout}>Sign Out</button></li>
        </>
      )}
    </ul>
  )

}

export default Nav;