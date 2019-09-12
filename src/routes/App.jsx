/*
 * Default App.
 * - This is a default App file, if the app is loaded and no route defined it loads this.
 */

import React from 'react';
import { hot } from 'react-hot-loader';
import { Link } from "react-router-dom";
import { ROUTE_PATH_NAME } from './../constants/routeConstants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>No default route set for this project.</p>
        <p><strong>Routes:</strong></p>
        <div><Link to={ROUTE_PATH_NAME.ENTERUSERNAME} >Username</Link></div>
      </div>
    );
  }

}


export default hot(module)(App)
