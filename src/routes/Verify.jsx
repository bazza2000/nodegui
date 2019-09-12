/*
 * Verify Route Component.
 * - This component is rendered if the '/EnterSecurityDetails' route is called.
 * - Use camel case for method names and prepend with '_' unless default react method.
 *
 * Smart component - uses Redux.
 */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions/indexActions';
import { Row, Col } from 'react-bootstrap';
import { _generatePinLabel } from '../utils/_generatePinLabel';
import { Redirect, Link } from 'react-router-dom';
import { ROUTE_PATH_NAME } from '../constants/routeConstants';
import nodeLogServer from '../utils/nodeLogServer/nodeLogServer';
import _getDateInDays from '../utils/_getDateInDays';
import authnGateway from '../utils/authnGateway/authnGateway';
import { pinValuesArr } from '../constants/commonConstants';
import { SCA_PREFERENCE } from '../constants/appConstants';
import { _getQueryStringParam } from '../utils/_getQueryStringParam';

// imported components
import LoadingBtn from '../components/LoadingBtn';
import TitleBlock from '../components/TitleBlock';
import IconWithText from '../components/IconWithText';
import LineText from '../components/LineText';
import Dropdown from '../components/Dropdown';

// images


//imported validation messages
import { err } from '../constants/messageConstants';

const assign = Object.assign || require('object.assign');

// Which props do we want to inject, given the redux store?
const mapStateToProps = state => {
  return {
    data: state.data
  };
}

