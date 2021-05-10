import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router";

import { auth } from "../firebase/firebase.utils";

export default function Dashboard({ currentUser }) {
  const history = useHistory();

  function logoutHandler() {
    auth.signOut();

    history.replace("/login");
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Welcome to Dashboard</h2>
          <p className="text-center">
            Email: {currentUser && currentUser.email}
          </p>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={logoutHandler}>
          Log Out
        </Button>
      </div>
    </>
  );
}
