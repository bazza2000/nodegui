import React from 'react';
import { connect } from 'react-redux';
import { actions } from './../../actions/indexActions';
import TitleBlock from './../../components/TitleBlock';
import IconWithText from './../../components/IconWithText';
import nodeLogServer from '../../utils/nodeLogServer/nodeLogServer';


class ForgotBothCredentials extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-622", reactRoute: window.location.pathname });

    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
  }

  render() {
    return (
      <div className="forgot-both-credentials">
        <TitleBlock title="We need to verify it's you" />
        <p className="align">
            If you don't know both your password
            and security code you'll need to verify
            your account using The Co-operative Bank
            mobile app or by calling us.
        </p>

        <SoftTokenVerification history = {this.props.history} />

        <IconWithText
          img={Contact}
          title="Contact us on"
          text={<a href="tel:+44 XXXXXXXX" target="_blank">+44 1234 4567</a>}
        />
        <div className="m-t-30 align">
          <p>
              Lines open 8am to 8pm, 7 days a
              week. Call us from the UK and abroad.
          </p>
        </div>
      </div>
    )
  }
}

export default connect(null)(ForgotBothCredentials);
