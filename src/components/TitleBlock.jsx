/*
 * TitleBlock Component.
 * - Load using <TitleBlock title={TEXT} img={imgURL}/>.
 * - Use camel case for method names and prepend with '_' unless default react method.
 *
 * Dumb component.
 */

import React from 'react';
import { Row, Col } from 'react-bootstrap';



const assign = Object.assign || require('object.assign');

const TitleBlock = props => {
  return (
    <div className="title-block">

      <Row>
        <Col xs="9">
          <h1>{props.title}</h1>
        </Col>
      </Row>

    </div>
  );
}

export default TitleBlock;
