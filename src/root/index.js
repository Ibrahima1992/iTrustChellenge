import React, { Component } from 'react';

import App from './../app/App';

import {
  BrowserRouter as Router,
    Switch,Route
  } from 'react-router-dom';
  
class Root extends Component {

  render() {
    return (
      <Router>
          <Switch>
              <Route path="/" component={App} />
          </Switch>
      </Router>
    );
  }
}

export default Root;
