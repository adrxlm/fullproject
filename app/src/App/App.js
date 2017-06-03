import React from 'react';
import Menu from './Menu';
import AdminCategories from './AdminCategories';
import AdminBooks from './AdminBooks';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

const App = () => (
  <Router>
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/categories" />} />
        <Route path="/categories" component={AdminCategories} />
        <Route path="/books" component={AdminBooks} />
      </Switch>
    </div>
  </Router>
);

export default App;
