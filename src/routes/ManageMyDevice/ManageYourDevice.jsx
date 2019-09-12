/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';
import LineText from '../../components/LineText';
import { ROUTE_PATH_NAME } from '../../constants/routeConstants';
import authnGateway from '../../utils/authnGateway/authnGateway';
import { actions } from '../../actions/indexActions';
import RemoveDevicePopUp from './RemoveDevicePopUp';
import _getDateInDays from '../../utils/_getDateInDays';
import nodeLogServer from '../../utils/nodeLogServer/nodeLogServer';

class ManageYourDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      successErrorPopup: '',
      selectedDevice: {}
    }
    this._backToProfile = this._backToProfile.bind(this);
    this._removeDevice = this._removeDevice.bind(this);
  }

  componentDidMount() {
    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-378", reactRoute: window.location.pathname });
    // get UserName from query string
    let queryString = window.location.search;
    let searchParams = new URLSearchParams(queryString);
    let userName = searchParams.get('username');
    let challenge = searchParams.get('login_challenge');

    this.props.dispatch(actions.changeUsername(userName));
    this.props.dispatch(actions.changeChallenge(challenge));
    this._getDeviceList(userName,challenge);
    
  }

  _getDeviceList(userName,challenge) {
    authnGateway.getDeviceDetails({
       userName: userName,
       journeyId: challenge
       })
    .then(response => {
      if (response.data) {
        this.props.dispatch(actions.changeDeviceDetails(response.data));
      }
    }).catch(() => {
      this.props.history.push(ROUTE_PATH_NAME.ERRORPAGE);
    });
  }

  _removeDevice(value, isRemoveDeviceSuccess = '', deviceObj) {

      this.setState({
        showPopUp: value,
        successErrorPopup: isRemoveDeviceSuccess,
        selectedDevice:deviceObj
      });
  }

  _backToProfile(e){
    if ( e.keyCode === 13 || e.type === "click" )
     this.props.history.push(ROUTE_PATH_NAME.SOFTTOKENSUCCESSFUL);
  }

  _registeredDevices() {
    let registeredDeviceDetails = '';
    let dateInDays = '';

    if (this.props.deviceDetails && this.props.deviceDetails.isDeviceRegistered !== '') {
      if (this.props.deviceDetails.isDeviceRegistered === 'Y') {
        registeredDeviceDetails = this.props.deviceDetails.enabledDevices.map((item, index) => {
          dateInDays = _getDateInDays(item.lastAccessTimestamp);
          return <div key={item.deviceId}>
            <h2 id={`model-${index}`}>{item.model}</h2>
            <label id={`last-access-${index}`}>Last accessed {dateInDays} days ago</label>
            <div>
              <button tabIndex={0}
                id={`btnRemoveDevice-${index}`}
                className="button__submit-btn--next button__manage-device--width m-t-30 m-b-10" 
                type="button" 
                onClick={() => this._removeDevice(true,'',item)} aria-label={`remove ${item.model}`} >
                Remove
              </button>
            </div>
            <LineText className="lineTextPush" text="" />
          </div>
        });
      } else {
        registeredDeviceDetails = <div className="m-b-140"><label id="notRegDevice">You don't have any devices.</label></div>
      }
    }
    return registeredDeviceDetails;
  }

  render() {
    return (
      <div className="manage-my-device align">
        <h1 className="m-b-30">Your devices</h1>
        <div>
          <label className="m-b-10" id="deviceDetails">
            Devices where you have downloaded the Co-operative Bank app will appear here.
          </label>
        </div>
        {/* <LineText className="lineTextPush" text="" /> */}
        <hr className="hr__manage-device--margin m-t-30 m-b-30" />
        <div>
          {this._registeredDevices()}
        </div>
        <div>
          <button 
           id="backButton" 
           className="button__submit-btn--other m-t-40 button__manage-device--width" 
           type="button" 
           onClick={this._backToProfile} >
           Back to profile
          </button>
        </div>
        {this.state.showPopUp &&
          <RemoveDevicePopUp
            _removeDevice={this._removeDevice}
            selectedDevice={this.state.selectedDevice}
            _getDeviceList={()=>this._getDeviceList()}
            displayPopUp={this.state.showPopUp}
            showSuccessErrorPopup={this.state.successErrorPopup}
            journeyId ={this.props.challenge}
        />}
      </div>
    )
  }
}
// Which props do we want to inject, given the redux store?
const mapStateToProps = ({ data }) => {
  const { deviceDetails, userName, challenge } = data;
  return {
    deviceDetails, userName, challenge
  };
}

export default connect(mapStateToProps)(ManageYourDevice);
