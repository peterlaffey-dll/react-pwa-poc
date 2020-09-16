import React from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './Header';
import CreditAppList from './CreditAppList';
import CreditAppCreate from './CreditAppCreate';
import history from '../history';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <Router history={history}>
        <div>
          <Header />
          <main>
            <Route path="/" exact component={CreditAppCreate} />
            <Route path="/credit-app/new" exact component={CreditAppList} />
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;
