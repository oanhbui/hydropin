import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { useAddressAutofillCore } from '@mapbox/search-js-react';
import * as API from "../api";
import * as config from '../config'


const debounce = (callback, time=200) => {
    let timerId = null;
    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => callback(...args), time);
    }
}

const deboucedAutocomplete = debounce(async (inputKeyword, setSuggestList) => {
    const response = await API.geoCodingApi(inputKeyword);
    setSuggestList(response)
})

const SearchBar = ({handleCenterPointChange}) => {
    const [inputKeyword, setInputKeyword] = useState("");
    const [userInput, setUserInput] = useState(false);
    const [suggestList, setSuggestList] = useState(null);
    
    useEffect(() => {
        if (!inputKeyword || !userInput) {
            setSuggestList(null)
        }
        deboucedAutocomplete(inputKeyword, setSuggestList);
    }, [inputKeyword, userInput]);

    const handleSuggestListClick = (e, feature) => {
        e.preventDefault();
        setUserInput(false);
        setInputKeyword(feature.place_name);
        setSuggestList(null);
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
                    <FontAwesomeIcon icon={faSearch} />
                </span>
                {userInput && (suggestList && suggestList.length > 0) ?
                    <div className="dropdown-menu show">
                        {suggestList.map(suggest => <a
                            style={{ backgroundColor: "none !important", fontSize: "smaller" }}
                            className="dropdown-item"
                            onClick={(e) => handleSuggestListClick(e, suggest)}
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