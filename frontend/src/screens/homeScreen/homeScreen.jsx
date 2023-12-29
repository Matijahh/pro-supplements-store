import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

import { Row, Col } from "react-bootstrap";
import Product from "../../components/product/product";
import Loader from "../../components/loader/loader";
import Message from "../../components/message/message";
import Paginate from "../../components/paginate/paginate";
import SearchBox from "../../components/searchBox/searchBox";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {keyword && (
        <Link to="/" className="regular-button-style btn mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <div className="screen">
          <div className="products-search-wrapper">
            <h1 className="title-style">Latest Products</h1>
            <SearchBox />
          </div>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      )}
    </>
  );
};

export default HomeScreen;
