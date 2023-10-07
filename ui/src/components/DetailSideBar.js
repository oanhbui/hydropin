import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDirections } from "@fortawesome/free-solid-svg-icons";
import * as API from '../api';
import RatingBar from "./RatingBar";
import RatingForm from "./RatingForm";
import PriceGraph from "./PriceGraph";
import QueueGraph from "./QueueGraph";

const DetailSideBar = ({ sidebarData, loggedInUser }) => {
    const [tabContent, setTabContent] = useState('details');
    const [reviewData, setReviewData] = useState(null);
    const [isShown, setIsShown] = useState(true)
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
                {...oldReviewData, reviews: [newReview, ...oldReviewData.reviews]}
            ))
        }
    }

    
    useEffect(() => {
        (async () => {
          const data = await API.reviews(sidebarData.id);
          setReviewData(data)
        })()
      }, [sidebarData && sidebarData.id]);

    const originAdd = `${sidebarData.street_address}, ${sidebarData.city}, ${sidebarData.state}, ${sidebarData.zipcode}`;
    const encodedAdd = encodeURIComponent(originAdd);

    const handleCloseSidebar = (e) => {
        e.preventDefault();
        setIsShown((isShown) => !isShown)
    }

    return (
        <div className="sidebar">
            <h4>
                {sidebarData.name}
                <a href={`https://google.com/maps/dir/?api=1&destination=${encodedAdd}`} target="_blank" title="Direction" style={{float: "right"}}>
                    <span>
                        <FontAwesomeIcon icon={faDirections} size="2x" color="#0078c1" />
                    </span>
                </a>
            </h4>
            <ul className="nav nav-pills nav-fill" >
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
                <img src={sidebarData.image ? sidebarData.image : "https://as1.ftcdn.net/v2/jpg/05/65/36/10/1000_F_565361046_MNuPibxIEA5asH7JJ395bqG5zAZB1OZh.jpg"} width="100%" style={{marginBottom: "10px", marginTop: "10px"}}/>
                <p>Reviews ({reviewData ? reviewData.reviews.length : null})
                {reviewData ? <RatingBar value={reviewData.average} /> : null}
                </p>
                <p>Address: {sidebarData.street_address}, {sidebarData.city}, {sidebarData.state}, {sidebarData.zipcode}</p>
                <p>Operator: {sidebarData.operator}</p>
                <p>Website: {sidebarData.operator_url}</p>
                <p>Status: {sidebarData.status}</p>
                <p>Current capacity: {sidebarData.capacity} kg</p>
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
                        {
                        loggedInUser ?
                        <RatingForm stationID={sidebarData.id} afterSubmit={handleAfterSubmitReview}/>
                        :
                        <p>Log in to post review and rate this station.</p>
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
                </div> : null}
            {tabContent === 'history' ? <div id="history">
                <h5>Price history</h5>
                <PriceGraph stationId={sidebarData.id} />
                <h5>Popular time</h5>
                <QueueGraph stationId={sidebarData.id} />
            </div> : null}
        </div>
    )
};

export default DetailSideBar