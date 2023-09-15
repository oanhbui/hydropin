import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";


const SearchBar = () => {
    return (
        <>
            <div className="input-group search-bar">
                <input type="text" className="form-control" placeholder="Search" />
                <span className="input-group-text" id="basic-addon2">
                    <a href="#" type="button"><FontAwesomeIcon icon={faSearch} /></a>
                </span>
                <span className="input-group-text" id="basic-addon2">
                    <a href="#" type="button"><FontAwesomeIcon icon={faLocationCrosshairs} /></a>
                </span>
            </div>
        </>
    )
};

export default SearchBar;