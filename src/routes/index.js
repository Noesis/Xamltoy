import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Player from './Player'
import Preview from './Preview'

class Index extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/">
              <Player />
            </Route>
            <Route exact path="/preview">
              <Preview showLink={false}/>
            </Route>
            <Route exact path="/preview-link">
              <Preview showLink={true}/>
            </Route>
            <Route exact path="/preview/:hash">
              <Preview showLink={false}/>
            </Route>
            <Route exact path="/preview-link/:hash">
              <Preview showLink={true}/>
            </Route>
            <Route exact path="/:hash">
              <Player/>
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }

}

export default Index