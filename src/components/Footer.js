import React from 'react';

 function Footer() {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    {/* Column1 */}
                    <div className="col">
                        <h7>Yoga from the comfort of your home</h7>
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
                            <li>Testimonials</li>
                            <li>Facebook</li>
                            <li>Instagram</li>
                        </ul>
                    </div>
            </div>
            <hr/>
            <div className="row">
                <p className="col-sm">
                    &copy;{new Date().getFullYear()} YOGIC AB | All rights reserved | Terms Of Service | Privacy
                </p>
            </div>
            </div>
        </div>
    )
}
export default Footer;
