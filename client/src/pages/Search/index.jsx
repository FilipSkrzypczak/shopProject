import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Button from "../../shared/Button";
import Col from "../../shared/Col";
import Loading from "../../shared/Loading";
import Product from "../../shared/Product";
import Row from "../../shared/Row";
import Section from "../../shared/Section";
import Wrapper from "../../shared/Wrapper";

const StyledSearch = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;

  & + div {
    margin: 0 auto 10rem;
    text-align: center;
  }
`;

const Search = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(params.keyword, ""));
  }, [dispatch, params]);

  return (
    <Section>
      <Wrapper>
        <Row>
          {loading ? (
            <Loading />
          ) : products.length > 0 ? (
            products.map((p) => (
              <Col xsm="2" md="3" lg="4" key={p._id}>
                <Product item={p} />
              </Col>
            ))
          ) : (
            <Col>
              <StyledSearch>Nie znaleziono produktów</StyledSearch>
              <div>
                <Button>
                  <Link to="/">Powrót na stronę główną</Link>
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Wrapper>
    </Section>
  );
};

export default Search;
