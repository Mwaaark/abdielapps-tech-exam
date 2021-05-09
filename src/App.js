import React, { Component } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Container } from "react-bootstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth } from "./firebase/firebase.utils";
import Dashboard from "./components/Dashboard";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </div>
      </Container>
    );
  }
}