class Verify extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentlySending: false,
      passwordError: null,
      pinPos1Error: null,
      pinPos2Error: null,
      error: null,
      pinVal1: '',
      pinVal2: '',
      password: '',
      pageTitle: "Log in"
    };

    this._auth = this._auth.bind(this);
    this._mergeWithCurrentState = this._mergeWithCurrentState.bind(this);
    this._changePassword = this._changePassword.bind(this);
    this._softTokenLogin = this._softTokenLogin.bind(this);
    this._getScaPreference = this._getScaPreference.bind(this);
    this._validate = this._validate.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-314", reactRoute: window.location.pathname });
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));

    // set step up redux stuff
    const pinPos1 = _getQueryStringParam("pinPos1", window) || null;
    const pinPos2 = _getQueryStringParam("pinPos2", window) || null;
    const journeyId = _getQueryStringParam("journeyId", window) || null;
    if ( pinPos1 ) {
      this.props.dispatch(actions.changeProfileData(
        this._mergeWithCurrentState(this.props.data.profile, {pinPos1: pinPos1})
      ));
    }
    if ( pinPos2 ) {
      this.props.dispatch(actions.changeProfileData(
        this._mergeWithCurrentState(this.props.data.profile, {pinPos2: pinPos2})
      ));
    }
    if ( journeyId ) {
      this.props.dispatch(actions.changeChallenge(journeyId));
    }

    // if querystring then re-bind title
    if ( pinPos1 || pinPos2 || journeyId ) {
      this.setState({
        pageTitle: "Verify"
      });
    }

  }

  _softTokenLogin() {

    const {history} = this.props;

    authnGateway.getDeviceDetails({
      userName:this.props.data.userName,
      journeyId:this.props.data.challenge
    })
      .then(response => {
        if (response.data && response.data.enabledDevices.length > 0) {
          this.props.dispatch(actions.changeDeviceDetails(response.data));
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
              if (profile.data.showSecurityInfoScreen === 'Y')
                history.push(ROUTE_PATH_NAME.SOFTTOKENVERIFICATIONCODEMETHOD);
              else
                history.push(ROUTE_PATH_NAME.WEHAVESENTYOUANOTIFICATION);
            }).catch(err => {
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

  _validate() {
    return new Promise((resolve, reject) => {
      if (!this.state.password || this.state.password === "") {
        this.setState({
          currentlySending: false,
          passwordError: err.PASSWORD_REQUIRED
        });
      }
      if (!this.state.pinVal1 || this.state.pinVal1 === "") {
        this.setState({
          currentlySending: false,
          pinPos1Error: "Please enter the " +_generatePinLabel(this.props.data.profile.pinPos1)+ " digit of your security code"
        });
      }
      if (!this.state.pinVal2 || this.state.pinVal2 === "") {
        this.setState({
          currentlySending: false,
          pinPos2Error: "Please enter the " +_generatePinLabel(this.props.data.profile.pinPos2)+ " digit of your security code"
        });
      }
      resolve();
    });
  }

  // Methods
  _auth(e) { // flow to consent
    if (e.keyCode === 13 || e.type === "submit") {
      e.preventDefault();
      const {history} = this.props;
      const {userName, profile, challenge} = this.props.data;

      this.setState({
        currentlySending: true,
        error: null
      });


      // validate
      this._validate().then(() => {

        // if no errors
        if ( !this.state.passwordError
          && !this.state.pinPos1Error
          && !this.state.pinPos2Error ) {

          // verify password and pin
          authnGateway.firstFactorLogin({
            userName: userName,
            password: this.state.password,
            pinPos1: profile.pinPos1,
            pinPos2: profile.pinPos2,
            pinVal1: this.state.pinVal1,
            pinVal2: this.state.pinVal2,
            journeyId: challenge
          })
            .then(res => {
              // status check for fraud locks preventing forced attacks etc
              if (res.data.status === 'login.fail' || res.data.status === 'login.lastAttempt' || res.data.status === 'login.countDown' || res.data.status === 'login.locked') {
                this.props.dispatch(actions.changeProfileData(
                  this._mergeWithCurrentState(profile, res.data)
                ));
                history.push(ROUTE_PATH_NAME.ENTERUSERNAME + "?login_challenge=" + challenge);
              } else if (res.errorInfo.errorMessage === 'Success') {
                this.props.dispatch(actions.changeProfileData(
                  this._mergeWithCurrentState(profile, res.data)
                ));
                // Check for redirectURL indicating First Factor login was good enough
                // due to article 10 exemption currently last SCA within 90 days
                if ( profile.redirectURL ) {
                  window.location.href = profile.redirectURL;
                } else {
                  // get scaPreference and continue
                  this._getScaPreference(history, userName, profile, challenge);
                }
              }
            })
            .catch(err => {
              history.push(ROUTE_PATH_NAME.ERRORPAGE);
            });

        }

      });
    }

  }

  _changePassword(e) {
    // validate
    if (!e.currentTarget.value || e.currentTarget.value === "") {
      this.setState({
        passwordError: err.PASSWORD_REQUIRED,
        password: e.currentTarget.value
      });
    } else {
      this.setState({
        passwordError: null,
        password: e.currentTarget.value
      });
    }
  }

  _changePinValue(e, stateV) {
    let errorType = (e.currentTarget.id == 'pin1') ? "pinPos1Error" : "pinPos2Error";
    if (!e.currentTarget.value || e.currentTarget.value === "") {
      this.setState({
        [errorType] : "Please enter the " +_generatePinLabel(this.props.data.profile.pinPos2)+ " digit of your security code"
      })
    }else{
      this.setState({
        [errorType] : null,
        [stateV]:e.currentTarget.value
      })
    }
  }
  // Merges the current state with a change
  _mergeWithCurrentState(currentState, change) {
    return assign(currentState, change);
  }

  _getScaPreference(history, userName, profile) {
    authnGateway.getScaPreference({
      userName: userName,
      journeyId: this.props.data.challenge
    })
      .then(response => {
        this.props.dispatch(actions.changeProfileData(
          this._mergeWithCurrentState(profile, response.data)
        ));
        // show security screen or not
        if ( response.data.showSecurityInfoScreen === 'Y' ) {
          history.push(ROUTE_PATH_NAME.SECURITYINFORMATION);
        } else if( response.data.scaPreference === SCA_PREFERENCE.EMAIL_PREF || response.data.scaPreference === SCA_PREFERENCE.TEXT_PREF ) {
          authnGateway.sendOtp({
            userName: this.props.data.userName,
            scaPreference: profile.newscaPreference || profile.scaPreference,
            journeyId: this.props.data.challenge
          })
            .then(res => {
              if (res.Error) {
                this.setState({
                  currentlySending: false,
                  generalError: res.Error,
                  message: null
                });
              } else {
                this.setState({
                  currentlySending: false,
                  generalError: false
                });
                if (res.data.status === "Success") {
                  this.setState({
                    currentlyResending: false
                  });
                  this.props.history.push(ROUTE_PATH_NAME.VERIFYCODE);
                }
              }
            })
            .catch(err => {
              console.log(err.message);
              this.setState({
                currentlySending: false,
                generalError: err.message,
                message: null
              });
            });
        } else {
          history.push(ROUTE_PATH_NAME.SECURITYVERIFICATIONCODEMETHOD);
        }
      }).catch(()=>{
        history.push(ROUTE_PATH_NAME.ERRORPAGE);
      });
  }

  render() {

    return (
      <div>

        <TitleBlock title={this.state.pageTitle} img={Fscs} />

        <div className="align">
          <button id="btnLoginWithTheApp" className="button__submit-btn--next got-the-app__btn m-b-20" onClick={this._softTokenLogin} type="button">Log in with the app</button>
        </div>

        <LineText text="or with security details" />

        <div className="form____wrapper">

          <div className="form no-border">

            <form onSubmit={this._auth}>
              <div className="form__field-wrapper">
                <div className="form__field-wrapper">
                  <label className="form__field-label" htmlFor="password">Password</label>
                  <input
                    className={"form__field-input m-b-10" + (this.state.passwordError ? ' form__field-input--error' : '')}
                    id="password"
                    onChange={this._changePassword}
                    type="password"
                    placeholder=""
                    value={this.state.password}
                  />
                  {this.state.passwordError ? <p className="error">{this.state.passwordError}</p> : null}
                </div>
              </div>
              <p className="m-b-20">Enter these digits from your online banking security code.</p>
              <div className="form__field-wrapper">

                <Row>
                  <Col xs={5} sm={3}>
                    <label className="form__field-label m-b-5" htmlFor="pin1">{_generatePinLabel(this.props.data.profile.pinPos1)}</label>
                    <Dropdown
                      className={"form__field-input form__field-input--pin" + (this.state.pinPos1Error ? ' form__field-input--error' : '')}
                      id="pin1"
                      onChange={e => this._changePinValue(e,'pinVal1')}
                      type="password"
                      placeholder=""
                      value={this.state.pinVal1}
                      options={pinValuesArr}
                    />
                    {this.state.pinPos1Error ? <p className="error">{this.state.pinPos1Error}</p> : null}
                  </Col>

                  <Col xs={5} sm={3}>
                    <label className="form__field-label m-b-5" htmlFor="pin2">{_generatePinLabel(this.props.data.profile.pinPos2)}</label>
                    <Dropdown
                      className={"form__field-input form__field-input--pin" + (this.state.pinPos2Error ? ' form__field-input--error' : '')}
                      id="pin2"
                      onChange={e => this._changePinValue(e,'pinVal2')}
                      type="password"
                      placeholder=""
                      value={this.state.pinVal2}
                      options={pinValuesArr}
                    />
                    {this.state.pinPos2Error ? <p className="error">{this.state.pinPos2Error}</p> : null}
                  </Col>
                </Row>

              </div>
              <div className="button__submit-btn-wrapper">
                {this.state.currentlySending
                  ? <LoadingBtn />
                  : <button id="btnLoginWithCredentials" className="button__submit-btn--next" type="submit">Log in with security details</button>
                }
                {this.state.error ? <p className="error">* {this.state.error}</p> : null}
              </div>
            </form>

            <p className="text-center">
              <Link to={ROUTE_PATH_NAME.WHICHDETAILSDOYOUNEEDTORESET}>Forgot your password/security code?</Link>
            </p>

          </div>

        </div>

      </div>
    );
  }

}

export default connect(mapStateToProps)(Verify);
