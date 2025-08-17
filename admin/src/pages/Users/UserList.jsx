import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { listUsers } from "../../Redux/Actions/UserActions";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";

const StyledUserList = styled.div`
   overflow: auto;

   h2 {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 1rem;
   }

   table {
      width: 1105px;
      min-width: 1105px;
      margin-right: 1rem;
      margin-bottom: 1rem;
      border: 1px solid #222;
      display: block;

      @media (min-width: ${(props) => props.theme.responsive.xl}) {
         width: 1200px;
         min-width: 1200px;
      }

      * {
         display: block;
      }

      ul {
         padding: 0;
         margin: 0;

         li {
            margin-bottom: 0.25rem;

            &:last-child {
               margin-bottom: 0;
            }
         }
      }

      thead {
         border-bottom: 1px solid #222;
         background-color: #eee;
      }

      tbody {
         tr {
            td:first-child {
               font-weight: 600;
            }
         }
      }

      tr {
         display: grid;
         text-align: left;
         border-bottom: 1px solid #222;

         grid-template-columns:
            minmax(250px, 20%) minmax(300px, 25%)
            minmax(200px, 20%) minmax(250px, 20%) minmax(95px, 15%);

         @media (min-width: ${(props) => props.theme.responsive.xl}) {
            grid-template-columns:
               minmax(250px, 20%) minmax(300px, 25%)
               minmax(250px, 20%) minmax(250px, 20%) minmax(95px, 15%);
         }

         &:last-child {
            border: none;
         }
      }

      td,
      th {
         border-right: 1px solid #222;
         padding: 0.5rem;
         display: flex;
         align-items: center;

         &:last-child {
            border: none;
         }
      }
   }
`;

const UserList = () => {
   const dispatch = useDispatch();

   const userList = useSelector((state) => state.userList);
   const { error, loading, users } = userList;

   useEffect(() => {
      dispatch(listUsers());
   }, [dispatch]);

   return (
      <>
         {error && <Message variant="error" context={error} />}
         {loading ? (
            <Loading />
         ) : (
            <StyledUserList>
               <h2>Lista użytkowników:</h2>
               <table>
                  <thead>
                     <tr>
                        <th>
                           <span>ID</span>
                        </th>
                        <th>
                           <span>Dane</span>
                        </th>
                        <th>
                           <span>Opcje</span>
                        </th>
                        <th>
                           <span>Data dołączenia</span>
                        </th>
                        <th>
                           <span>Zamówienia</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {users?.map((item) => (
                        <tr key={item._id}>
                           <td>{item._id}</td>
                           <td>
                              <ul>
                                 <li>Imię: {item.name}</li>
                                 <li>E-mail: {item.email}</li>
                              </ul>
                           </td>
                           <td>
                              <ul>
                                 <li>Admin: {item.isAdmin.toString()}</li>
                                 <li>
                                    Konto firmowe: {item.isCompany.toString()}
                                 </li>
                                 <li>
                                    Akceptuje regulamin:{" "}
                                    {item.acceptRegulations.toString()}
                                 </li>
                              </ul>
                           </td>
                           <td>{item.createdAt}</td>
                           <td>0</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </StyledUserList>
         )}
      </>
   );
};

export default UserList;
