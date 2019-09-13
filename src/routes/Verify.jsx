/*
 * Verify Route Component.
 * - This component is rendered if the '/EnterSecurityDetails' route is called.
 * - Use camel case for method names and prepend with '_' unless default react method.
 *
 * Smart component - uses Redux.
 */

import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions/indexActions';
import { Row, Col } from 'react-bootstrap';
import { _generatePinLabel } from '../utils/_generatePinLabel';
import { Redirect, Link } from 'react-router-dom';
import { ROUTE_PATH_NAME } from '../constants/routeConstants';
import nodeLogServer from '../utils/nodeLogServer/nodeLogServer';
import _getDateInDays from '../utils/_getDateInDays';
import authnGateway from '../utils/authnGateway/authnGateway';
import { pinValuesArr } from '../constants/commonConstants';
import { SCA_PREFERENCE } from '../constants/appConstants';
import { _getQueryStringParam } from '../utils/_getQueryStringParam';

// imported components
import LoadingBtn from '../components/LoadingBtn';
import TitleBlock from '../components/TitleBlock';
import IconWithText from '../components/IconWithText';
import LineText from '../components/LineText';
import Dropdown from '../components/Dropdown';

// images


//imported validation messages
import { err } from '../constants/messageConstants';

const assign = Object.assign || require('object.assign');

// Which props do we want to inject, given the redux store?
const mapStateToProps = state => {
  return {
    data: state.data
  };
}

class Verify extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentlySending: false,
      error: null,
      pageTitle: "Log in"
    };

  }

  componentDidMount() {
    window.scrollTo(0, 0);

    // log to node-log-server
    nodeLogServer.log({ identifier: "JIRA-24", reactRoute: window.location.pathname });
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));


    this.setState({
      pageTitle: "User Profile"

    });

  }



  render() {

    return (
      <div>

        <TitleBlock title={this.state.pageTitle} />

        <div className="form____wrapper">

          <div className="form no-border">

            <form onSubmit={this._auth}>
              <div className="form__field-wrapper">
                <div className="form__field-wrapper">
                  <label className="form__field-label" htmlFor="email">Email</label>
                  <input
                    className={"form__field-input m-b-10" }
                    id="email"
                    onChange={this._changePassword}
                    type="text"
                    placeholder=""
                    value={this.props.data.profile.email}
                  />
                  {this.state.passwordError ? <p className="error">{this.state.passwordError}</p> : null}
                </div>
              </div>

              <div className="form__field-wrapper">

                <Row>
                  <Col xs={5} sm={3}>
                    <label className="form__field-label m-b-5" htmlFor="firstName">Name</label>
                    <Dropdown
                      className={"form__field-input m-b-10" + (this.state.pinPos1Error ? ' form__field-input--error' : '')}
                      id="firstName"
                      onChange={e => this._changePinValue(e,'pinVal1')}
                      type="text"
                      placeholder=""
                      value={this.props.data.profile.firstName}
                      options={pinValuesArr}
                    />
                  </Col>

                  <Col xs={5} sm={3}>
                    <label className="form__field-label m-b-5" htmlFor="pin2">Surname</label>
                    <Dropdown
                      className={"form__field-input m-b-10" + (this.state.pinPos2Error ? ' form__field-input--error' : '')}
                      id="pin2"
                      onChange={e => this._changePinValue(e,'pinVal2')}
                      type="text"
                      placeholder=""
                      value={this.state.pinVal2}
                      options={pinValuesArr}
                    />
                    {this.state.pinPos2Error ? <p className="error">{this.state.pinPos2Error}</p> : null}
                  </Col>
                </Row>

              </div>
              <div className="button__submit-btn-wrapper">
                {this.state.currentlySending
                  ? <LoadingBtn />
                  : <button id="btnLoginWithCredentials" className="button__submit-btn--next" type="submit">Do Stuff</button>
                }
                {this.state.error ? <p className="error">* {this.state.error}</p> : null}
              </div>
            </form>



          </div>

        </div>

      </div>
    );
  }

}

export default connect(mapStateToProps)(Verify);
