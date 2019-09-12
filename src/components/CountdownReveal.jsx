/*
 * CountdownReveal Component.
 * - Load using <CountdownReveal seconds={30} hiddenContent={HTML}/>.
 * - Use camel case for method names and prepend with '_' unless default react method.
 * 
 * Smart component.
 */

import React from 'react';

class CountdownReveal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showHidden: false,
      showZero: false,
      seconds: this.props.seconds
    };
    this._showHiddenContent = this._showHiddenContent.bind(this);
  }

  componentDidMount() {
    let countdownInterval = setInterval(() => {
      if ( this.state.seconds > 1 ) {

        // check to display zero
        if ( this.state.seconds <= 10 ){
          this.setState({
            seconds: this.state.seconds -1,
            showZero: true
          });
        } else {
          this.setState({
            seconds: this.state.seconds -1,
            showZero: false
          });
        }

      } else {
        clearInterval(countdownInterval);
        this._showHiddenContent();
      }
    }, 1000);
  }

  _showHiddenContent(e){
    this.setState({
      showHidden: true
    });
  }

  render() {
    return (
      <div className="countdown-reveal m-b-60 m-t--30">
        { !this.state.showHidden
          ? <p>You can resend your code if it doesn’t arrive in 0:{this.state.showZero ? '0' : null}{this.state.seconds}</p>
          : <div>{this.props.hiddenContent}</div>
        }
      </div>
    );
  }

}

export default CountdownReveal;