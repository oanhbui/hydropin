import React from "react";
import { useState } from "react";

const DetailSideBar = ({ sidebarData }) => {
    const [tabContent, setTabContent] = useState('details');
    // const handleTabContent = (e) => {
    //     e.preventDefault();
    //     const target = e.target.target;
    //     setTabContent(target)
    // }
    const handleTabContent = (tabContent) => {
        return (e) => {
            setTabContent(tabContent)
        }
    }
    return (
        <div className="sidebar" >
            <ul className="nav nav-underline">
                <li className="nav-item">
                    <a className={`nav-link ${tabContent === 'details' ? 'active' : ''}`} onClick={handleTabContent('details')} href="#" >Details</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${tabContent === 'reviews' ? 'active' : ''}`} onClick={handleTabContent('reviews')} href="#" >Reviews</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${tabContent === 'history' ? 'active' : ''}`} onClick={handleTabContent('history')} href="#" >History</a>
                </li>
            </ul>
            {tabContent === 'details' ? <div id="details">
                <img src={sidebarData.image} width="100%" />
                <h4>{sidebarData.name}</h4>
                <p>Review</p>
                <p>Address: {sidebarData.street_address}, {sidebarData.city}, {sidebarData.state}, {sidebarData.zipcode}</p>
                <p>Operator: {sidebarData.operator}</p>
                <p>Website: {sidebarData.operator_url}</p>
                <p>Status: online/offline</p>
                <p>Current capacity: </p>
            </div> : null}
            {tabContent === 'reviews' ? <div id="reviews">
                <p>Reviews tab </p>
            </div> : null}
            {tabContent === 'history' ? <div id="history">
            <p>History tab </p>
            </div> : null}
        </div>
    )
};

export default DetailSideBar