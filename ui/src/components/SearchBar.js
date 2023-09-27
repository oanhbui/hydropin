import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { useAddressAutofillCore } from '@mapbox/search-js-react';
import * as API from "../api";
import * as config from '../config'


const SearchBar = ({handleCenterPointChange}) => {
    const [inputKeyword, setInputKeyword] = useState("");
    const [userInput, setUserInput] = useState(false);
    const [suggestList, setSuggestList] = useState(null);
    
    useEffect(() => {
        if (!inputKeyword || !userInput) {
            setSuggestList(null)
        }
        (async () => {
            const response = await API.geoCodingApi(inputKeyword);
            console.log(response);
            setSuggestList(response)
        })()
    }, [inputKeyword, userInput]);

    const handleSuggestListClick = (feature) => {
        setInputKeyword(feature.place_name);
        setSuggestList(null);
        setUserInput(false);
        if (typeof handleCenterPointChange === 'function') {
            const [longitude, latitude] = feature.center;
            handleCenterPointChange(longitude, latitude)
        }
    };



    return (
        <>
            <div className="input-group search-bar dropdown">
                <input type="text" className="form-control dropdown-toggle" data-bs-toggle="dropdown" placeholder="Search" value={inputKeyword} onChange={e => {setInputKeyword(e.target.value); setUserInput(true)}} />
                <span className="input-group-text" id="basic-addon2">
                    <a href="#" type="button"><FontAwesomeIcon icon={faSearch} /></a>
                </span>
                <span className="input-group-text" id="basic-addon2">
                    <a href="#" type="button"><FontAwesomeIcon icon={faLocationCrosshairs} /></a>
                </span>
                {suggestList && suggestList.length > 0 ?
                    <div className="dropdown-menu show">
                        {suggestList.map(suggest => <a
                            style={{ backgroundColor: "none !important", fontSize: "smaller" }}
                            className="dropdown-item"
                            onClick={(e) => handleSuggestListClick(suggest)}
                            href="#">
                            {suggest.place_name}
                        </a>)}
                    </div>

                    : null
                }
            </div>


        </>
    )
};

export default SearchBar;