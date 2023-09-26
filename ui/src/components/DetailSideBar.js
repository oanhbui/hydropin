import React from "react";
import { useState, useEffect } from "react";
import * as API from '../api';
import RatingBar from "./RatingBar";
import RatingForm from "./RatingForm";

const DetailSideBar = ({ sidebarData, loggedInUser }) => {
    const [tabContent, setTabContent] = useState('details');
    const [reviewData, setReviewData] = useState(null);
    console.log(reviewData);
    // const handleTabContent = (e) => {
    //     e.preventDefault();
    //     const target = e.target.target;
    //     setTabContent(target)
    // }
    const handleTabContent = (tabContent) => {
        return (e) => {
            setTabContent(tabContent)
        }
    };

    const handleAfterSubmitReview = (postedData) => {
        if (reviewData !== null) {
            const newReview = {
                first_name: loggedInUser.first_name,
                last_name: loggedInUser.last_name,
                review: postedData.review,
                score: postedData.score,
                updated_on: postedData.updated_on
            }

            setReviewData((oldReviewData) => (
                {...oldReviewData, reviews: [...oldReviewData.reviews, newReview]}
            ))
        }
    }

    
    useEffect(() => {
        (async () => {
          const data = await API.reviews(sidebarData.id);
          setReviewData(data)
          console.log(reviewData)
        })()
      }, [sidebarData]);


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
            {tabContent === 'reviews' ? 
                <div id="reviews">
                    <div className="mt-3 mb-2" style={{textAlign: "center"}}>
                        {(reviewData && reviewData.average !== null) ?
                            <>
                                <h1>{Number.parseFloat(reviewData.average).toFixed(1)}</h1>
                                <RatingBar value={reviewData.average} size="lg" />
                            </>
                        :
                            <>
                                <p>No rating posted yet. Be the first one to rate!</p>
                                <RatingBar value={0} size="lg" />
                            </>
                        }
                    </div>
                    {reviewData && reviewData.reviews.map((review) => (
                        <div className="review-content">
                            <p style={{paddingBottom: "0px"}}><b>{review.first_name} {review.last_name}</b></p>
                            <RatingBar value={review.score} size="sm"/>
                            <p>{review.review}</p>
                            <p>posted on: {review.updated_on}</p>
                        </div>
                    ))}
                    {
                        loggedInUser ?
                        <RatingForm stationID={sidebarData.id} afterSubmit={handleAfterSubmitReview}/>
                        :
                        null
                    }
                    
                </div> : null}
            {tabContent === 'history' ? <div id="history">
            <p>History tab </p>
            </div> : null}
        </div>
    )
};

export default DetailSideBar