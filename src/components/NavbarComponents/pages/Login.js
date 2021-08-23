import React, { useContext, useRef, useState } from "react";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Не удалось войти в аккаунт");
    }
    setLoading(false);
  }
  return (
    <>
      <Container
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2
                style={{ textAlign: "center", marginBottom: "10px" }}
                className="text-center mb-4"
              >
                Log In
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
                  Log In
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Хочешь создать аккаунт? <Link to="/sign-up">Sign Up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
