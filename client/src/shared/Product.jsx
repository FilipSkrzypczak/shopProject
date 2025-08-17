import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Rating from "./Rating";

const StyledProduct = styled.div`
  text-align: center;
  margin: 0 auto;
  height: 100%;
  ${(props) => props.theme.filled}
  padding: 1rem;

  a {
    text-decoration: none !important;
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  &:hover {
    h2 {
      text-decoration: underline;
    }

    img {
      transform: scale(1.05);
    }
  }
`;

const Image = styled.img`
  margin-bottom: 1rem;
  max-height: 100px;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.3s;

  @media (min-width: ${(props) => props.theme.responsive.sm}) {
    max-height: 150px;
  }
`;

const Price = styled.div`
  font-size: 1.1rem;
  margin-top: 0.5rem;
  font-weight: 600;
`;

const Product = ({ item }) => {
  return (
    <StyledProduct>
      <Link to={`/products/${item._id}`}>
        <Image src={item.image} alt={item.name} />
        <h3 title={item.name}>{item.name}</h3>
        <Rating
          value={item.rating}
          text={
            item.reviews.length > 1
              ? item.reviews.length < 5
                ? item.reviews.length + " opinie"
                : item.reviews.length + " opinii"
              : item.reviews.length === 0
              ? item.reviews.length + " opinii"
              : item.reviews.length + " opinia"
          }
        />
        <Price>
          <span>
            {item.price} <small>zł</small>
          </span>
        </Price>
      </Link>
    </StyledProduct>
  );
};

export default Product;
