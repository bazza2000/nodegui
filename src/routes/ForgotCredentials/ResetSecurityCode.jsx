import React, { Component } from 'react';
import { connect } from 'react-redux';
import TitleBlock from '../../components/TitleBlock';
import { validation } from '../../utils/validation/index';
import { err } from '../../constants/messageConstants';
import authnGateway from '../../utils/authnGateway/authnGateway';
import { ROUTE_PATH_NAME } from '../../constants/routeConstants';
import { actions } from '../../actions/indexActions';
import { ValidationRules } from '../../constants/commonConstants';
import ErrorBox from '../../components/ErrorBox';
import nodeLogServer from '../../utils/nodeLogServer/nodeLogServer';

class ResetSecurityCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSecurityCodeError:null,
      inputConfirmSecurityCodeError:null,
      inputValue:'',
      inputConfirmValue:'',
      inputType:'Password',
      confirmInputType:'Password',
      generalError:null,
    }
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
    nodeLogServer.log({ identifier: "DAUTH-626", reactRoute: window.location.pathname });
        
    // update current path location
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
  }

  _isFormValidate(){
    let isFormValid = true;
    Object.keys(this.state).forEach(type => {
      isFormValid = this._validateInputField(type, isFormValid);
    });
    return isFormValid;
  }

  _validateInputField(type ,isFormValid){
    if(type === 'inputValue' || type === 'inputConfirmValue'){
      let errorType = (type == 'inputValue') ? 'inputSecurityCodeError' : 'inputConfirmSecurityCodeError';
      if(validation.required(this.state[type])){
        this.setState({
          [errorType] : (type == 'inputValue') ? err.SECURITY_CODE_REQUIRED : err.CONFIRM_SECURITY_CODE_REQUIRED
        })
        isFormValid = false;
      }else if(validation.minChar(this.state[type], ValidationRules.MinSecurityCodeLength)){
        this.setState({
          [errorType] : err.SECURITY_CODE_MIN_DIGIT_ERR
        })
        isFormValid = false;
      }else if(validation.checkSecurityCodeStrength(this.state[type])){
        this.setState({
          [errorType] : err.SECURITY_CODE_STRENGTH_ERROR,
        })
        isFormValid = false;
      }
    }
    return isFormValid;
  }

  _submitCredential(e) {

    if ( e.keyCode === 13 || e.type === "click" ) {
      if(this._isFormValidate()){
        if(this.state.inputValue !== this.state.inputConfirmValue){
          this.setState({inputConfirmSecurityCodeError: err.SECURITY_CODE_MISMATCH, generalError: err.GENERAL_PAGE_ERROR})
        }else{
          let { userName, challenge } = this.props.data;
          let formData = {
            pin: this.state.inputValue,
            userName: userName,
            journeyId: challenge
          }
          authnGateway.updatePasswordPin(formData)
            .then(responseData => {
              if(responseData.data && responseData.data.status === 'Success'){
                this.props.history.push({pathname: ROUTE_PATH_NAME.NEWSECURITYDETAILSCREATED, state: { text: "security code"}});
              }else if(responseData.data && responseData.data.status === 'Fail'){
                this.setState({ generalError: responseData.errorInfo.errorMessage });
              }
            })
            .catch(() => {
              this.props.history.push(ROUTE_PATH_NAME.ERRORPAGE);
            });
        }
      }else{
        this.setState({
          generalError : err.GENERAL_PAGE_ERROR
        })
      }
    }
  }

  _changeInputType(type) {
    let currentType = (this.state[type] == "Password") ? "Text" : "Password";
    this.setState({
      [type]: currentType
    })
  }

  _changeCredential(e, stateV) {
    let errorType = (e.currentTarget.id == 'NewSecurityCode') ? 'inputSecurityCodeError' : 'inputConfirmSecurityCodeError';
    let inputValue = e.currentTarget.value.replace(/\D/g,''); // remove all non numeric
    if(validation.maxChar(e.currentTarget.value, ValidationRules.MaxSecurityCodeLength)){
      this.setState({
        [errorType] : err.SECURITY_CODE_MAX_DIGIT_ERR
        // [stateV]:inputValue
      })
    } else if(validation.numbersOnly(e.currentTarget.value)){
      this.setState({
        [errorType] : err.INVALID_SECURITY_CODE,
        [stateV]:inputValue
      })
    } else {
      this.setState({
        [errorType] : null,
        [stateV]:inputValue
      })
    }
  }

  render() {
    return (
      <div className="reset-credentials">
        <TitleBlock title="Reset security code"/>
        { this.state.generalError
          ? <div className="align">
            <ErrorBox>
              <p>{this.state.generalError}</p>
            </ErrorBox>
          </div>
          : null
        }
        <div className="align m-b-10" >
          <label>
          Please create your new 6-digit security code.
          </label>
        </div>
        <div className="form__wrapper">
          <div className="form">
            <form>
              <div className="form__field-wrapper" aria-live="assertive" aria-atomic="true">
                <label id="labelSecurityCode" className="form__field-label" htmlFor="NewSecurityCode"><h2>New security code</h2></label>
                <div className="reset-credentials__input-field">
                  <input 
                    className={"form__field-input" + (this.state.inputSecurityCodeError ? ' form__field-input--error' : '')}
                    type={this.state.inputType} 
                    id="NewSecurityCode"
                    placeholder="Enter security code"
                    onChange={e => this._changeCredential(e,'inputValue')}
                    onBlur={() => this._validateInputField('inputValue')}
                    autoCorrect="off" 
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.state.inputValue}
                    // maxLength={ValidationRules.MaxSecurityCodeLength}
                    aria-labelledby="labelSecurityCode"
                  />
                  <button className="input-field_masked__span button__toggle" id="SecurityCodeMaskButton" onClick={()=>this._changeInputType('inputType')} type="button">{(this.state.inputType == 'Password') ? `Show` : `Hide`}</button>
                  { this.state.inputSecurityCodeError ? <p role="alert" className="error">{this.state.inputSecurityCodeError}</p> : null }
                </div>
              </div>
              <div className="form__field-wrapper" aria-live="assertive" aria-atomic="true">
                <label id="labelConfirmSecurityCode" className="form__field-label" htmlFor="confirmSecurityCode"><h2>Confirm new security code</h2></label>
                <div className="reset-credentials__input-field">
                  <input 
                    className={"form__field-input" + (this.state.inputConfirmSecurityCodeError ? ' form__field-input--error' : '')}
                    type={this.state.confirmInputType} 
                    id="confirmSecurityCode"
                    placeholder="Confirm security code"
                    onChange={e => this._changeCredential(e,'inputConfirmValue')}
                    onBlur={() => this._validateInputField('inputConfirmValue')}
                    autoCorrect="off" 
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.state.inputConfirmValue}
                    // maxLength={ValidationRules.MaxSecurityCodeLength}
                    aria-labelledby="labelConfirmSecurityCode"
                  />
                  <button className="input-field_masked__span button__toggle" id="ConfirmSecurityCodeMaskButton" onClick={()=>this._changeInputType('confirmInputType')} type="button">{(this.state.confirmInputType == 'Password') ? `Show` : `Hide`}</button>
                  { this.state.inputConfirmSecurityCodeError ? <p role="alert" className="error">{this.state.inputConfirmSecurityCodeError}</p> : null }
                </div>
              </div>
              <div className="form__field-wrapper">
                <button id="buttonSubmit" className="button__submit-btn--next" type="button"  onClick={this._submitCredential} >Save new security code</button>
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

export default connect(mapStateToProps)(ResetSecurityCode);