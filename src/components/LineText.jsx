/*
 * LineText Component.
 * - Load using <LineText text="TEXT" />.
 * 
 * Dumb component.
 */

import React from 'react';

const LineText = props => {
  return (
    <div className="line-text" tabIndex={0}>
      <p>
        {props.text && <span>{props.text}</span>}
      </p>
    </div>
  );
}

export default LineText;
