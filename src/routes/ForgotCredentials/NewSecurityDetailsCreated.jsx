import React from 'react';
import { connect } from 'react-redux';
import TitleBlock from '../../components/TitleBlock';
import DefaultPrefPopUp from '../../components/DefaultPrefPopUp';
import { ROUTE_PATH_NAME } from './../../constants/routeConstants';
import { SCA_PREFERENCE } from '../../constants/appConstants';
import { actions } from '../../actions/indexActions';
import nodeLogServer from '../../utils/nodeLogServer/nodeLogServer';
let currentProps;

const mapStateToProps = ({data}) =>{
  let {userName, profile} = data;
  return {
    userName,
    newscaPreference:profile.newscaPreference || profile.scaPreference,
    profile
  };
}

class NewSecurityDetailsCreated extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);

    // log to node-log-server
    nodeLogServer.log({ identifier: "DAUTH-623", reactRoute: window.location.pathname });

    this.props.dispatch(actions.changeCurrentLocation(ROUTE_PATH_NAME.NEWSECURITYDETAILSCREATED));
    this.props.dispatch(actions.changeJourney(null));
  }

  // disabled back button
  componentWillMount() {
    currentProps = this.props;
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
      window.scrollTo(0, 0);
    });
  }

  render(){
    // Hack to maintain props state when click browser back
    if(currentProps)
      this.props = currentProps;
    return (
      <div className="security-details-creted"> 
        {this.props.location.state && <TitleBlock title={`New ${this.props.location.state.text} created`} />}
        <div tabIndex={0} id="userErrorText">
          {this.props.location.state && <p className="align m-b-0"> Your new {this.props.location.state.text} is now active, please use it the next time you log in.</p>}
        </div>
        <div className="button__submit-btn-wrapper form m-b-0">
          <button id="logInBtn" className="button__submit-btn--next" onClick = {()=> this.props.profile.redirectURL ? window.location.href = this.props.profile.redirectURL: this.props.history.push(ROUTE_PATH_NAME.SOFTTOKENSUCCESSFUL)}>Log in</button>
        </div>
        {((this.props.newscaPreference === SCA_PREFERENCE.MOBILEAPP_PREF && this.props.profile.showMobileAppDefaultSCAPopup === 'Y')
        || (this.props.newscaPreference === SCA_PREFERENCE.EMAIL_PREF && this.props.profile.showEmailDefaultSCAPopup === 'Y')
        || (this.props.newscaPreference === SCA_PREFERENCE.TEXT_PREF && this.props.profile.showOTPDefaultSCAPopup === 'Y')
        )
         && <DefaultPrefPopUp 
           isRedirectionRequired = {this.props.profile.redirectURL ? true : false} 
           _getRedirection = {()=> this.props.profile.redirectURL ? window.location.href = this.props.profile.redirectURL : null} 
           userName = {this.props.userName}
           displayPopup = {true}
           scaPreference = {this.props.newscaPreference}
           profile = {this.props.profile}
         />}
       
      </div>
    );
  }
};

export default connect(mapStateToProps)(NewSecurityDetailsCreated);