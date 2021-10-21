import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from "firebase/app";
import getData from "../requests/getData";
import { useHistory } from "react-router";


const Secret = () => {

  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);
  const [ token, setToken ] = useState("");
  const [ quotes, setQuotes ] = useState([]);

  firebase.auth().onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      setUser(firebaseUser);
      firebaseUser.getIdToken().then(token => {
        setToken(token);
        // console.log(token);
      })
    } else {
      // history.push("/login");
    }
  });

  useEffect(() => {
    if (token) {
      getData(token).then(response => {
        // console.log(response.data);
        setQuotes(response.data);
      });
    }
  }, [token]);

  return (
    <h1>
      {user 
      ? "Content for logged-in users only" 
      : "You need to login before you see anything here."}
    </h1>
  )

}

export default Secret;