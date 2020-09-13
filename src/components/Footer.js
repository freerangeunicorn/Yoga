import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h6>Yoga from the comfort of your home</h6>
            <ul className="list-unstyled">
              <li>Phone number</li>
              <li>Location</li>
              <li>Address</li>
            </ul>
          </div>
          {/* Column2 */}
          <div className="col">
            <h7>YOGIC</h7>
            <ul className="list-unstyled">
              <li>About</li>
              <li>The team</li>
              <li>Blog</li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <h7>Follow us</h7>
            <ul className="list-unstyled">
              <li>
                <FontAwesomeIcon icon={faFacebook} />
              </li>
              <li>
                <FontAwesomeIcon icon={faInstagram} />
              </li>
              <li>
                <FontAwesomeIcon icon={faLinkedin} />
              </li>
              <li>
                <FontAwesomeIcon icon={faGithub} />
              </li>

              <li></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} YOGIC AB | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}
export default Footer;
