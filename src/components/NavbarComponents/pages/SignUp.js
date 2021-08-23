import React, { useContext, useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Не удалось создать новый аккаунт");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2
            style={{ textAlign: "center", marginBottom: "10px" }}
            className="text-center mb-4"
          >
            Sign Up
          </h2>
          {/* {currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Уже есть аккаунт? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
