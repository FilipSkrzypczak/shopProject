import styled from "styled-components";

const Button = styled.button`
   background-color: ${(props) => props.theme.colors.second};
   color: #fff;
   font-weight: 500;
   padding: 0.8rem 1.5rem;
`;

export default Button;
