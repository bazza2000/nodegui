import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import {ROUTE_PATH_NAME} from './../../constants/routeConstants';
import { actions } from '../../actions/indexActions';
import { journeyConstants } from '../../constants/commonConstants';
import authnGateway from '../../utils/authnGateway/authnGateway';
import { SCA_PREFERENCE } from '../../constants/appConstants';
import nodeLogServer from '../../utils/nodeLogServer/nodeLogServer';
import { Link } from 'react-router-dom';
import LineText from './../../components/LineText'

const assign = Object.assign || require('object.assign');

const mapStateToProps = state => {
  return {
    data: state.data
  };
}

class ForgotCredentials extends Component {
  constructor(props) {
    super(props);
    this._changeRedirection = this._changeRedirection.bind(this);
    this._mergeWithCurrentState = this._mergeWithCurrentState.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-621", reactRoute: window.location.pathname });
    
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
  }

  _changeRedirection(journey) {
    const {history} = this.props;
    if(journey === journeyConstants.ForgotPassword)
      history.push(ROUTE_PATH_NAME.FORGOTPASSWORD)
    else if(journey === journeyConstants.ForgotSecurityCode)
      history.push(ROUTE_PATH_NAME.FORGOTSECURITYCODE)
    else if(journey === journeyConstants.ForgotBothCredentials)
      history.push(ROUTE_PATH_NAME.FORGOTTENBOTHSECURITYDETAILS)
  }
  // Merges the current state with a change
  _mergeWithCurrentState(currentState, change) {
    return assign(currentState, change);
  }
  _softTokenLogin() {
    const {history} = this.props;
    authnGateway.getDeviceDetails({
      userName:this.props.data.userName,
      journeyId: this.props.data.challenge
    })
      .then(response => {
        if (response.data && response.data.enabledDevices.length > 0) {
          // get scaPreference
          authnGateway.getScaPreference({
            userName: this.props.data.userName,
            journeyId: this.props.data.challenge
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
                history.push(ROUTE_PATH_NAME.SOFTTOKENVERIFICATIONCODEMETHOD);
              else
                history.push(ROUTE_PATH_NAME.WEHAVESENTYOUANOTIFICATION);
            }).catch(()=>{
              history.push(ROUTE_PATH_NAME.ERRORPAGE);
            });
        } else {
          history.push(ROUTE_PATH_NAME.WECOULDNOTLOGYOUIN);
        }
      }).catch(err => {
        history.push(ROUTE_PATH_NAME.WECOULDNOTLOGYOUIN);
        console.log(err, 'error');
      });
  }

  _changeJourneyDetail(journey)  {
    this.props.dispatch(actions.changeJourney(journey));

    // check if default preference is mobile app
    authnGateway.mobileAppScaPreference({
      userName: this.props.data.userName,
      journeyId: this.props.data.challenge
    })
      .then(response => {
        // Show the page base on preference
        if(response.data && response.data.mobileAppSCADefault){
          this._softTokenLogin();
        }  else {
          this._changeRedirection(journey);
        }
      }).catch(error => {
        this._changeRedirection(journey);
        console.log(error,'get sca reference failed');
      });
  }

  render() {
    return (
      <div className="forgot-credentials align">
        <h1 className="m-b-20">Forgotten password/security code</h1>
        <Row>
          <Col xs="12">
            <button id="btnForgotPassword" className="button__submit-btn--other" onClick={()=>this._changeJourneyDetail(journeyConstants.ForgotPassword)} tabIndex={0}>Forgotten password</button>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <button id="btnForgotSecurityCode" className="button__submit-btn--other" onClick={() => this._changeJourneyDetail(journeyConstants.ForgotSecurityCode)} tabIndex={0}>Forgotten security code</button>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <button id="btnForgotBothCredentials" className="button__submit-btn--other" onClick={() => this._changeJourneyDetail(journeyConstants.ForgotBothCredentials)} tabIndex={0}>Forgotten both</button>
          </Col>
        </Row>
        <LineText className="m-t-20" text="" />
        <div className="m-t-20">
          <p className="text-center"><Link to={ROUTE_PATH_NAME.FORGOTUSERNAME}>I have forgotten my username</Link></p> 
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ForgotCredentials);