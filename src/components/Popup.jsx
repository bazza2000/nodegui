/*
 * Popup Component.
 * - Load using <Popup showPopup={false} />.
 * - Use camel case for method names and prepend with '_' unless default react method.
 * 
 * Smart component.
 */

import React from 'react';
import { _generateHiddenEmail } from '../utils/_generateHiddenEmail';
import { _generateHiddenMobile } from '../utils/_generateHiddenMobile';
import FocusLock from 'react-focus-lock';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: this.props.showPopup
    };
    this.escFunction = this.escFunction.bind(this);
  }
  // Methods
  componentDidUpdate(prevProps, prevState) {
    // prevent endless update loop when changing state on component update.
    if ( this.props.showPopup !== prevState.showPopup ) {
      this.setState({
        showPopup: this.props.showPopup
      });
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  escFunction(event){
    if(event.keyCode === 27 ) {
      if( this.props.escAction){
        this.props.escAction();
      }else{
        this.setState({
          showPopup:false
        })
      }
      
    }
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    return (
      <FocusLock>
        <div>
          { this.state.showPopup
            ? <div className="popup-overlay">
              <div className="popup text-center">
                {this.props.children}
              </div>
            </div>
            : null
          }
        </div>
      </FocusLock> 
    );
  }
}
export default Popup;