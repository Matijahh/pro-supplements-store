import React from "react";
import { useSelector } from "react-redux";

import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

import logo from "../../assets/logo.png";
import "./header.css";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log("Cart Items", cartItems);

  return (
    <header>
      <Navbar
        className="navbar-wrapper"
        variant="dark"
        expand="md"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="navbar-brand-wrapper">
              <img src={logo} alt="Pro Supplements" />
              PRO SUPPLEMENTS
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: 5 }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
