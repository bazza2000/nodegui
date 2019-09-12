/*
 * IconWithText Component.
 * - Load using <IconWithText title={TEXT} img={imgURL} />.
 *  
 * Dumb component.
 */


import React from 'react';
import { Row, Col } from 'react-bootstrap';

const IconWithText = props => {
  return (
    <div className="icon-with-text align">

      <Row>
        <Col xs={2} sm={3} md={2}>
          <img className="icon-with-text__img" alt="" src={props.img} />
        </Col>
        <Col xs={10} sm={9} md={10}>
          <p className="icon-with-text__title">{props.title}</p>
          <p>{props.text}</p>
        </Col>
      </Row>

    </div>
  );
}

export default IconWithText;