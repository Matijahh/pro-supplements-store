import React from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import "./assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3 font-color">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
