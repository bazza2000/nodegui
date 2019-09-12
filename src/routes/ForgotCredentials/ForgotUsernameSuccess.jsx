/*
 * ForgotSecurityCodeSuccess Component.
 * - Load using <ForgotSecurityCodeSuccess />.
 *
 * Dumb component.
 */
import React from 'react';
import { connect } from 'react-redux';
import { ROUTE_PATH_NAME } from './../../constants/routeConstants';
import LineText from '../../components/LineText';
import { actions } from '../../actions/indexActions';
import { _generateHiddenEmail } from './../../utils/_generateHiddenEmail';
import nodeLogServer from '../../utils/nodeLogServer/nodeLogServer';
let currentProps;
class ForgotUsernameSuccess extends React.Component {

  constructor(props) {
    super(props);

    this._backToUsername = this._backToUsername.bind(this);
  }

  // disabled back button
  componentWillMount() {
    history.pushState(null, null, document.URL);
    currentProps = this.props;
    window.addEventListener('popstate', function (event) {
      history.pushState(null, null, document.URL);
      window.scrollTo(0, 0);
    });
  }


  componentDidMount() {
    window.scrollTo(0, 0);
    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-1341", reactRoute: window.location.pathname });
    // update current path location
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
  }
  _backToUsername(e){
    if ( e.keyCode === 13 || e.type === "click" )
      this.props.history.push(ROUTE_PATH_NAME.ENTERUSERNAME);
  }

  render(){
    // Hack to maintain props state when click browser back
    if(currentProps)
      this.props = currentProps;
    return(
      <div>
        <div className="align">
          <h1 className="m-b-30" role="title" >Username reminder sent</h1>
          <LineText className="hr__manage-device--margin lineTextPush" text="" />
          <div className="m-b-30">
            <label  id="emailIdText" role="" type="password">If this email address matches our records, a username reminder will be sent to:</label>
          </div>
          <div className="m-b-30">
            <h2><b>{_generateHiddenEmail(this.props.location.state.email)}</b></h2>
          </div>
          <div className="m-b-30">
            <label  id="emailIdText" role="" type="text">You'll receive your reminder shortly. If it's not in your inbox or junk folder in the next 2 hours, please try again. If you still haven't received an email after your second attempt,<a target="_blank" href={"http://www.viosystemes.com"}> contact us.</a></label>
          </div>
          <div className="m-b-140">
            <label  id="emailIdText" role="" type="text">If you have also forgotten your password or security code then you can reset your security details online. To do this, return to login and enter your username, then look for the Forgot password/secuirty code link.</label>
          </div>
          <button id="btnForgotUsernameSuccess" className="button__submit-btn--next" onClick={this._backToUsername} type="button">Return to login</button>
        </div>
      </div>
    );
  }
}

// Which props do we want to inject, given the redux store?
const mapStateToProps = state => {
  return {
    data: state.data
  };
}

export default connect(mapStateToProps)(ForgotUsernameSuccess);
