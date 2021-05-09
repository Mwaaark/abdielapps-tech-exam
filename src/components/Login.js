import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { signInWithGoogle, auth } from "../firebase/firebase.utils";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function googleSigninHandler() {
    try {
      await signInWithGoogle();
      history.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
      history.replace("/dashboard");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {});
    return unsubscribe;
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button className="w-100 mt-3" variant="primary" type="submit">
              Log In
            </Button>
            <Button
              disabled={loading}
              className="w-100 mt-3"
              variant="outline-primary"
              onClick={googleSigninHandler}
            >
              Sign In with Google
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
