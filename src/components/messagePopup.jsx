/*
 * Message Popup Component.
 * - Load using <MessagePopup showPopup={false} />.
 * - Use camel case for method names and prepend with '_' unless default react method.
 * Available Props
 * status: Failed/Success
 * message: string
 * buttonLabel: string
 * redirectURL : if any
 * Smart component.
 */

import React from 'react';
import Popup from '../components/Popup';
const successIcon = require(`../../img/Success.png`);
const errorIcon = require(`../../img/Error.png`);
import { CommonLabels } from '../constants/commonConstants';

class MessagePopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: this.props.showPopup,
      status: this.props.status,
      message: this.props.message,
      buttonLabel: this.props.buttonLabel,
      redirectURL: this.props.redirectURL,
    };
  }

  // Methods
  componentDidUpdate(prevProps) {
    // prevent endless update loop when changing state on component update.
    if ( this.props.showPopup !== prevProps.showPopup ) {
      this.setState({
        showPopup: this.props.showPopup,
        status: this.props.status,
        message: this.props.message,
        buttonLabel: this.props.buttonLabel,
        redirectURL: this.props.redirectURL,
      });
    }
  }

  _redirectTo(){
    if(this.state.redirectURL){
      this.props.history.push(this.state.redirectURL);
    }else{
      this.setState({showPopup: false});
    }
    
  }
  
  render() {
    return (
      <div>
        <Popup showPopup={this.state.showPopup}>
          {/* If success */}
          <div>
            <p><strong><img src={this.state.status === CommonLabels.SUCCESS ? successIcon : errorIcon} alt={this.state.status} /></strong></p>
            <p className="m-b-20">{this.state.message}</p>
          </div>
          <div className="button__submit-btn-wrapper m-b-0">
            <button id="btnClosePopup" className="button__submit-btn--next m-b-0" autoFocus type="button" onClick={() => this._redirectTo()} onKeyDown={() => this._redirectTo()}>{this.state.buttonLabel}</button>
          </div>
        </Popup>
      </div>
    );
  }

}

export default MessagePopup;