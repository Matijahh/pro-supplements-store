import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
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
import OrderScreen from "./screens/orderScreen/orderScreen";
import AdminRoute from "./components/adminRoute/adminRoute";
import ProfileScreen from "./screens/profileScreen/profileScreen";
import OrderListScreen from "./screens/admin/orderListScreen/orderListScreen";
import ProductListScreen from "./screens/admin/productListScreen/productListScreen";
import ProductEditScreen from "./screens/admin/productEditScreen/productEditScreen";
import UserListScreen from "./screens/admin/userListScreen/userListScreen";
import UserEditScreen from "./screens/admin/userEditScreen/userEditScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      <Route path="/search/:keyword" element={<HomeScreen />}></Route>
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      ></Route>
      <Route path="/page/:pageNumber" element={<HomeScreen />}></Route>
      <Route path="/product/:id" element={<ProductScreen />}></Route>
      <Route path="/cart" element={<CartScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />}></Route>
        <Route path="/payment" element={<PaymentScreen />}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
        <Route path="/order/:id" element={<OrderScreen />}></Route>
        <Route path="/profile" element={<ProfileScreen />}></Route>
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />}></Route>
        <Route
          path="/admin/productlist"
          element={<ProductListScreen />}
        ></Route>
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListScreen />}
        ></Route>
        <Route
          path="/admin/product/:id/edit"
          element={<ProductEditScreen />}
        ></Route>
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />}></Route>
        <Route path="/admin/userlist" element={<UserListScreen />}></Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
