import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Issues from './components/Issues/Issues'

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
          <Switch>
              <Route path="/" exact component={Issues}/>
          </Switch>
      </div>
    );
  }
}

export default App;