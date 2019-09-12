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
const helpIcon = require(`./../../../img/help.png`);
const hoverHIcon = require(`./../../../img/help-h.png`);
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import HelpIconPopup from '../../components/HelpIconPopup'

class ForgotUsername extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmailAddressError:null,
      inputConfirmEmailAddressError:null,
      inputType:'Password',
      confirmInputType:'Password',
      inputValue:'',
      inputConfirmValue:'',
      generalError:null
    }
    this._backToUsername = this._backToUsername.bind(this);
    this._submitCredential = this._submitCredential.bind(this);
  }

  // Methods
  componentDidMount() {
    window.scrollTo(0, 0);

    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-1137", reactRoute: window.location.pathname });

    // update current path location
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
  }

  _backToUsername(e){
    if ( e.keyCode === 13 || e.type === "click" )
      this.props.history.push(ROUTE_PATH_NAME.ENTERUSERNAME);
  }
  _isFormValidate(){
    let isFormValid = true;
    Object.keys(this.state).forEach(type => {
      if(type === 'inputValue' || type === 'inputConfirmValue'){
        isFormValid = this._validateInputField(type ,isFormValid);
      }
    });
    return isFormValid;
  }

  _validateInputField(type , isFormValid) {
    let errorType = (type == 'inputValue') ? 'inputEmailAddressError' : 'inputConfirmEmailAddressError';
    if(validation.required(this.state[type])){
      this.setState({
        [errorType] : (type == 'inputValue') ? err.EMAIL_ADDRESS_ERROR : err.EMAIL_ADDRESS_ERROR
      })
      isFormValid = false;
    }else if(validation.regCheckValidityOfAEmailString(this.state[type], ValidationRules.EmailAddressMinLength, ValidationRules.EmailAddressMaxLength)){
      this.setState({
        [errorType] : err.EMAIL_ADDRESS_ERROR
      })
      isFormValid = false;
    }else{
      this.setState({
        [errorType] : null
      })
    }
    return isFormValid;
  }

  _submitCredential(e) {
    if ( e.keyCode === 13 || e.type === "click" ) {
      if(this._isFormValidate()){
        if(this.state.inputValue !== this.state.inputConfirmValue){
          this.setState({inputConfirmEmailAddressError: err.EMAIL_ADDRESS_NOT_MATCH_ERROR, generalError: err.GENERAL_PAGE_ERROR});
        } else {
          let formData = {
            email: this.state.inputValue,
            journeyId: this.props.data.challenge
          }
          authnGateway.sendUsernameEmail(formData)
            .then(responseData => {
              if(responseData.data && responseData.data.status === 'Success'){
                this.props.history.push({pathname: ROUTE_PATH_NAME.FORGOTUSERNAMESUCCESS, state: { email: this.state.inputValue}});
              } else if(responseData.data && responseData.data.status === 'Failed'){
                this.setState({ generalError: responseData.errorInfo.errorMessage });
              }
            })
            .catch(err => {
              this.setState({ generalError: err.message },()=>{
                this.props.history.push(ROUTE_PATH_NAME.ERRORPAGE);
              });
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
    this.setState({
      [stateV]:e.currentTarget.value
    })
  }

  render() {
    return (
      <div className="forgot-username">
        <TitleBlock title="Forgotten your username?" />
        <hr className="hr__forgot-username--margin m-t-30 m-b-30" />
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
            Please enter the email address you registered with, and we'll send you a username reminder.
          </label>
        </div>


        <div className="form__wrapper">
          <div className="form">
            <form>
              <div className="form__field-wrapper" aria-live="assertive" aria-atomic="true">
                <label id="labelEmailAddress" className="form__field-label" htmlFor="Your email address"><h2>Your email address</h2>
                  <HelpIconPopup
                    defaultIcon={helpIcon}
                    hoverIcon={hoverHIcon}
                    showPopup={false}
                    popupContent={<p>Please enter the email address you use for online banking</p>}
                  />
                </label>
                <div className="reset-credentials__input-field">
                  <input
                    className={"form__field-input" + (this.state.inputEmailAddressError ? ' form__field-input--error' : '')}
                    type={this.state.inputType}
                    id="EmailAddress"
                    placeholder="Enter email address"
                    onChange={e => this._changeCredential(e,'inputValue')}
                    onBlur={() => this._validateInputField('inputValue')}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.state.inputValue}
                    aria-labelledby="labelEmailAddress"
                  />
                  <button className="input-field_masked__span button__toggle" id="EmailAddressMaskButton" onClick={()=>this._changeInputType('inputType')} type="button">{(this.state.inputType == 'Password') ? `Show` : `Hide`}</button>
                  { this.state.inputEmailAddressError ? <p role="alert" className="error">{this.state.inputEmailAddressError}</p> : null }
                </div>
              </div>
              <div className="form__field-wrapper" aria-live="assertive" aria-atomic="true">
                <label id="labelEmailAddress" className="form__field-label" htmlFor="Confirm email address"><h2>Confirm email address</h2></label>
                <div className="reset-credentials__input-field">
                  <input
                    className={"form__field-input" + (this.state.inputConfirmEmailAddressError ? ' form__field-input--error' : '')}
                    type={this.state.confirmInputType}
                    id="confirmEmailAddress"
                    placeholder="Confirm email address"
                    onChange={e => this._changeCredential(e,'inputConfirmValue')}
                    onBlur={() => this._validateInputField('inputConfirmValue')}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    value={this.state.inputConfirmValue}
                    aria-labelledby="labelEmailAddress"
                  />
                  <button className="input-field_masked__span button__toggle" id="ConfirmEmailAddressMaskButton" onClick={()=>this._changeInputType('confirmInputType')} type="button">{(this.state.confirmInputType == 'Password') ? `Show` : `Hide`}</button>
                  { this.state.inputConfirmEmailAddressError ? <p role="alert" className="error">{this.state.inputConfirmEmailAddressError}</p> : null }
                </div>
              </div>
              <Row className="form__field-wrapper">
                <div className="col-sm-12 col-md-6"><button id="buttonSubmit" className="button__submit-btn--next" type="button" onClick={this._submitCredential} >OK</button></div>
                <div className="col-sm-12 col-md-6"><button id="buttonCancel" className="button__submit-btn--other" type="button" onClick={this._backToUsername} >Cancel</button></div>
              </Row>
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

export default connect(mapStateToProps)(ForgotUsername);
