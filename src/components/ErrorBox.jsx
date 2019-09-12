/*
 * ErrorBox Component.
 * - Load using <ErrorBox>CHILDREN GO HERE</ErrorBox>.
 *  
 * Dumb component.
 */


import React from 'react';

const ErrorBox = props => {
  return (
    <div className="error-box align">
      {props.children}
    </div>
  );
}

export default ErrorBox;