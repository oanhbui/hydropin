import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
    return (
        <div className="footer container-fluid">
            <div className="row">
                <div className="col-6">
                    <p>&copy; Copyright 2023 by Oanh Bui</p>
                </div>
                <div className="col-2"></div>
                <div className="col-4">
                    <div className="row">
                        <div className="col-2">
                            <FontAwesomeIcon icon={faLinkedinIn} size="lg"/>
                        </div>
                        <div className="col-2">
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                        </div>
                        <div className="col-2">
                        <FontAwesomeIcon icon={faEnvelope} size="lg" />
                        </div>
                        <div className="col-2">
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Footer;