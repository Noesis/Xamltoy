import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Player from './Player'

class Index extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Router basename={process.env.PUBLIC_URL + "/"}>
          <Switch>
            <Route exact path="/">
              <Player />
            </Route>
            <Route exact path="/:hash">
              <Player />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }

}

export default Index