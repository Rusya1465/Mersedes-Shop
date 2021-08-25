import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Card, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import logo from "../../images/logo.svg";
import logo2 from "../../images/brand-without-claim.svg";
import ModalAdd from "../CRUD/ModalAdd";
import { useAuth } from "../contexts/AuthContext";
import { Nav, NavDropdown } from "react-bootstrap";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const [checkAdmin, setCheckAdmin] = useState(false);
  useEffect(() => {
    currentUser && currentUser.email === "rustam@gmail.com"
      ? setCheckAdmin(true)
      : setCheckAdmin(false);
  }, []);

  const [error, setError] = useState("");
  const history = useHistory();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Ошибка при попытке выхода");
    }
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <div className="logo-block">
            {" "}
            <img src={logo} />
            <img src={logo2} className="logo2_responce" />
          </div>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Главная
            </Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Nav>
              <NavDropdown className="dropdown_button" title="Меню">
                <NavDropdown.Item>
                  <Link className="favourite_link" to="/favourite">
                    Избранные товары
                  </Link>
                </NavDropdown.Item>

                {checkAdmin ? (
                  <>
                    <NavDropdown.Item>
                      <ModalAdd className="modalAdd" />
                    </NavDropdown.Item>
                  </>
                ) : null}
              </NavDropdown>
            </Nav>
          </li>
          <li className="nav-item">
            <Link
              to="/products"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Автомобили
            </Link>
          </li>

          <li className="nav-item">
            <Nav>
              <NavDropdown className="dropdown_button" title="Аккаунт">
                {currentUser ? (
                  <>
                    <Card>
                      <Card.Body>
                        <h2 className="text-center mb-4">Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <strong>Email:{currentUser.email}</strong>
                      </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                      <Button variant="link" onClick={handleLogout}>
                        Log Out
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Link to="/sign-up">Sign up</Link>
                    </div>
                    <div>
                      <Link to="/login">Login</Link>
                    </div>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
