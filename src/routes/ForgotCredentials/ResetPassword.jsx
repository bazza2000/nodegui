import React from 'react';
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

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputPasswordError:null,
      inputConfirmPasswordError:null,
      inputValue:'',
      inputConfirmValue:'',
      inputType:'Password',
      confirmInputType:'Password',
      generalError:null
    }

    this._submitCredential = this._submitCredential.bind(this);

  }

  // Methods
  componentDidMount() {
    window.scrollTo(0, 0);

    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-625", reactRoute: window.location.pathname });

    // update current path location
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
  }

  // disabled back button
  componentWillMount() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
      window.scrollTo(0, 0);
    });
  }

  _isFormValidate(){
    let isFormValid = true;
    Object.keys(this.state).forEach(type => {
      isFormValid = this._validateInputField(type ,isFormValid);
    });
    return isFormValid;
  }

  _validateInputField(type , isFormValid) {
    if(type === 'inputValue' || type === 'inputConfirmValue'){
      let errorType = (type == 'inputValue') ? 'inputPasswordError' : 'inputConfirmPasswordError';
      if(validation.required(this.state[type])){
        this.setState({
          [errorType] : (type == 'inputValue') ? err.NEW_PASSWORD_ERROR : err.CONFIRM_NEW_PASSWORD_ERROR
        })
        isFormValid = false;
      }else if(validation.minChar(this.state[type], ValidationRules.MinPasswordLength)){
        this.setState({
          [errorType] : err.PASSWORD_MINCHAR
        })
        isFormValid = false;
      }else if(validation.specialCharacters(this.state[type])){
        this.setState({
          [errorType] : err.PASSWORD_REQUIRED
        })
        isFormValid = false;
      }else if(validation.checkPasswordStrength(this.state[type])){
        this.setState({
          [errorType] : err.PASSWORD_STRENGTH_ERROR
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
          this.setState({inputConfirmPasswordError: err.PASSWORD_NOT_MATCH_ERROR, generalError: err.GENERAL_PAGE_ERROR});
        }else {
          let { userName, challenge } = this.props.data;
          let formData = {
            password: this.state.inputValue,
            userName: userName,
            journeyId: challenge
          }
          authnGateway.updatePasswordPin(formData)
            .then(responseData => {
              if(responseData.data && responseData.data.status === 'Success'){
                this.props.history.push({pathname: ROUTE_PATH_NAME.NEWSECURITYDETAILSCREATED, state: { text: "password"}});
              } else if(responseData.data && responseData.data.status === 'Fail'){
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
    let errorType = (e.currentTarget.id == 'NewPassword') ? 'inputPasswordError' : 'inputConfirmPasswordError';
    if(validation.maxChar(e.currentTarget.value, ValidationRules.MaxPasswordLength)){
      this.setState({
        [errorType] : err.PASSWORD_MAXCHAR
      })
    }else{
      this.setState({
        [errorType] : null,
        [stateV]:e.currentTarget.value
      })
    }
  }

  render() {
    return (
      <div className="reset-credentials">
        <TitleBlock title="Reset password" />
        { this.state.generalError
          ? <div className="align" >
            <ErrorBox>
              <p>{this.state.generalError}</p>
            </ErrorBox>
          </div>
          : null
        }
        <div className="align m-b-10">
          <label >
            Please create your new password.
          </label>
        </div>
        <div className="align m-b-10 m-t-10">
          <label >
            For your security your password  must contain at least 8 characters, including a number and a special character.
          </label>
        </div>
        <div className="form__wrapper">
          <div className="form">
            <form>
              <div className="form__field-wrapper" aria-live="assertive" aria-atomic="true">
                <label id="labelPassword" className="form__field-label" htmlFor="NewPassword"><h2>New password</h2></label>
                <div className="reset-credentials__input-field">
                  <input 
                    className={"form__field-input" + (this.state.inputPasswordError ? ' form__field-input--error' : '')}
                    type={this.state.inputType} 
                    id="NewPassword"
                    placeholder="Enter password"
                    onChange={e => this._changeCredential(e,'inputValue')}
                    onBlur={() => this._validateInputField('inputValue')}
                    autoCorrect="off" 
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.state.inputValue}
                    aria-labelledby="labelPassword"
                  />
                  <button className="input-field_masked__span button__toggle" id="NewPasswordMaskButton" onClick={()=>this._changeInputType('inputType')} type="button">{(this.state.inputType == 'Password') ? `Show` : `Hide`}</button>
                  { this.state.inputPasswordError ? <p role="alert" className="error">{this.state.inputPasswordError}</p> : null }
                </div>
              </div>
              <div className="form__field-wrapper" aria-live="assertive" aria-atomic="true">
                <label id="labelConfirmPassword" className="form__field-label" htmlFor="confirmNewPassword"><h2>Confirm new password</h2></label>
                <div className="reset-credentials__input-field">
                  <input 
                    className={"form__field-input" + (this.state.inputConfirmPasswordError ? ' form__field-input--error' : '')}
                    type={this.state.confirmInputType} 
                    id="confirmNewPassword"
                    placeholder="Confirm password"
                    onChange={e => this._changeCredential(e,'inputConfirmValue')}
                    onBlur={() => this._validateInputField('inputConfirmValue')}
                    autoCorrect="off" 
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.state.inputConfirmValue}
                    aria-labelledby="labelConfirmPassword"
                  />
                  <button className="input-field_masked__span button__toggle" id="NewConfirmPasswordMaskButton" onClick={()=>this._changeInputType('confirmInputType')} type="button">{(this.state.confirmInputType == 'Password') ? `Show` : `Hide`}</button>
                  { this.state.inputConfirmPasswordError ? <p role="alert" className="error">{this.state.inputConfirmPasswordError}</p> : null }
                </div>
              </div>
              <div className="form__field-wrapper">
                <button id="buttonSubmit" className="button__submit-btn--next" type="button" onClick={this._submitCredential} >Save new password</button>
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

export default connect(mapStateToProps)(ResetPassword);