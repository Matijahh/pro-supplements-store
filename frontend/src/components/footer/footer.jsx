import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <Container>
        <Row className="text-center d-flex align-self-center py-3">
          <Col>
            <p className="m-0 text-white">
              Pro Supplements &copy; {currentYear}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
