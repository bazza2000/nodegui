import React from 'react';
import { connect } from 'react-redux';
import TitleBlock from '../../components/TitleBlock';
import { validation } from '../../utils/validation/index';
import { err } from '../../constants/messageConstants';
import { ValidationRules } from '../../constants/commonConstants';
import authnGateway from '../../utils/authnGateway/authnGateway';
import { ROUTE_PATH_NAME } from '../../constants/routeConstants';
import { actions } from '../../actions/indexActions';
import ErrorBox from '../../components/ErrorBox';
import nodeLogServer from '../../utils/nodeLogServer/nodeLogServer';

class ResetBothSecurityDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputType:'Password',
      inputPasswordError:null,
      inputConfirmPasswordError:null,
      inputSecurityError:null,
      inputValue:'',
      inputConfirmValue:'',
      confirmInputType:'Password',
      confirmSecurityType:'Password',
      inputValuenewSecurityCode:'',
      inputSecurityType:'Password',
      generalError:null,
      inputValueConfirmSecurityCode:'',
      inputConfirmSecurityError: null
    };
    this._changeInputType = this._changeInputType.bind(this);
    this._changeCredential = this._changeCredential.bind(this);
    this._submitCredential = this._submitCredential.bind(this);    
  }

  // disabled back button
  componentWillMount() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
      window.scrollTo(0, 0);
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
 
    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-36", reactRoute: window.location.pathname });

    // update current path location
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
  }

  _changeInputType(type) {
    let currentType = (this.state[type] == "Password") ? "Text" : "Password";
    this.setState({
      [type]: currentType
    })
  }
  
  _changeCredential(e, stateV, stateErr) {
    if(stateV == 'inputValue' || stateV == 'inputConfirmValue') {
      if (validation.maxChar(e.currentTarget.value, ValidationRules.MaxPasswordLength)) {
        this.setState({
          [stateErr]: err.PASSWORD_MAXCHAR,
        })
      }else{
        this.setState({
          [stateErr]: null,
          [stateV]: e.currentTarget.value
        })
      }
    }
    if(stateV == 'inputValuenewSecurityCode' || stateV == 'inputValueConfirmSecurityCode') {
      if (validation.maxChar(e.currentTarget.value, ValidationRules.MaxSecurityCodeLength)) {
        this.setState({
          [stateErr]: err.SECURITY_CODE_MAX_DIGIT_ERR,
        })
      }else if(validation.numbersOnly(e.currentTarget.value)) {
        e.currentTarget.value = e.currentTarget.value.replace(/\D/g,''); // remove all non numeric
        this.setState({
          [stateErr]: err.INVALID_SECURITY_CODE,
          [stateV]: e.currentTarget.value
        })
      }else{
        this.setState({
          [stateErr]: null,
          [stateV]: e.currentTarget.value
        })
      }
    }
  }
  _isFormValidate(isSubmit){
    let isFormValid = true;
    Object.keys(this.state).forEach((type, val) => {  
      isFormValid =this._validateInputField(type ,isFormValid, isSubmit);
    });
    return isFormValid;
  }

  _validateInputField(type ,isFormValid, isSubmit){
    let errorField;
    let errorTypeEmpty;
    let errorTypeMinChar;
    let errorReq = true;
    if(type === 'inputValue' || type === 'inputConfirmValue' || type === 'inputValueConfirmSecurityCode' || type === 'inputValuenewSecurityCode'){
      switch(type){
      case 'inputValue':
        errorField = 'inputPasswordError';
        errorTypeEmpty = 'NEW_PASSWORD_ERROR';
        errorTypeMinChar = 'PASSWORD_MINCHAR';
        break;
      case 'inputConfirmValue' :
        errorField = 'inputConfirmPasswordError';
        errorTypeEmpty = 'CONFIRM_NEW_PASSWORD_ERROR';
        errorTypeMinChar = 'PASSWORD_MINCHAR';
        break;
      case 'inputValuenewSecurityCode' :
        errorField = 'inputSecurityError';
        errorTypeEmpty = 'SECURITY_CODE_REQUIRED';
        errorTypeMinChar = 'SECURITY_CODE_MIN_DIGIT_ERR';
        break;
      case 'inputValueConfirmSecurityCode' :
        errorField = 'inputConfirmSecurityError';
        errorTypeEmpty = 'CONFIRM_SECURITY_CODE_REQUIRED';
        errorTypeMinChar = 'SECURITY_CODE_MIN_DIGIT_ERR';
        break;
      default:
        isFormValid = false
      }
      if(validation.required(this.state[type])){
        this.setState({
          [errorField] : err[errorTypeEmpty]
        })
        isFormValid = false;
        errorReq = false;
      }else if(validation.minChar(this.state[type], (type == 'inputValue' || type == 'inputConfirmValue' ) ? ValidationRules.MinPasswordLength
        : ValidationRules.MinSecurityCodeLength)){
        this.setState({
          [errorField] : err[errorTypeMinChar]
        })
        isFormValid = false;
        errorReq = false;
      }else if((type == 'inputValue' || type == 'inputConfirmValue' ) && validation.checkPasswordStrength(this.state[type])){
        this.setState({
          [errorField] : err.PASSWORD_STRENGTH_ERROR
        })
        isFormValid = false;
        errorReq = false;
      }else if((type == 'inputValuenewSecurityCode' || type == 'inputValueConfirmSecurityCode' ) && validation.checkSecurityCodeStrength(this.state[type])){
        this.setState({
          [errorField] : err.SECURITY_CODE_STRENGTH_ERROR,
        })
        isFormValid = false;
        errorReq = false;
      }
      if(isSubmit && errorReq) {
        if(this.state.inputValue !== this.state.inputConfirmValue){
          this.setState({inputConfirmPasswordError: err.PASSWORD_NOT_MATCH_ERROR, generalError : err.GENERAL_PAGE_ERROR});
          isFormValid = false;
        }
        if(this.state.inputValuenewSecurityCode !== this.state.inputValueConfirmSecurityCode){
          this.setState({inputConfirmSecurityError: err.SECURITY_CODE_MISMATCH, generalError : err.GENERAL_PAGE_ERROR});
          isFormValid = false;
        }
      }

      
    }
    return isFormValid;
  }

  _submitCredential(e) {
    if ( e.keyCode === 13 || e.type === "click" ) {
      if(this._isFormValidate(true)){
        let { userName, challenge} = this.props.data;

        let formData = {
          password: this.state.inputValue,
          pin: this.state.inputValuenewSecurityCode,
          userName: userName,
          journeyId: challenge
        }
        authnGateway.updatePasswordPin(formData)
          .then(responseData => {
            if(responseData.data && responseData.data.status === 'Success'){
              this.props.history.push({pathname: ROUTE_PATH_NAME.NEWSECURITYDETAILSCREATED, state: { text: "security details"}});
            }else if(responseData.data && responseData.data.status === 'Fail'){
              this.setState({ generalError: responseData.errorInfo.errorMessage });
            }
          })
          .catch(() => {
            this.props.history.push(ROUTE_PATH_NAME.ERRORPAGE);
          });
      }else{
        this.setState({
          generalError : err.GENERAL_PAGE_ERROR
        })
      }
     
    }
  }


  render() {
    return (
      <div className="reset-credentials">
        <TitleBlock title="Reset security details" />
        { this.state.generalError 
          ? <div className="align">
            <ErrorBox>
              <p>{this.state.generalError}</p>
            </ErrorBox>
          </div>
          : null
        }

        <div className="align m-b-20">
          <label >
            Please create your new password.
          </label>
        </div>
        <div className="align m-b-10">
          <label>
            For your security your password must contain
            at least 8 characters, including a number and a special 
            character.
          </label>
        </div>
        <div className="form__wrapper">
          <div className="form">
            <form>
              <div className="form__field-wrapper" aria-live="assertive">
                <label id="labelNewPassword" className="form__field-label" htmlFor="NewPassword" ><h2>New password</h2></label>
                <div className="reset-credentials__input-field" >
                  <input 
                    className={"form__field-input" + (this.state.inputPasswordError ? ' form__field-input--error' : '')}
                    type={this.state.inputType} 
                    id="NewPassword"
                    placeholder="New password"
                    onChange={e => this._changeCredential(e,'inputValue', 'inputPasswordError')}
                    onBlur={e => this._validateInputField('inputValue')}
                    autoCorrect="off" 
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.state.inputValue}
                    aria-labelledby="labelNewPassword"
                  />
                  <button className="input-field_masked__span button__toggle" id="NewPasswordMaskButton" onClick={()=>this._changeInputType('inputType')} type="button" tabIndex={0}>{this.state.inputType == "Password" ? `Show` : `Hide` }</button>
                  { this.state.inputPasswordError ? <p role="alert" className="error">{this.state.inputPasswordError}</p> : null }
                </div>
              </div>
              <div className="form__field-wrapper" aria-live="assertive">
                <label id="labelConfNewPassword" className="form__field-label" htmlFor="confirmNewPassword"><h2>Confirm new password</h2></label>
                <div className="reset-credentials__input-field" >
                  <input 
                    className={"form__field-input" + (this.state.inputConfirmPasswordError ? ' form__field-input--error' : '')}
                    type={this.state.confirmInputType} 
                    id="confirmNewPassword"
                    placeholder="Confirm new password"
                    onChange={e => this._changeCredential(e,'inputConfirmValue', 'inputConfirmPasswordError')}
                    onBlur={e => this._validateInputField('inputConfirmValue')}
                    autoCorrect="off" 
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.state.inputConfirmValue}
                    aria-labelledby="labelConfNewPassword"
                  />
                  <button className="input-field_masked__span button__toggle" id="NewConfirmPasswordMaskButton" onClick={()=>this._changeInputType('confirmInputType')} type="button" tabIndex={0}>{this.state.confirmInputType == "Password" ? `Show` : `Hide` }</button>
                  { this.state.inputConfirmPasswordError ? <p role="alert" className="error">{this.state.inputConfirmPasswordError}</p> : null }
                </div>
              </div>

              <div className="m-b-30 m-t-40">
                <label>
                  Please create your new 6-digit security code.
                </label>
              </div>

              <div className="form__field-wrapper" aria-live="assertive">
                <label id="labelNewSecurityCode" className="form__field-label" htmlFor="NewSecurityCode"><h2>New security code</h2></label>
                <div className="reset-credentials__input-field">
                  <input 
                    className={"form__field-input" + (this.state.inputSecurityError ? ' form__field-input--error' : '')}
                    type={this.state.inputSecurityType} 
                    id="NewSecurityCode"
                    placeholder="New security code"
                    onChange={e => this._changeCredential(e,'inputValuenewSecurityCode','inputSecurityError')}
                    onBlur={e => this._validateInputField('inputValuenewSecurityCode')}
                    autoCorrect="off" 
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.state.inputValuenewSecurityCode}
                    aria-labelledby="labelNewSecurityCode"
                  />
                  <button className="input-field_masked__span button__toggle" id="SecurityCodeMaskButton" onClick={()=>this._changeInputType('inputSecurityType')} type="button" tabIndex={0}>{this.state.inputSecurityType == "Password" ? `Show` : `Hide` }</button>
                  { this.state.inputSecurityError ? <p role="alert" className="error">{this.state.inputSecurityError}</p> : null }
                </div>
              </div>
              <div className="form__field-wrapper" aria-live="assertive">
                <label id="labelConfSecurityCode" className="form__field-label" htmlFor="confirmSecurityCode"><h2>Confirm new security code</h2></label>
                <div className="reset-credentials__input-field" >
                  <input 
                    className={"form__field-input" + (this.state.inputConfirmSecurityError ? ' form__field-input--error' : '')}
                    type={this.state.confirmSecurityType} 
                    id="confirmSecurityCode"
                    placeholder="Confirm security code"
                    onChange={e => this._changeCredential(e,'inputValueConfirmSecurityCode','inputConfirmSecurityError')}
                    onBlur={e => this._validateInputField('inputValueConfirmSecurityCode')}
                    autoCorrect="off" 
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.state.inputValueConfirmSecurityCode}
                    aria-labelledby="labelConfSecurityCode"
                  />
                  <button className="input-field_masked__span button__toggle" id="ConfirmSecurityCodeMaskButton" onClick={()=>this._changeInputType('confirmSecurityType')} type="button" tabIndex={0}>{this.state.confirmSecurityType == "Password" ? `Show` : `Hide` }</button>
                  { this.state.inputConfirmSecurityError ? <p role="alert" className="error">{this.state.inputConfirmSecurityError}</p> : null }
                </div>
              </div>
              <div className="form__field-wrapper">
                <button id="buttonSubmit" className="button__submit-btn--next" type="button"  onClick={this._submitCredential} >Save new security details</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

// Which props do we want to inject, given the redux store?
const mapStateToProps = state => {
  return {
    data: state.data
  };
}
export default connect(mapStateToProps)(ResetBothSecurityDetails);
