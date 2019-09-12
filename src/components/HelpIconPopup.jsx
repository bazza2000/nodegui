/*
 * HelpIconPopup Component.
 * - Load using <HelpIconPopup defaultIcon={helpIcon} hoverIcon={hoverHIcon} showPopup={showHelpIconPopup} popupContent={popupContent} />.
 * - Use camel case for method names and prepend with '_' unless default react method.
 * 
 * dumb component.
 */

import React from 'react';

class HelpIconPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: this.props.showPopup
    };
    this._togglePopup = this._togglePopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
  }

  // Methods
  componentDidUpdate(prevProps) {
    // prevent endless update loop when changing state on component update.
    if ( this.props.showPopup !== prevProps.showPopup ) {
      this.setState({
        showPopup: this.props.showPopup
      });
    }
  }

  _togglePopup(e) {
    if ( e.keyCode === 13 || e.type === "click" ) {
      if (this.state.showPopup) {
        this.setState({
          showPopup: false
        });
      } else {
        this.setState({
          showPopup: true
        });
      }
    }
  }

  _closePopup() {
    this.setState({
      showPopup: false
    });
  }

  render() {
    return (
      <div className="help-icon-popup">
        <a tabIndex={0} className="header__question-mark" onClick={this._togglePopup} onKeyDown={this._togglePopup}>
          <img
            className="header__content--icons"
            src={this.props.defaultIcon}
            onMouseOver={e => e.currentTarget.src = this.props.hoverIcon}
            onMouseOut={e => e.currentTarget.src = this.props.defaultIcon}
            alt="go to help" />
        </a>
        { this.state.showPopup
          ? <div>
            <div className="help-icon-popup__close-detector" onClick={this._closePopup}></div>
            <div className="help-icon-popup__popup">
              { this.props.popupContent ? this.props.popupContent : <p>No help text supplied</p>}
              <div className="help-icon-popup__triangle triangle"></div>
              <div className="help-icon-popup__close">
                <a onClick={this._togglePopup} onKeyDown={this._togglePopup} tabIndex={0}>x</a>
              </div>
            </div>
          </div>
          : null 
        }
      </div>
    );
  }

}

export default HelpIconPopup;