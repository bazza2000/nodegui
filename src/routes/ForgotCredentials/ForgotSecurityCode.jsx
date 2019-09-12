import React, { Component } from 'react';
import { connect } from 'react-redux';
import TitleBlock from '../../components/TitleBlock';
import SoftTokenVerification from './SoftTokenVerification';
import {ROUTE_PATH_NAME} from './../../constants/routeConstants';
import { validation } from '../../utils/validation/index';
import { err } from '../../constants/messageConstants';
import { actions } from './../../actions/indexActions';
import { SCA_PREFERENCE } from '../../constants/appConstants';
import ErrorBox from '../../components/ErrorBox';
import authnGateway from '../../utils/authnGateway/authnGateway';
import nodeLogServer from '../../utils/nodeLogServer/nodeLogServer';

const assign = Object.assign || require('object.assign');

// Which props do we want to inject, given the redux store?
const mapStateToProps = state => {
  return {
    data: state.data
  };
}

class ForgotSecurityCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputError:null,
      inputValue:''
    }
    this._submitPassword = this._submitPassword.bind(this);
    this._changePassword = this._changePassword.bind(this);
    this._mergeWithCurrentState = this._mergeWithCurrentState.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-632", reactRoute: window.location.pathname });
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
  }

  _submitPassword(e) {
    e.preventDefault();
    let {history} = this.props;
    let {userName, challenge} = this.props.data;
    if ( validation.required(this.state.inputValue) ) {
      this.setState({
        inputError: err.PASSWORD_REQUIRED
      });
    } else {
      // service call to validate password
      authnGateway.validatePassword(
        {
          userName: this.props.data.userName,
          journeyId: challenge,
          password: this.state.inputValue
        })
        .then(response => {
          if(response.data && response.data.status === 'Success' ) {
            
            this.props.dispatch(actions.changeProfileData(
              this._mergeWithCurrentState(this.props.data.profile, response.data)
            ));

            authnGateway.getScaPreference({
              userName: userName,
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
                  if( res.data.showSecurityInfoScreen === 'Y' ) {
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
        }).catch(()=>{
          history.push(ROUTE_PATH_NAME.ERRORPAGE);
        });
    }
  }

  _changePassword(e) {
    this.setState({
      inputValue: e.currentTarget.value.trim(),
      inputError: null
    });
  }

  // Merges the current state with a change
  _mergeWithCurrentState(currentState, change) {
    return assign(currentState, change);
  }

  render() {
    return (
      <div>
        <TitleBlock title='Forgotten security code' />
        { this.state.inputError
          ? <div className="align" >
            <ErrorBox>
              <p>{err.GENERAL_PAGE_ERROR}</p>
            </ErrorBox>
          </div>
          : null
        }
        <SoftTokenVerification history = {this.props.history} />

        <label className="align">
          Please enter your password.
        </label>

        <div className="form__wrapper">
          <div className="form">
            <form onSubmit={this._submitPassword}>
              <div className="form__field-wrapper" aria-live="assertive" aria-atomic="true">
                <label id="labelForgotSecurityCode" className="form__field-label" htmlFor='EnterPassword'><h2 className="m-b-0">Password</h2></label>
                <input 
                  className={"form__field-input" + (this.state.inputError ? ' form__field-input--error' : '')}
                  id="EnterPassword"
                  type="password" 
                  placeholder=""
                  onChange={this._changePassword}
                  autoCorrect="off" 
                  autoCapitalize="off"
                  spellCheck="false"
                  value={this.state.inputValue}
                  aria-labelledby="labelForgotSecurityCode"
                />
                { this.state.inputError ? <p role="alert" className="error">{this.state.inputError}</p> : null }
                <div>
                  <button id="buttonSubmit" className="button__submit-btn--next m-t-30" type="submit">Next</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ForgotSecurityCode);