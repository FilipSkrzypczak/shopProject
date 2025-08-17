import styled from "styled-components";

const StyledForm = styled.div`
   ${(props) => props.theme.filled}
   padding: 1.5rem 1.5rem;
   max-width: 400px;
   margin-left: auto;
   margin-right: auto;
   border-top: 2px solid ${(props) => props.theme.colors.second};
   margin-bottom: 10rem;

   h2 {
      margin-bottom: 2rem;
      font-weight: 600;
   }

   form {
      label {
         display: block;
         margin-bottom: 1.5rem;
         position: relative;

         a {
            color: #ec0000;
         }

         input[type="checkbox"] {
            margin-right: 0.5rem;
         }

         input:not([type="checkbox"]) {
            width: 100%;
            border: 1px solid ${(props) => props.theme.colors.main};
            padding: 0.5rem;
            outline: none;

            &:focus + span {
               opacity: 1;
               top: -10px;
            }
         }

         span {
            display: block;
            font-size: small;
            position: absolute;
            top: 0px;
            left: 5px;
            opacity: 0;
            background-color: #fff;
            padding: 0 0.5rem;
            pointer-events: none;
            transition: all 0.3s;
         }
      }

      button {
         margin-bottom: 1rem;
      }
   }
`;

export default StyledForm;
