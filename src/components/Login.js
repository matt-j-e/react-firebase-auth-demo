import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import firebase from "firebase/app";
import Alert from "./Alert";

const Login = () => {

  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  const initialState = {
    fields: {
      email: "",
      password: ""
    },
    alert: {
      message: "",
      isSuccess: false,
    }
  };

  const [fields, setFields] = useState(initialState.fields);
  const [alert, setAlert] = useState(initialState.alert);

  const handleFieldChange = (event) => {
    setFields((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(fields.email, fields.password)
      .then((userCredential) => {
        // Signed in
        // console.log(userCredential);
        setUser(userCredential.user);
        history.push("/secret");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/user-not-found") {
          setAlert({
            message: "We don't have an account with that email address.",
          })
        } else {
          setAlert({
            message: "Password not recognised.",
          })
        }
      });
  };

  return (
    <div className="login">
      <section>
        <article>
          <h2>Sign into your account</h2>
          <Alert message={alert.message} />
          <form onSubmit={handleLogin} className="login-form" action="" method="post">
            
            <label htmlFor="email">Email address</label>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  size="50"
                  placeholder="Email address"
                  value={fields.email}
                  autoFocus
                  onChange={handleFieldChange}
                />
              </div>

              <label htmlFor="password">Password</label>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  size="50"
                  placeholder="Password"
                  value={fields.password}
                  onChange={handleFieldChange}
                />
              </div>
              
              <div>
              <input type="submit" value="Sign in" />
              </div>

              <div className="account-already">
                <p>Don't have an account?</p><Link to="/register">Sign up</Link>
              </div>
              <div className="continue-as-guest">
                <p><Link to="/">Continue as a guest</Link></p>
              </div>
          </form>
        </article>
      </section>
    </div>
  )

}

export default Login;