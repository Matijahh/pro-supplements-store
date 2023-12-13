import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../../slices/ordersApiSlice";
import { clearCartItems } from "../../slices/cartSlice";

import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../../components/message/message";
import Loader from "../../components/loader/loader";
import CheckoutSteps from "../../components/checkoutSteps/checkoutSteps";

import "./placeOrderScreen.css";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems);
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  return (
    <div className="screen">
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup className="card-style order-card-wrap">
            <ListGroup.Item className="list-item">
              <h2 className="title-style">Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className="list-item">
              <h2 className="title-style">Payment Method</h2>

              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item className="list-item">
              <h2 className="title-style">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems?.map((item, index) => (
                    <ListGroup.Item key={index} className="list-item">
                      <Row style={{ alignItems: "center" }}>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            className="link"
                            to={`/products/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} RSD ={" "}
                          {item.qty * item.price} RSD
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="card-style order-card-wrap">
            <ListGroup variant="flush">
              <ListGroup.Item className="list-item">
                <h2 className="title-style">Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className="list-item">
                <Row>
                  <Col>Items: </Col>
                  <Col>{cart.itemsPrice} RSD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="list-item">
                <Row>
                  <Col>Shipping: </Col>
                  <Col>{cart.shippingPrice} RSD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="list-item">
                <Row>
                  <Col>Tax: </Col>
                  <Col>{cart.taxPrice} RSD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="list-item">
                <Row>
                  <Col>Total: </Col>
                  <Col>{cart.totalPrice} RSD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="list-item">
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item className="list-item">
                <Button
                  type="button"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                  className="btn block card-button-style"
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
