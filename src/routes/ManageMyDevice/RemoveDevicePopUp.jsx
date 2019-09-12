import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from '../../components/Popup';
import authnGateway from '../../utils/authnGateway/authnGateway';
const successIcon = require(`../../../img/Success.png`);
const errorIcon = require(`../../../img/Error.png`);

const mapStateToProps = ({data}) => {
  const {userName} = data;
  return {
    userName
  };
}

class RemoveDevicePopUp extends Component {
  constructor(props) {
    super(props);
  }

  _handleRemoveDevice(isRemoveDevice) {
    if(isRemoveDevice) {
    // service integration
      authnGateway.deleteDevice({
        userName:this.props.userName,
        firebaseInstanceId:this.props.selectedDevice.id.firebaseInstanceId,
        deviceId:this.props.selectedDevice.id.deviceId,
        journeyId:this.props.journeyId
      }).then(response=>{
        if(response.data && response.data.status === 'Success') {
          this.props._getDeviceList();
          this.props._removeDevice(true, 'Success');
        } else {
          this.props._removeDevice(true, 'Error');
        }

      }).catch(() =>{
        this.props._removeDevice(true, 'Error');
      });
    } else {
      this.props._removeDevice(false);
    }

  }

  render() {
    return (
      <div id="removeDevicePopUp" aria-live="assertive" aria-atomic="true">
        <Popup showPopup = {this.props.displayPopUp} >
          {'' === this.props.showSuccessErrorPopup && <div>
            <h1 tabIndex={0} className="tabIndex m-b-20">{`Do you want to remove ${this.props.selectedDevice.model}`}</h1>
            <p className="tabIndex" tabIndex={0}>
            If you remove a device, you will have to verify your identity again
            to use the app on that device.
            </p>
            <button id="removeBtn" aria-label={`remove ${this.props.selectedDevice.model}`}type="button" className="button__submit-btn--next m-b-0" onClick={()=>this._handleRemoveDevice(true)}>Remove this Device</button>
            <button id="cancelBtn" type="button" className="button__submit-btn--other" onClick={()=>this._handleRemoveDevice(false)}>Cancel</button>
          </div>}
          {'Success' === this.props.showSuccessErrorPopup && <div>
            <div>
              <img className="m-b-20" src={successIcon} />
              <div className="m-b-20"><label className="m-b-20">You have successfully removed your device.</label></div>
            </div>
            <div className="button__submit-btn-wrapper m-b-0">
              <button  className="button__submit-btn--next m-b-0" type="button" onClick={()=>this._handleRemoveDevice(false)} >Back to your devices</button>
            </div>
          </div> }
          {'Error' === this.props.showSuccessErrorPopup && <div>
            <div>
              <img className="m-b-20" src={errorIcon} />
              <div className="m-b-20"><label>We're sorry, there was an error in removing your device</label></div>
            </div>
            <div className="button__submit-btn-wrapper m-b-0">
              <button  className="button__submit-btn--next m-b-0" type="button" onClick={()=>this._handleRemoveDevice(false)} >Back to your devices</button>
            </div>
          </div> }
        </Popup>
      </div>
      
    )
  }
}

export default connect(mapStateToProps)(RemoveDevicePopUp);
