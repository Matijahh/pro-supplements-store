import React, { useState } from "react";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";

import { Link } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import Rating from "../../components/rating/rating";
import Loader from "../../components/loader/loader";
import Message from "../../components/message/message";

import "./productScreen.css";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <Link className="btn my-3 regular-button-style" to="/">
        <FaArrowLeft className="me-1" />
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup
              variant="flush"
              className="product-screen-card card-style"
            >
              <ListGroup.Item>
                <h3 className="title-style m-0 text-white">{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item className="description">
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card className="product-screen-card card-style">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col className="text-white">
                      <strong>{product.price} RSD</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col className="text-white">
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block card-button-style"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
