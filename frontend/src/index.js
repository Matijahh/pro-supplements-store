import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/homeScreen/homeScreen";
import ProductScreen from "./screens/productScreen/productScreen";
import CartScreen from "./screens/cartScreen/cartScreen";
import LoginScreen from "./screens/loginScreen/loginScreen";
import RegisterScreen from "./screens/registerScreen/registerScreen";
import PrivateRoute from "./components/privateRoute/privateRoute";
import ShippingScreen from "./screens/shippingScreen/shippingScreen";
import PaymentScreen from "./screens/paymentScreen/paymentScreen";
import PlaceOrderScreen from "./screens/placeOrderScreen/placeOrderScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      <Route path="/product/:id" element={<ProductScreen />}></Route>
      <Route path="/cart" element={<CartScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />}></Route>
        <Route path="/payment" element={<PaymentScreen />}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
