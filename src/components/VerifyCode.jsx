/*
 * VerifyCode Component.
 * - Load using <VerifyCode />.
 * - Use camel case for method names and prepend with '_' unless default react method.
 * 
 * Smart component - uses Redux.
 */

import React from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';

//imported validation messages
import { err } from '../constants/messageConstants';
// Which props do we want to inject, given the redux store?
const mapStateToProps = state => {
  return {
    data: state.data
  };
}

class VerifyCode extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="verify-code">
        <Row className="form__field-wrapper align">
          <input
            id="code1"
            type="password"
            aria-label="1st half of code"
            value={this.props.code1Value}
            onChange={e =>this.props._getChangeDetails(e,'code1')}
            className={"form__field-input text-center verify-code__input" + (this.props.code1Error || this.props.code2Error ? ' form__field-input--error' : '')}
          />
          <p className="verify-code__spacer text-center">-</p>
          <input
            id="code2"
            type="password"
            maxLength="3"
            aria-label="2nd half of code"
            value={this.props.code2Value}
            onChange={e =>this.props._getChangeDetails(e,'code2')}
            onBlur={e =>this.props._getChangeDetails(e,'code2')}
            className={"form__field-input text-center verify-code__input" + (this.props.code2Error || this.props.code1Error ? ' form__field-input--error' : '')}
          />
          { this.props.code1Error || this.props.code2Error ? <p className="error">{err.CODE1_REQUIRED}</p> : null }
        </Row>
      </div>
    );
  }

}

export default connect(mapStateToProps)(VerifyCode);
