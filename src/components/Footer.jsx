/*
 * Footer Component.
 * - Load using <Footer />.
 *
 * Dumb component.
 */

import React from 'react';
import { Row, Col } from 'react-bootstrap';
const Footer = () => {
  return (
    <div className="footer">

      <Row>
        <Col>

          <div className =  'footer__ctn' tabIndex={0}>
            <div>
              <p className="footer__text">VIO Systems Demo React App</p>
            </div>
          </div>
        </Col>
      </Row>

    </div>
  );
}

export default Footer;
