import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Player from './Player';
import RenderPreview from './RenderPreview';
import CodePreview from './CodePreview';

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
              <RenderPreview showLink={false}/>
            </Route>
            <Route exact path="/preview-link">
              <RenderPreview showLink={true}/>
            </Route>
            <Route exact path="/preview/:hash">
              <RenderPreview showLink={false}/>
            </Route>
            <Route exact path="/preview-link/:hash">
              <RenderPreview showLink={true}/>
            </Route>
            <Route exact path="/code">
              <CodePreview showLink={false}/>
            </Route>
            <Route exact path="/code/:hash">
              <CodePreview showLink={false}/>
            </Route>
            <Route exact path="/code-link">
              <CodePreview showLink={true}/>
            </Route>
            <Route exact path="/code-link/:hash">
              <CodePreview showLink={true}/>
            </Route>
            <Route exact path="/:hash">
              <Player/>
            </Route>
            <Route>
              <Player/>
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }

}

export default Index