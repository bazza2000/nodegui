/*
 * Hr Component.
 * - Load using <Hr />.
 * 
 * Dumb component.
 */

import React from 'react';

const Hr = props => {
  return(
    <div className={"hr " + props.className}></div>
  );
}

export default Hr;