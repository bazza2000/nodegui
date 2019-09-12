import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions/indexActions';
import LineText from '../../components/LineText';
import IconWithText from '../../components/IconWithText';
import { ROUTE_PATH_NAME } from '../../constants/routeConstants';
import authnGateway from '../../utils/authnGateway/authnGateway';
import { SCA_PREFERENCE } from '../../constants/appConstants';

const assign = Object.assign || require('object.assign');

const mapStateToProps = state => {
  return {
    data: state.data
  };
}

class SoftTokenVerification extends React.PureComponent {
  constructor(props) {
    super(props);
    this._softTokenLogin = this._softTokenLogin.bind(this);
    this._mergeWithCurrentState = this._mergeWithCurrentState.bind(this);
  }

  _softTokenLogin() {

    authnGateway.getDeviceDetails({
      userName:this.props.data.userName,
      journeyId: this.props.data.challenge
    })
      .then(response => {
        if (response.data && response.data.enabledDevices.length > 0) {
          this.props.dispatch(actions.changeDeviceDetails(response.data));
          // get scaPreference
          authnGateway.getScaPreference({
            "userName": this.props.data.userName,
            "journeyId": this.props.data.challenge
          })
            .then(profile => {
              let newProfileData = profile.data;
              if(profile.data.scaPreference !== SCA_PREFERENCE.MOBILEAPP_PREF)
                newProfileData.newscaPreference = SCA_PREFERENCE.MOBILEAPP_PREF;
              this.props.dispatch(actions.changeProfileData(
                this._mergeWithCurrentState(this.props.data.profile, newProfileData)
              ));
              // show security screen or not
              if (profile.data.showSecurityInfoScreen === 'Y')
                this.props.history.push(ROUTE_PATH_NAME.SOFTTOKENVERIFICATIONCODEMETHOD);
              else
                this.props.history.push(ROUTE_PATH_NAME.WEHAVESENTYOUANOTIFICATION);
            }).catch(()=>{
              this.props.history.push(ROUTE_PATH_NAME.ERRORPAGE);
            });
        } else {
          this.props.history.push(ROUTE_PATH_NAME.WECOULDNOTLOGYOUIN);
        }
      }).catch(err => {
        this.props.history.push(ROUTE_PATH_NAME.WECOULDNOTLOGYOUIN);
      });
  }

  // Merges the current state with a change
  _mergeWithCurrentState(currentState, change) {
    return assign(currentState, change);
  }

  render() {
    return (
      <div>
        <div role='presentation' tabIndex={0}>
          <IconWithText
            img={Logo2}
            title="Verify with the mobile app"
            text="If you have the mobile app, you can use it to verify faster"
          />
        </div>
        <div className="align">
          <button id="buttonSubmit" className="button__submit-btn--next" type="submit" onClick={this._softTokenLogin}>Verify with the app</button>
        </div>
        <div className="align">
          <LineText text="or"/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(SoftTokenVerification);
