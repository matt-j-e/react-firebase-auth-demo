import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useState } from "react";
import firebase from 'firebase/app';
import firebaseConfig from '../config/firebase';
import '../styles/App.css';
import Login from "./Login";
import Register from "./Register";
import Secret from "./Secret";
import Nav from "./Nav";

firebase.initializeApp(firebaseConfig);

function App() {

  const [user, setUser] = useState(null);

  return (
    <Router>
      <AuthContext.Provider value={{ user, setUser }}>
        <Nav />
        <Switch>
          <Route exact path="/">
            <h1>Open route</h1>
          </Route>
          <Route path="/secret">
            <Secret />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
