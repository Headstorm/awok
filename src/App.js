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
          <Route path="/check-in">
            <CheckIn />
          </Route>
          <Route path="/covid-check">
            <COVIDCheck />
          </Route>
          <Route path="/covid-test-date">
            <COVIDTestDate />
          </Route>
          <Route path="/good-day">
            <GoodDay />
          </Route>
          <Route path="/symptoms-screen">
            <SymptomsScreen />
          </Route>
          <Route path="/safety-rejection">
            <WFHConf />
          </Route>
          <Route path="/covid-positive">
            <WFHConf />
          </Route>
          <Route path="/wfh-conf">
            <WFHConf />
          </Route>
          <Route path="/reservation">
            <Reservation />
          </Route>
          <Route path="/admin">
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
