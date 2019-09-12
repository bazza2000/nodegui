import React from 'react';
import { connect } from 'react-redux';
import { ROUTE_PATH_NAME } from './../../constants/routeConstants';
import { links } from '../../constants/links';
import { actions } from '../../actions/indexActions';
import nodeLogServer from '../../utils/nodeLogServer/nodeLogServer';

class OneTimePasswordExpiry extends React.Component {

  constructor(props) {
    super(props);

    this._backToUsername = this._backToUsername.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-1206", reactRoute: window.location.pathname });
    // update current path location
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
  }

  // disabled back button
  componentWillMount() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
      window.scrollTo(0, 0);
    });
  }

  _backToUsername(e){
    if ( e.keyCode === 13 || e.type === "click" )
      this.props.history.push(ROUTE_PATH_NAME.ENTERUSERNAME);
  }

  render(){
    return(
      <div>
        <div className="align">
          <div tabIndex={0}><h1 id="oneTimePassExpired" className="m-b-30" role="title" >Your one-time password has expired</h1></div>
          <hr className="hr__manage-device--margin"></hr>
          <div className="m-b-30">
            <label  id="emailIdText" role="" type="text">Please <a target="_blank" href={links.footer[0].url}> contact us</a> for help logging in.</label>
          </div>
          <button id="btnForgotUsernameSuccess" className="button__submit-btn--other" onClick={this._backToUsername} type="button">Close</button>
        </div>
      </div>
    );
  }
}

export default connect(null)(OneTimePasswordExpiry);
