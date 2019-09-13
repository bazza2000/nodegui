/*
 * MAIN Component.
 * - This component is the Main component.
 *
 * - DO NOT CHANGE THIS.
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('../scss/app.scss');
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ROUTE_PATH_NAME } from './constants/routeConstants';


// imported ROUTES
import App from './routes/App';
import Username from './routes/Username';
import Verify from './routes/Verify';
import ForgotBothCredentials from './routes/ForgotCredentials/ForgotBothCredentials';
import ErrorHandling from './components/ErrorHandling';




// imported components
import Header from './components/Header';
import Footer from './components/Footer';
import IdleTimer from 'react-idle-timer';
import Popup from './components/Popup';

// Which props do we want to inject, given the redux store?
const mapStateToProps = state => {
  return {
    data: state.data
  };
}

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: 240000, // 4 minutes
      extendedTimeout: 900000,  // 15 minutes
      showTimeoutPopup: false,
      finalCountdownTime: 60, //60 seconds
      authChallenge: window.location.search.split("?login_challenge=")[1],
    }
    this.idleTimer = null
    this.onAction = this._onAction.bind(this)
    this.onActive = this._onActive.bind(this)
    this.onIdle = this._onIdle.bind(this)
    this._cancelTimeout = this._cancelTimeout.bind(this)
    this._startFinalCountdown = this._startFinalCountdown.bind(this)
    this.escFunction = this.escFunction.bind(this);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <IdleTimer
              ref={ref => { this.idleTimer = ref }}
              element={document}
              onActive={this.onActive}
              onIdle={this.onIdle}
              onAction={this.onAction}
              debounce={250}
              timeout={this.props.data.extendedTimeout ? this.state.extendedTimeout : this.state.timeout}
            >
              <Header />
              <Container style={{ position: 'relative' }}>
                <div className="body-holder">
                  <Switch>
                    <Route path="/" exact component={App} />
                    <Route path = {ROUTE_PATH_NAME.ENTERUSERNAME} exact component={Username} />
                    <Route path = {ROUTE_PATH_NAME.PROFILEDETAILS} exact component={Verify} />
                    <Route path = {ROUTE_PATH_NAME.FORGOTTENBOTHSECURITYDETAILS} component={ForgotBothCredentials} />
                    <Route path = {ROUTE_PATH_NAME.ERRORPAGE} component={ErrorHandling} />
                  </Switch>
                </div>
              </Container>
              <Footer />
            </IdleTimer>
            {this.state.showTimeoutPopup &&
            <div id="timeOutPopUp" aria-live="assertive" aria-atomic="true">
              <Popup showPopup={this.state.showTimeoutPopup} escAction = {this.escFunction}>
                <p className="bold-text">Your session will time-out in</p>
                <p className="popup__counter-text"><span className="popup__counter">{this.state.finalCountdownTime}</span> seconds</p>
                <button autoFocus id="btnCancelTimeout" className="button__submit-btn--next m-b-0" onClick={this._cancelTimeout} onKeyDown={this._cancelTimeout}>Stay logged in</button>
                <button id="btnTimeout" className="button__submit-btn--other m-b-0 m-t-10" type="button" onClick={() => window.location.href = ROUTE_PATH_NAME.ENTERUSERNAME + "?login_challenge=" + this.props.data.challenge}>Time-out</button>
              </Popup>
            </div>
            }
          </div>
        </Router>
      </div>
    )
  }

  _onAction(e) {
    //console.log('user did something', e)
  }

  _onActive(e) {
    //console.log('user is active', e)
    //console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  _onIdle(e) {
    //console.log('user is idle', e)
    //console.log('last active', this.idleTimer.getLastActiveTime())
    // show popup
    this.setState({
      showTimeoutPopup: true
    });
    this._startFinalCountdown();
  }

  _startFinalCountdown() {
    this._finalCountdown = setInterval(() => {
      if ( this.state.finalCountdownTime < 1 ) {
        window.location.href = ROUTE_PATH_NAME.ENTERUSERNAME + "?login_challenge=" + this.state.authChallenge;
      } else {
        this.setState({
          finalCountdownTime: this.state.finalCountdownTime - 1
        });
      }
    }, 1000)
  }

  _cancelTimeout(e) {
    if ( e.keyCode === 13 || e.type === "click" || e.keyCode ===  27) {
      clearInterval(this._finalCountdown);
      // hide popup
      this.setState({
        showTimeoutPopup: false,
        finalCountdownTime: 30
      })
    }
  }
  escFunction(){
    let event = {
      keyCode:27
    }
    if(event.keyCode === 27) {
      this._cancelTimeout(event)
    }
  }

}

export default connect(mapStateToProps)(Main);
