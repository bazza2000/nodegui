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
    nodeLogServer.log({ identifier: "JIRA-132", reactRoute: window.location.pathname });

    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
  }

  render() {
    return (
      <div className="forgot-both-credentials">
        <TitleBlock title="Self service coming soon..." />
        <p className="align">
            In the meantime ff you don't know either of your username and password
            please give us a call.
        </p>


        <IconWithText
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
