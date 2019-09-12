import React from 'react';
import { connect } from 'react-redux';
import { ROUTE_PATH_NAME } from './../../constants/routeConstants';
import { validation } from '../../utils/validation/index';
import { err } from '../../constants/messageConstants';
import { actions } from '../../actions/indexActions';
import ErrorBox from '../../components/ErrorBox';
import { ValidationRules } from '../../constants/commonConstants';
import authnGateway from '../../utils/authnGateway/authnGateway';
import { links } from '../../constants/links';
import { appLabels } from '../../constants/textConstants';

import nodeLogServer from '../../utils/nodeLogServer/nodeLogServer';

class OtpVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      inputValue:'',
      inputType:'text',
      inputOTPError:null,
    }

    this._submitOTP = this._submitOTP.bind(this);

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-1206", reactRoute: window.location.pathname });
    // update current path location
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
  }

  _changeOTP(e, stateV) {
    let inputValue = e.currentTarget.value.replace(/\D/g,''); // remove all non numeric
    if(validation.maxChar(e.currentTarget.value, ValidationRules.MaxOTPLength)){
      this.setState({
        inputOTPError : err.ONE_TIME_PASSWORD_MAX_DIGIT_ERR
      })
    } else if(validation.numbersOnly(e.currentTarget.value)){
      this.setState({
        inputOTPError: err.INVALID_ONE_TIME_PASSWORD,
        [stateV]:inputValue
      })
    } else {
      this.setState({
        inputOTPError : null,
        [stateV]:inputValue
      })
    }
  }

  _validateInputField(){
    let isFormValid = true;
    if(validation.required(this.state.inputValue)){
      this.setState({
        inputOTPError :  err.ONE_TIME_PASSWORD_REQUIRED
      })
      isFormValid = false;
    }else if(validation.minChar(this.state.inputValue, ValidationRules.MinOTPLength)){
      this.setState({
        inputOTPError : err.ONE_TIME_PASSWORD_MIN_DIGIT_ERR
      })
      isFormValid = false;
    }
    return isFormValid;
  }

  _submitOTP(e) {
    if ( e.keyCode === 13 || e.type === "click" ) {
      if(this._validateInputField()){
        let { userName, challenge} = this.props.data;
        let formData = {
          OTP: this.state.inputValue,
          userName: userName,
          journeyId: challenge
        }
        authnGateway.loginWithOTP(formData)
          .then(responseData => {
            if(responseData.data && responseData.data.status === "Success"){
              this.props.history.push({pathname: ROUTE_PATH_NAME.RESETBOTHSECURITYDETAILS});
            }else if(responseData.data && responseData.data.OTPInvalid === true){
              this.setState({ inputOTPError : err.INCORRECT_ONE_TIME_PASSWORD });
            }else {
              this.props.history.push({pathname: ROUTE_PATH_NAME.ONETIMEPASSWORDEXPIRE});
            }
          })
          .catch(() => {
            this.props.history.push(ROUTE_PATH_NAME.ERRORPAGE);
          });
      }
     
    }}

  render(){
    let aLink = <a href={links.callCharges} target="_blank">contact us.</a>;
    return(
      <div>
        <div className="align">
          <h1 tabIndex={0} className="m-b-30" role="title" >
            Enter the one-time password we emailed you
          </h1>
          <hr className="hr__manage-device--margin"></hr> 
          { this.state.inputOTPError
            ? <ErrorBox>
              <p>{err.GENERAL_PAGE_ERROR}</p>
            </ErrorBox>
            : null
          }
          <div className="m-t-30">
            <p tabIndex={0}>
              You should have recieved an email from us containing your One-time password.
              Please make sure it's the latest email you've recieved from us about unlocking your account.
              If you didn't get a password, or are having trouble logging in,check your junk or spam folders as they sometimes automatically get sent there.
              {appLabels.oneTimePasswordSubtitle ? <span>{appLabels.oneTimePasswordSubtitle} {aLink}</span> : ''}
            </p>
          </div>
          <div>
            <form className="form otp-verification">
              <div className="form__field-wrapper" aria-live="assertive" aria-atomic="true">
                <label id="labelOneTimePass" className="form__field-label" htmlFor="inputOneTimePass"><h2>One-time password</h2></label>
                <div className="otp-verification__input-field">
                  <input 
                    className={"form__field-input" + (this.state.inputOTPError ? ' form__field-input--error' : '')}
                    type={this.state.inputType} 
                    id="inputOneTimePass"
                    onChange={e => this._changeOTP(e,'inputValue')}
                    onBlur={() => this._validateInputField()}
                    autoCorrect="off" 
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.state.inputValue}
                    aria-labelledby="inputOneTimePass"
                  />
                </div>
                { this.state.inputOTPError ? <p role="alert" className="error">{this.state.inputOTPError}</p> : null }
              </div>
              <div className="form__field-wrapper">
                <button id="buttonSubmit" className="button__submit-btn--next" type="button"  onClick={this._submitOTP} >OK</button>
              </div>
            </form>
          </div>
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
export default connect(mapStateToProps)(OtpVerification);