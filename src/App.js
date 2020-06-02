import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GoodDay from './screens/GoodDay';
import CheckIn from './screens/CheckIn';
import AlertsOptIn from './screens/AlertsOptIn';
import COVIDCheck from './screens/COVIDCheck';
import COVIDTestDate from './screens/COVIDTestDate';
import SafetyRejection from './screens/SafetyRejection';
import SymptomsScreen from './screens/SymptomsScreen';
import WFHConf from './screens/WFHConf';
import COVIDPostive from './screens/COVIDPostive';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/alerts">
          <AlertsOptIn />
        </Route>
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
        <Route path="/safety-rejection">
          <SafetyRejection />
        </Route>
        <Route path="/symptoms-screen">
          <SymptomsScreen />
        </Route>
        <Route path="/wfh-conf">
          <WFHConf />
        </Route>
        <Route path="/covid-positive">
          <COVIDPostive />
        </Route>
        <Route path="/">
          <CheckIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
