import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GoodDay from './screens/GoodDay';
import CheckIn from './screens/CheckIn';
import COVIDCheck from './screens/COVIDCheck';
import COVIDTestDate from './screens/COVIDTestDate';
import SymptomsScreen from './screens/SymptomsScreen';
import WFHConf from './screens/WFHConf';
import Admin from './screens/Admin';
import Header from './common/Header';
import Footer from './common/Footer';
import styled from 'styled-components';

const BaseContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  min-height: 100vh;
`;

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
          <Route path="/wfh-conf">
            <WFHConf />
          </Route>
          <Route path="/admin">
            <Admin />
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
