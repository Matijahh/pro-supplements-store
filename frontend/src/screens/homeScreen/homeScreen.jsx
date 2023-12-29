import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

import { Row, Col } from "react-bootstrap";
import Product from "../../components/product/product";
import Loader from "../../components/loader/loader";
import Message from "../../components/message/message";
import Paginate from "../../components/paginate/paginate";

const HomeScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ pageNumber });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <div className="screen">
          <h1 className="title-style">Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </div>
      )}
    </>
  );
};

export default HomeScreen;
