import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDirections, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { formatRelative, subDays } from 'date-fns';
import * as API from '../api';
import RatingBar from "./RatingBar";
import RatingForm from "./RatingForm";
import PriceGraph from "./PriceGraph";
import QueueGraph from "./QueueGraph";

const DetailSideBar = ({ sidebarData, loggedInUser }) => {
    const [tabContent, setTabContent] = useState('details');
    const [reviewData, setReviewData] = useState(null);
    const [isShown, setIsShown] = useState(false)
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
        if (!sidebarData || !sidebarData.id) {
            return;
        }
        setIsShown(true);
        (async () => {
          const data = await API.reviews(sidebarData.id);
          setReviewData(data)
        })()
      }, [sidebarData]);

    const originAdd = sidebarData && `${sidebarData.street_address}, ${sidebarData.city}, ${sidebarData.state}, ${sidebarData.zipcode}`;
    const encodedAdd = sidebarData && encodeURIComponent(originAdd);

    const handleCloseSidebar = (e) => {
        e.preventDefault();
        setIsShown(false);
    }

    return (
        <div className={`sidebar ${isShown ? 'show': ''}`}>
            {sidebarData ? 
                <div className="sidebar-inner">
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
                        <hr />
                        <div className="container detailed-info">
                            <p style={{fontSize: "17px"}}>Reviews ({reviewData ? reviewData.reviews.length : null})
                            
                            </p>
                            {reviewData ? <RatingBar value={reviewData.average} /> : null}
                            <hr />
                            <div className="row">
                                <div className="col-3 label">Address</div>
                                <div className="col-9">{sidebarData.street_address}, {sidebarData.city}, {sidebarData.state}, {sidebarData.zipcode}</div>
                            </div>
                            <div className="row">
                                <div className="col-3 label">Operator</div>
                                <div className="col-9">{sidebarData.operator}</div>
                            </div>
                            <div className="row">
                                <div className="col-3 label">Website</div>
                                <div className="col-9"><a href={sidebarData.operator_url}>{sidebarData.operator_url}</a></div>
                            </div>
                            <div className="row">
                                <div className="col-3 label">Status</div>
                                <div className="col-9">{sidebarData.status}</div>
                            </div>
                            <div className="row">
                                <div className="col-3 label">Current capacity</div>
                                <div className="col-9">{sidebarData.capacity} kg</div>
                            </div>
                        </div>
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
                                    <div className="mb-2"></div>
                                {
                                loggedInUser ?
                                <RatingForm stationID={sidebarData.id} afterSubmit={handleAfterSubmitReview}/>
                                :
                                <p>Log in to post review and rate this station.</p>
                                }
                            </div>
                            {reviewData && reviewData.reviews.map((review) => (
                                <div className="review-content">
                                    <p style={{paddingBottom: "0px"}}><b>{review.first_name} {review.last_name}</b>
                                    <RatingBar value={review.score} size="sm"/>
                                    </p>
                                    <p>{review.review}</p>
                                    <p><i>posted on: {formatRelative(new Date(review.updated_on), new Date())}</i></p>
                                    <hr />
                                </div>
                            ))}
                        </div> : null}
                    {tabContent === 'history' ? <div id="history">
                        <h5>Price history</h5>
                        <PriceGraph stationId={sidebarData.id} />
                        <h5>Popular time</h5>
                        <QueueGraph stationId={sidebarData.id} />
                    </div> : null}
                </div> :
                null}
            <div className="close-sidebar" title="Close" onClick={handleCloseSidebar}>
                <FontAwesomeIcon icon={faAngleLeft} size="lg"/>
            </div>
        </div>
    )
};

export default DetailSideBar