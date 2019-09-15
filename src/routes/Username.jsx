/*
 * Username Route Component.
 * - This component is rendered if the '/EnterUsername' route is called.
 * - Use camel case for method names and prepend with '_' unless default react method.
 *
 * Smart component - uses Redux..
 */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions/indexActions';
import cookie from '../utils/cookies';
import _minutesCountdown from '../utils/_minutesCountdown';
import { ROUTE_PATH_NAME } from '../constants/routeConstants';
import nodeLogServer from '../utils/nodeLogServer/nodeLogServer';
import authnGateway from '../utils/authnGateway/authnGateway';
import { Link } from 'react-router-dom';
import { _getQueryStringParam } from '../utils/_getQueryStringParam';

// imported components
import LoadingBtn from '../components/LoadingBtn';
import TitleBlock from '../components/TitleBlock';
import ErrorBox from '../components/ErrorBox';
import Hr from '../components/Hr';

// validation
import { validation } from '../utils/validation/index';

// images


//imported validation messages
import { err } from '../constants/messageConstants';

// Which props do we want to inject, given the redux store?
const mapStateToProps = state => {
  return {
    data: state.data
  };
}

class Username extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentlySending: false,
      usernameError: null,
      generalError: null,
      rememberUsername: false,
      loginErrorCountDown: this.props.data.profile.loginErrorCountDown ? _minutesCountdown(this.props.data.profile.loginErrorCountDown) : ''
    };
    this._submitUsername = this._submitUsername.bind(this);
    this._changeUsername = this._changeUsername.bind(this);
    this._rememberUsername = this._rememberUsername.bind(this);
    this._changeTimeout = this._changeTimeout.bind(this);
  }

  // disabled back button
  componentWillMount() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
      window.scrollTo(0, 0);
    });
  }

  // Methods
  componentDidMount() {
    window.scrollTo(0, 0);

    // log to node-log-server
    nodeLogServer.log({identifier: "VSD-3", reactRoute: window.location.pathname});

    const errorCountdown = setInterval (() => {
      if ( this.state.loginErrorCountDown === "00:00:01") {
        this.setState({
          loginErrorCountDown: '',
        });
        // remove error from redux store
        this.props.dispatch(actions.changeProfileData({status: ''}));

        clearInterval(errorCountdown);
      } else {
        this.setState({
          loginErrorCountDown: _minutesCountdown(this.state.loginErrorCountDown)
        });
      }
    }, 1000);

    this.setState({
      alreadyRegistered: _getQueryStringParam("already_registered", window)
    });

    // set username if in cookie
    let usernameCookie = cookie.read('customerUsername');
    if (usernameCookie) {
      this.props.dispatch(actions.changeUsername(usernameCookie));
    }

  }

  _submitUsername(e) {
    if (e.keyCode === 13 || e.type === "submit") {
      e.preventDefault();
      this.setState({
        currentlySending: true
      });

      // validate
      if (validation.required(this.props.data.userName) ||
        validation.specialCharacters(this.props.data.userName) ||
        validation.minChar(this.props.data.userName, 3)) {
        this.setState({
          currentlySending: false,
          usernameError: err.USERNAME_REQUIRED
        });
      } else {

        authnGateway.login({
          "username": this.props.data.userName,
          "password": this.props.data.password,
          "journeyId": this.props.data.challenge
        })
          .then(user => {

            // set errorMessage to profile
            let profileData = user;
            this.props.dispatch(actions.changeUserProfile(profileData));


            this.props.history.push(ROUTE_PATH_NAME.PROFILEDETAILS);

          })
          .catch(err => {
            this.setState({ usernameError: err.message, currentlySending: false },()=>{
              this.props.history.push(ROUTE_PATH_NAME.ERRORPAGE);
            });
          });
      }

    } else if (e.keyCode === 9 || e.keyCode === 16) {
      // don't intercept - it's tabbing (accessibility)
    } else {
      e.preventDefault();
    }
  }

  _changeUsername(e) {
    // validate
    if (validation.required(e.currentTarget.value)) {
      this.setState({
        usernameError: err.USERNAME_REQUIRED
      });
    } else {
      this.setState({
        usernameError: null
      });
    }

    // remove 'bad' characters.
    const value = e.currentTarget.value.replace(/</g, "").replace(/>/g, "");
    this.props.dispatch(actions.changeUsername(value));
  }

  _changeTimeout(e) {
    this.props.dispatch(actions.changeExtendedTimeout(e.currentTarget.checked));
  }

  _rememberUsername(e) {
    this.props.dispatch(actions.changeRememberUsername(e.currentTarget.checked));
  }

  render() {
    return (
      <div>

        <TitleBlock title="Log in"/>

        <div className="form__wrapper">

          {/* Load correct Username Error */}
          { this.props.data.profile.status === "login.fail"
            ? <div className="align">
              <ErrorBox>
                <p>{err.USERNAME_LOGIN_FAIL}</p>
                {/* IF already registered and redirected from registration */}
              </ErrorBox>
            </div>
            : null
          }

          { this.props.data.profile.status === "login.lastAttempt"
            ? <div className="align">
              <ErrorBox>
                <p>{err.USERNAME_LOGIN_LAST_ATTEMPT}</p>
              </ErrorBox>
            </div>
            : null
          }

          { this.props.data.profile.status === "login.countdown"
            ? <div className="align">
              <ErrorBox>
                <p>{err.USERNAME_LOGIN_COUNTDOWN +" "+ this.state.loginErrorCountDown}</p>
              </ErrorBox>
            </div>
            : null
          }

          { this.props.data.profile.status === "login.locked"
            ? <div className="align">
              <ErrorBox>
                <p>{err.USERNAME_LOGIN_LOCKED}</p>
              </ErrorBox>
            </div>
            : null
          }

          {/* Already registered and come from registration journey */}
          { this.state.alreadyRegistered
            ? <div className="align">
              <ErrorBox>{err.ALREADY_REGISTERED}</ErrorBox>
            </div>
            : null
          }

          <div className="form">
            <form onSubmit={this._submitUsername}>

              <div className="form__field-wrapper">
                <label className="form__field-label" htmlFor="username"><h2>Enter username</h2></label>
                <input
                  className={"form__field-input" + (this.state.usernameError ? ' form__field-input--error' : '')}
                  type="text"
                  id="username"
                  placeholder="username"
                  onChange={this._changeUsername}
                  autoCorrect="off"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  value={this.props.data.userName}
                  maxLength="30"
                />
                {this.state.usernameError ? <p className="error">{this.state.usernameError}</p> : null}
              </div>

              <div className="form__field-wrapper">
                <label className="form__field-label" htmlFor="password">Password</label>
                <input
                  className={"form__field-input m-b-10" + (this.state.passwordError ? ' form__field-input--error' : '')}
                  id="password"
                  onChange={this._changePassword}
                  type="password"
                  placeholder=""
                  value={this.state.password}
                />
                {this.state.passwordError ? <p className="error">{this.state.passwordError}</p> : null}
              </div>

              <div className="button__submit-btn-wrapper">
                {this.state.currentlySending
                  ? <LoadingBtn />
                  : <button disabled={this.state.loginErrorCountDown || this.props.data.profile.status === "login.locked" ? 'disabled' : '' } className={this.state.loginErrorCountDown || this.props.data.profile.status === "login.locked" ? "button__submit-btn--blocked" : "button__submit-btn--next"} type="submit">Next</button>
                }
                {this.state.generalError ? <p className="error">{this.state.generalError}</p> : null}
              </div>
              <p className="text-center"><Link to={ROUTE_PATH_NAME.FORGOTTENBOTHSECURITYDETAILS}>Forgotten your login details?</Link></p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Username);
