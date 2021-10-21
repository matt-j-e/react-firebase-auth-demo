import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import firebase from "firebase/app";
import Alert from "./Alert";

const Register = () => {
  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  const initialState = {
    fields: {
      email: "",
      password: "",
      passwordRepeat: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fields.password === fields.passwordRepeat) {
      firebase.auth().createUserWithEmailAndPassword(fields.email, fields.password)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential.user);
        setUser(userCredential.user);
        
        history.push("/secret/" + userCredential.user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setAlert({
          message: "A server error occurred. Please try again.",
        });
      });


      // CODE BELOW TO ADD WHEN BACKEND BUILT
      //   .then((response) => {
      //     if (response.status === 201) {
      //       setAlert({
      //         message: "Your account is created and you are logged in",
      //         isSuccess: true,
      //       });
      //       history.push("/secret/" + userCredential.user.uid);
      //     } else {
      //       setAlert({
      //         message: "A server error occurred. Please try again.",
      //       });
      //       const failedReg = firebase.auth().currentUser;
      //       failedReg.delete();
      //     }
      //   })
      // })
      // .catch((error) => {
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   console.log(errorCode, errorMessage);
      //   setAlert({
      //     message: errorMessage,
      //   })
      // });
    } else {
      setAlert({
        message: "The two passwords didn't match. Please try again."
      })
    }
  };

  return (
    <div className="register">
      <section>
      <article>
      <h2>Create an account</h2>
      <Alert message={alert.message} />
      <form onSubmit={handleSubmit} className="register-form" action="" method="post">
        
        <label htmlFor="email">Email address</label>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </div>
        
        <label htmlFor="password">Password</label>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </div>
        
        <label htmlFor="passwordRepeat">Repeat password</label>
        <div>
          <input
            type="password"
            name="passwordRepeat"
            id="passwordRepeat"
            placeholder="Repeat password"
            value={fields.passwordRepeat}
            onChange={handleFieldChange}
          />
        </div>
        
        <div>
          <input type="submit" value="Sign Up" />
        </div>

        <div className="account-already">
          <p>Already have an account?</p><Link to="/login">Sign in</Link>
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

export default Register;