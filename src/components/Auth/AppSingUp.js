import { Container } from "react-bootstrap";
import React from "react";
import SignUp from "../NavbarComponents/pages/SignUp";

export default function AppSingUp() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center "
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <SignUp />
      </div>
    </Container>
  );
}
