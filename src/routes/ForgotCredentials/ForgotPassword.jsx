import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import TitleBlock from './../../components/TitleBlock';
import SoftTokenVerification from './SoftTokenVerification';
import { _generatePinLabel } from '../../utils/_generatePinLabel';
import { validation } from '../../utils/validation/index';
import {ROUTE_PATH_NAME} from './../../constants/routeConstants';
import { actions } from './../../actions/indexActions';
import { SCA_PREFERENCE } from '../../constants/appConstants';
import ErrorBox from '../../components/ErrorBox';
import { err } from '../../constants/messageConstants';
import Dropdown from './../../components/Dropdown';
import {pinValuesArr} from '../../constants/commonConstants';
import authnGateway from '../../utils/authnGateway/authnGateway';
import nodeLogServer from '../../utils/nodeLogServer/nodeLogServer';

const assign = Object.assign || require('object.assign');

// Which props do we want to inject, given the redux store?
const mapStateToProps = state => {
  return {
    data: state.data
  };
}

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinPos1:'',
      pinPos2:'',
      pinPos1Error:'',
      pinPos2Error:''
    }
    this._submitSecurityCode = this._submitSecurityCode.bind(this);
    this._mergeWithCurrentState = this._mergeWithCurrentState.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-631", reactRoute: window.location.pathname });
        
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
  }

  _submitSecurityCode(e) {
    e.preventDefault();
    let {pinPos1,pinPos2} = this.state;
    let {history} = this.props;
    let {profile, userName, challenge} = this.props.data;

    if ( !pinPos1 || !pinPos2 ) {
      this.setState({
        pinPos1Error:validation.required(pinPos1) ? `Please enter the ${_generatePinLabel(profile.pinPos1)} of your security code`:'',
        pinPos2Error:validation.required(pinPos2) ? `Please enter the ${_generatePinLabel(profile.pinPos2)} of your security code`:''
      });
    } else {
      
      // serive call to validate security code pin positions
      authnGateway.validatePin(
        {
          userName:userName,
          journeyId: challenge,
          pinPositions : [profile.pinPos1, profile.pinPos2 ],
          pinValues : [parseInt(pinPos1), parseInt(pinPos2)]
        })
        .then(response=>{
          if(response.data && response.data.status === 'Success' ) {
            
            this.props.dispatch(actions.changeProfileData(
              this._mergeWithCurrentState(this.props.data.profile, response.data)
            ));

            authnGateway.getScaPreference({
              userName: this.props.data.userName,
              journeyId: this.props.data.challenge
            })
              .then(res => {
                if(res.data){
                  this.props.dispatch(actions.changeProfileData(
                    this._mergeWithCurrentState(this.props.data.profile, res.data)
                  ));

                  if('N' === res.data.showSecurityInfoScreen && (res.data.scaPreference === SCA_PREFERENCE.EMAIL_PREF 
                    || res.data.scaPreference === SCA_PREFERENCE.TEXT_PREF)) {
                    authnGateway.sendOtp({
                      userName: this.props.data.userName,
                      scaPreference: res.data.scaPreference,
                      journeyId: this.props.data.challenge
                    }).then(result =>{
                      if(result.data && result.data.status === 'Fail') {
                        history.push(ROUTE_PATH_NAME.ERRORPAGE);
                      }
                    }).catch(()=>{
                      history.push(ROUTE_PATH_NAME.ERRORPAGE);
                    });
                  }

                  if(res.data.showSecurityInfoScreen === 'Y') {
                    history.push(ROUTE_PATH_NAME.SECURITYINFORMATION);
                  } else if( SCA_PREFERENCE.EMAIL_PREF === res.data.scaPreference || SCA_PREFERENCE.TEXT_PREF === res.data.scaPreference ) {
                    history.push(ROUTE_PATH_NAME.VERIFYCODE);
                  } else {
                    history.push(ROUTE_PATH_NAME.SECURITYVERIFICATIONCODEMETHOD);
                  }
                }
              }).catch(() => {
                history.push(ROUTE_PATH_NAME.ERRORPAGE);
              });

          } else {
            history.push({pathname: ROUTE_PATH_NAME.WECOULDNOTLOGYOUIN, state: { isOTPFlow: true}});
          }
        }).catch(() => {
          history.push(ROUTE_PATH_NAME.ERRORPAGE);
        });
    }

  }

  _changePinValue(e, inputValue) {
    this.setState({
      [inputValue]:e.currentTarget.value.trim()
    });
  }

  // Merges the current state with a change
  _mergeWithCurrentState(currentState, change) {
    return assign(currentState, change);
  }
  
  render() {
    return (
      <div className="forgot-password">
        <TitleBlock title='Forgotten password' />
        { this.state.pinPos1Error || this.state.pinPos2Error
          ? <div className="align" >
            <ErrorBox>
              <p>{err.GENERAL_PAGE_ERROR}</p>
            </ErrorBox>
          </div>
          : null
        }
        <SoftTokenVerification history = {this.props.history} />

        <label className="align">
          Please enter these digits from your online banking security code.
        </label>
        <div className="form__wrapper">
          <div className="form">
            <form onSubmit={this._submitSecurityCode} >
              <div className="form__field-wrapper" aria-live="assertive" aria-atomic="true">
                <h2 role="presentation" htmlFor="Security code" tabIndex={0}>Security code</h2>
                <Row className="m-b-20">
                  <Col xs={5} sm={2}>
                    <label id="labelForgotPassword" className="form__field-label" htmlFor="pin1">{ _generatePinLabel(this.props.data.profile.pinPos1)}</label>
                    <Dropdown 
                      id="pin1" 
                      className={"form__field-input form__field-input--pin form__field-input--dropdown" + (this.state.pinPos1Error ? ' form__field-input--error' : '')} 
                      onChange={e => this._changePinValue(e,"pinPos1")} 
                      value={this.state.pinPos1}
                      options = {pinValuesArr}
                      ariaLabel="labelForgotPassword"
                    />
                    { this.state.pinPos1Error ? <p role="alert" className="error">{this.state.pinPos1Error}</p> : null }
                  </Col>

                  <Col xs={5} sm={2}>          
                    <label id="labelForgotPassword" className="form__field-label" htmlFor="pin2">{ _generatePinLabel(this.props.data.profile.pinPos2)}</label>
                    <Dropdown 
                      id="pin2"
                      className={"form__field-input form__field-input--pin form__field-input--dropdown" + (this.state.pinPos2Error ? ' form__field-input--error' : '')} 
                      onChange={e => this._changePinValue(e,"pinPos2")} 
                      value={this.state.pinPos2}
                      options = {pinValuesArr}
                      ariaLabel="labelForgotPassword"
                    />
                    { this.state.pinPos2Error ? <p role="alert" className="error">{this.state.pinPos2Error}</p> : null }
                  </Col>
                </Row>
                <button id="buttonSubmit" className="button__submit-btn--next" type="submit">Next</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ForgotPassword);