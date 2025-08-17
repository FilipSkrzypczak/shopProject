import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Section from "../../shared/Section";
import Wrapper from "../../shared/Wrapper";

const StyledDiv = styled.div`
   ${(props) => props.theme.filled}
   padding:2rem;

   h2 {
      margin-bottom: 2rem;
   }

   @media (max-width: 549px) {
      padding: 1.5rem;
      ol {
         padding-left: 1rem;
      }
   }

   ul {
      list-style: none;
      margin: 0;
      padding-left: 1rem;
   }

   li {
      margin-bottom: 1rem;
   }
`;

const Policy = () => {
   return (
      <Section>
         <Wrapper>
            <StyledDiv>
               <h2>Polityka prywatności</h2>
               <p>
                  <b>Polityka prywatności serwisu www.fskrzypczak.site </b>
               </p>
               {/* <ol>
                  <li>
                     Informacje ogólne Niniejsza Polityka Prywatności określa
                     zasady przetwarzania i ochrony danych osobowych
                     przekazanych przez Użytkowników w związku z korzystaniem
                     przez nich usług sklepu internetowego poprzez Serwis.
                  </li>
                  <li>
                     Administratorem danych osobowych zawartych w serwisie jest
                     Bandit Fura Szymon Waszak z siedzibą w Poznaniu NIP:
                     9721325257 REGON: 521384046
                  </li>
                  <li>
                     W trosce o bezpieczeństwo powierzonych nam danych
                     opracowaliśmy wewnętrzne procedury i zalecenia, które mają
                     zapobiec udostępnieniu danych osobom nieupoważnionym.
                     Kontrolujemy ich wykonywanie i stale sprawdzamy ich
                     zgodność z odpowiednimi aktami prawnymi - ustawą o ochronie
                     danych osobowych, ustawą o świadczeniu usług drogą
                     elektroniczną, a także wszelkiego rodzaju aktach
                     wykonawczych i aktach prawa wspólnotowego.
                  </li>
                  <li>
                     Dane Osobowe przetwarzane są na podstawie zgody wyrażanej
                     przez Użytkownika oraz w przypadkach, w których przepisy
                     prawa upoważniają Administratora do przetwarzania danych
                     osobowych na podstawie przepisów prawa lub w celu
                     realizacji zawartej pomiędzy stronami umowy.
                  </li>
                  <li>
                     Serwis realizuje funkcje pozyskiwania informacji o
                     użytkownikach i ich zachowaniach w następujący sposób:
                  </li>
                  <ul>
                     <li>
                        a) poprzez dobrowolnie wprowadzone w formularzach
                        informacje
                     </li>
                     <li>
                        b) poprzez gromadzenie plików “cookies” [patrz polityka
                        plików “cookies”].
                     </li>
                  </ul>
                  <li>
                     Serwis zbiera informacje dobrowolnie podane przez
                     użytkownika.
                  </li>
                  <li>
                     dane podane w formularzu są przetwarzane w celu wynikającym
                     z funkcji konkretnego formularza np. w celu dokonania
                     procesu obsługi kontaktu informacyjnego
                  </li>
                  <li>
                     Dane osobowe pozostawione w serwisie nie zostaną sprzedane
                     ani udostępnione osobom trzecim, zgodnie z przepisami
                     Ustawy o ochronie danych osobowych.
                  </li>
                  <li>
                     Do danych zawartych w formularzu przysługuje wgląd osobie
                     fizycznej, która je tam umieściła. Osoba ta ma również praw
                     do modyfikacji i zaprzestania przetwarzania swoich danych w
                     dowolnym momencie.
                  </li>
                  <li>
                     Zastrzegamy sobie prawo do zmiany w polityce ochrony
                     prywatności serwisu, na które może wpłynąć rozwój
                     technologii internetowej, ewentualne zmiany prawa w
                     zakresie ochrony danych osobowych oraz rozwój naszego
                     serwisu internetowego. O wszelkich zmianach będziemy
                     informować w sposób widoczny i zrozumiały.
                  </li>
                  <li>
                     W Serwisie mogą pojawiać się linki do innych stron
                     internetowych. Takie strony internetowe działają
                     niezależnie od Serwisu i nie są w żaden sposób nadzorowane
                     przez serwis banditfura.pl dane te mogą posiadać własne
                     polityki dotyczące prywatności oraz regulaminy, z którymi
                     zalecamy się zapoznać. W razie wątpliwości co
                     któregokolwiek z zapisów niniejszej polityki prywatności
                     jesteśmy do dyspozycji - nasze dane znaleźć można w
                     zakładce - <Link to="/contact">KONTAKT</Link>.
                  </li>
               </ol> */}
            </StyledDiv>
         </Wrapper>
      </Section>
   );
};

export default Policy;
