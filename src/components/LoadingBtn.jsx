/*
 * LoadingBtn Component.
 * - Load using <LoadingBtn text={TEXT} />.
 * 
 * Dumb component.
 */

import React from 'react';
import LoadingIndicator from './LoadingIndicator';

const LoadingBtn = props => {
  return (
    <div className="btn btn--loading">
      <LoadingIndicator />
      {props.text ? <p className="text-center">{props.text}</p> : null}
    </div>
  )
}

export default LoadingBtn;