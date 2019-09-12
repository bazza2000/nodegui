import React, { Component } from 'react';
import { connect } from "react-redux";
import Popup from './Popup';
import { SCA_PREFERENCE } from '../constants/appConstants';
import authnGateway from '../utils/authnGateway/authnGateway';

const mapStateToProps = ({data}) =>{
  return {
    challenge:data.challenge
  }
}
class DefaultPrefPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPopup: this.props.displayPopup,
      objContext : {
        title:'',
        content:'',
        preference:''
      }
    };
  }

  componentDidMount() {
    if(this.props.displayPopup) {
      this._getContext(this.props.scaPreference);
    }
  }

  _getContext(scaPreference) {
    let objData = {};
    switch(scaPreference) {
    case SCA_PREFERENCE.MOBILEAPP_PREF:
      objData = {
        title:'Use the app each time you verify?',
        content:`You will be prompted to use the app each time you need to verify its's you.`
      }
      break;
    case SCA_PREFERENCE.EMAIL_PREF:
      objData = {
        title:`Use ${this.props.profile.email} each time you verify?`,
        content:`Your code will automatically be sent to your email when you need to verify it's you.`
      }
      break;
    case SCA_PREFERENCE.TEXT_PREF:
      objData = {
        title:`Use ${this.props.profile.mobile} each time you verify?`,
        content:`Your code will automatically be sent to your mobile when you need to verify it's you.`
      }
      break;
    default:
    }
    this.setState({objContext:objData});

  }

  _setDefaultAuthMethod(e, decision) {
    if (e.keyCode === 13 || e.type === "click") {
      let updatedSCAPreference = '';
      let selectedPreference = this.props.scaPreference;
      if(decision === "no"){
        updatedSCAPreference = this.props.profile.scaPreference;
      } else {
        updatedSCAPreference = this.props.scaPreference;
      }
      authnGateway.updateScaPreference({
        userName: this.props.userName,
        scaPreference: updatedSCAPreference,
        journeyId: this.props.challenge,
        showOTPDefaultSCAPopup: (selectedPreference === SCA_PREFERENCE.TEXT_PREF) ? "N" : this.props.profile.showOTPDefaultSCAPopup,
        showEmailDefaultSCAPopup: (selectedPreference === SCA_PREFERENCE.EMAIL_PREF) ? "N" : this.props.profile.showEmailDefaultSCAPopup,
        showMobileAppDefaultSCAPopup: (selectedPreference === SCA_PREFERENCE.MOBILEAPP_PREF) ? "N" : this.props.profile.showMobileAppDefaultSCAPopup
      }).then(response => {
        this.setState({
          displayPopup : false
        },()=>{
          if(this.props.isRedirectionRequired) this.props._getRedirection();
        });
      }).catch(
        err => {
          console.log(err);
        }
      )
    }
  }

  render() {
    return (
      <Popup showPopup = {this.state.displayPopup} on="focus" >
        <div>
          <p tabIndex={0} className="tabIndex"><strong>{this.state.objContext.title}</strong></p>
          <p tabIndex={0} className="tabIndex m-b-20">{this.state.objContext.content}</p>
        </div>
        <div className="button__submit-btn-wrapper">
          <button id="btnSubmitDefaultPreference" className="button__submit-btn--next m-b-10" type="button" onClick={event => this._setDefaultAuthMethod(event, "yes")} onKeyDown={event => this._setDefaultAuthMethod(event, "yes")}>Yes, set as default</button>
          <button id="btnCancelDefaultPreference" className="button__submit-btn--other" type="button" onClick={event => this._setDefaultAuthMethod(event, "no")} onKeyDown={event => this._setDefaultAuthMethod(event, "no")}>No, only this once</button>
        </div>
      </Popup>
    )
  }
}

export default connect(mapStateToProps)(DefaultPrefPopUp);
