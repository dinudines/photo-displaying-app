/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
import React from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import Error404 from './pages/404';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/login' component={LoginPage} />
      <Route component={Error404}/>
    </Switch>
  </BrowserRouter>
);

export default App;
