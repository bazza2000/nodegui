/*
 * Header Component.
 * - Load using <Header />.
 * - Use camel case for method names and prepend with '_' unless default react method.
 *
 * Smart component - uses Redux.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { noBackButtonPageArray } from './../constants/commonConstants';
const backIcon = require(`./../../img/back.png`);
const helpIcon = require(`./../../img/help.png`);
const hoverBIcon = require(`./../../img/back-h.png`);
const hoverHIcon = require(`./../../img/help-h.png`);


// images
const Logo = require(`../../img/VIO_404_44.png`);

// Which props do we want to inject, given the redux store?
const mapStateToProps = state => {
  return {
    data: state.data
  };
}

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this._back = this._back.bind(this);
  }

  // Methods
  _back(e) {
    if ( e.keyCode === 13 || e.type === "click" )
      window.history.back();
  }

  _open(e) {
    if ( e.keyCode === 13 || e.type === "click" )
      window.open("http://www.viosystems.com");
  }

  render() {
    return (
      <div className="header">
        <Container>
          <div className="header__content">
            <Row>
              <Col xs="2" className="header__content--img">
                { noBackButtonPageArray.indexOf(window.location.pathname) !== -1
                  ? null
                  : <a   className="header__back" onClick={this._back} onKeyDown={this._back}>
                    <div tabIndex={0} id="header__back">
                      <img
                        className="header__content--icons"
                        src={backIcon}
                        onMouseOver={e => e.currentTarget.src = hoverBIcon}
                        onMouseOut={e => e.currentTarget.src = backIcon}
                        alt="go to previous page" />
                    </div>
                  </a>
                }

              </Col>

              <Col xs="8" className="header__content--img">

                <a  name="Enter Username" href={"/EnterUsername?login_challenge="+this.props.data.challenge}>
                  <div  id="header__img">
                    <img className="header__img" alt='VIO Logo' src={Logo} />
                  </div>
                </a>

              </Col>


              <Col xs="2" className="header__content--img">

                <a target="_blank" onClick={this._open} onKeyDown={this._open}  className="header__question-mark">
                  <div tabIndex={0} id="header__helper">
                    <img
                      className="header__content--icons"
                      src={helpIcon}
                      onMouseOver={e => e.currentTarget.src = hoverHIcon}
                      onMouseOut={e => e.currentTarget.src = helpIcon}
                      alt="go to help" />
                  </div>
                </a>

              </Col>


            </Row>
          </div>
        </Container>
      </div>
    );
  }

}

Header.contextTypes = {
  ROUTE_PATH_NAME: PropTypes.object,
  ENTERUSERNAME: PropTypes.string,
  PROFILEDETAILS : PropTypes.string,
};

export default connect(mapStateToProps)(Header);
