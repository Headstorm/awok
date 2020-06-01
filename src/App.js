import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './screens/Home';
import ThankYou from './screens/ThankYou';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/thank-you">
          <ThankYou />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
