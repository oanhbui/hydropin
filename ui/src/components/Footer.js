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
                    <p>&copy; Copyright 2023 by <a taget="_blank" href="https://oanhbui.com">Oanh Bui</a></p>
                </div>
                <div className="col-2"></div>
                <div className="col-4">
                    <div className="row">
                        <div className="col-2">
                            <a href="https://www.linkedin.com/in/oanhbp/" target="_blank" title="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} size="lg"/></a>
                        </div>
                        <div className="col-2">
                            <a href="https://github.com/oanhbui/hydropin" target="_blank"  title="Github"><FontAwesomeIcon icon={faGithub} size="lg" /></a>
                        </div>
                        <div className="col-2">
                            <a href="mailto:oanhbp3105@gmail.com" target="_blank"><FontAwesomeIcon icon={faEnvelope} size="lg" /></a>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Footer;