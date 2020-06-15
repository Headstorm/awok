import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import GoodDay from './screens/GoodDay';
import CheckIn from './screens/CheckIn';
import COVIDCheck from './screens/COVIDCheck';
import COVIDTestDate from './screens/COVIDTestDate';
import SymptomsScreen from './screens/SymptomsScreen';
import WFHConf from './screens/WFHConf';
import Reservation from './screens/Reservation';
import Header from './common/Header';
import Footer from './common/Footer';
import styled from 'styled-components';
import ViewReservation from './screens/ViewReservations';
import { PATHS } from './common/constants';


const BaseContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  min-height: 100vh;
  @media (max-width: 425px) {	
    min-height: ${window.innerHeight}px;	
  }
`;

const Admin = lazy(() => import('./screens/Admin'));

function App() {
  return (
    <Router>
      <BaseContainer>
        <Header />
        <Switch>
          <Route path={PATHS.CHECK_IN}>
            {React.lazy(() => import('./CheckIn')}
          </Route>
          <Route path={PATHS.COVID_CHECK}>
            <COVIDCheck />
          </Route>
          <Route path={PATHS.COVID_TEST_DATE}>
            <COVIDTestDate />
          </Route>
          <Route path={PATHS.GOOD_DAY}>
            <GoodDay />
          </Route>
          <Route path={PATHS.SYMPTOMS_SCREEN}>
            <SymptomsScreen />
          </Route>
          <Route path={PATHS.SAFETY_REJECTION}>
            <WFHConf />
          </Route>
          <Route path={PATHS.COVID_POSITIVE}>
         <WFHConf />
          </Route>
          <Route path={PATHS.WFH_CONFIRM}>
            <WFHConf />
          </Route>
          <Route path={PATHS.RESERVATION}>
            <Reservation />
          </Route>
          <Route path={PATHS.VIEW_RESERVATIONS}>
            <ViewReservation/>
          </Route>
          <Route path={PATHS.ADMIN}>
            <Suspense fallback={<div>Loading</div>}>
              <Admin />
            </Suspense>
          </Route>
          <Route path="/">
            <CheckIn />
          </Route>
        </Switch>
        <Footer />
      </BaseContainer>
    </Router>
  );
}

export default App;
