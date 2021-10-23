import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from "firebase/app";
import getData from "../requests/getData";
import { useHistory } from "react-router";


const Secret = () => {

  const history = useHistory();
  const { setUser } = useContext(AuthContext);
  const [ token, setToken ] = useState("");
  const [ quotes, setQuotes ] = useState([]);

  firebase.auth().onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      setUser(firebaseUser);
      firebaseUser.getIdToken().then(token => {
        setToken(token);
        console.log("JWT:", token);
      })
    } else {
      history.push("/login");
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
    <section>
      {quotes.length > 0 
      ? 
      quotes.map(quote => {
        return (<article key={quote.id}>
          <p><strong>{quote.name}</strong></p>
          <p>{quote.quote}</p>
        </article>)
      }) 
      : "You need to login before you see anything here."}
    </section>
  )

}

export default Secret;