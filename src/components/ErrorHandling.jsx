import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions/indexActions';
import { ROUTE_PATH_NAME } from '../constants/routeConstants';
import LineText from '../components/LineText';
let currentProps;

const mapStateToProps = ({data}) => {
  return {
    challenge: data.challenge
  };
}

class ErrorHandling extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch(actions.changeCurrentLocation(window.location.pathname));
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

  _getRedirectionUrl() {
    if(this.props.location.state && this.props.location.state.isLoggedIn) {
      //When isLoggedIn parameter is true , we need to send user to accounts homepage url.
      //for temporary purpose, redirecting to username screen
      //In future, we need to update this value
      window.location.href = ROUTE_PATH_NAME.ENTERUSERNAME
    } else {
      window.location.href = ROUTE_PATH_NAME.ENTERUSERNAME + '?login_challenge=' + this.props.challenge;
    }
  }

  render() {
    // Hack to maintain props state when click browser back
    if(currentProps)
      this.props = currentProps;
    return (
      <div className="align">
        <h1>
          We're sorry, something went wrong
        </h1>
        <LineText text="" />
        <p className="m-t-40 m-b-60">
          The page you're looking for is currently unavailable.
          <br/>
          We apologise for this inconvenience. Please try to complete your 
          account action again.
        </p>
        <button 
          id="btnError" 
          className="button__submit-btn--next  m-t-40" 
          type="button" 
          onClick={()=> this._getRedirectionUrl()}
        >{this.props.location.state && this.props.location.state.isLoggedIn ? "Return to accounts homepage" : "Return to login" }</button>
      </div>
    )
  }

}

export default connect(mapStateToProps)(ErrorHandling);