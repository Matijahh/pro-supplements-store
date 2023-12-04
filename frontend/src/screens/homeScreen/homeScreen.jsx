import React from "react";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

import { Row, Col } from "react-bootstrap";
import Product from "../../components/product/product";
import Loader from "../../components/loader/loader";
import Message from "../../components/message/message";

const HomeScreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <h1 className="title-style">Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
