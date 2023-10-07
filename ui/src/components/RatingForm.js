import React, { useState } from "react";
import { Field, useFormik } from "formik";
import logo from "../images/logo_transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import * as Yup from 'yup';
import * as API from "../api";
import RatingBar from "./RatingBar";



const RatingForm = ({ stationID, afterSubmit }) => {
    const formik = useFormik({
        initialValues: {
            review: '',
            score: 0
        },
        validationSchema: Yup.object({
            review: Yup.string().min(10, 'Too Short!')
                .max(150, 'Too Long!').required('Required'),
            score: Yup.number().min(1).max(5).required('Required')
        }),
        onSubmit: async (values) => {
            console.log('submitting')
            try {
                const data = await API.reviewSubmit(stationID, values);
                if (data.error) {
                    formik.setFieldError(data.field, data.error);
                    return;
                };
                handleModalRatingForm();
                formik.resetForm();
                afterSubmit(data.review)
            } catch (error) {
                console.error(error)
                formik.setFieldError('_global', 'Something went wrong please try again')
            }
        },
    });

    const [modalRatingForm, setModalRatingForm] = useState(false);
    const handleModalRatingForm = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setModalRatingForm((modal) => !modal)
    };

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#ratingForm"
                onClick={handleModalRatingForm}
            >
                Write a review and rate this station
            </button>




            <div className={`modal fade ${modalRatingForm ? 'show' : ''} mt-5`} id="ratingForm" tabindex="-1" style={{ display: modalRatingForm ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.25)' }} onClick={handleModalRatingForm}>
                <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-head">
                            <div className="modal-logo">
                                <FontAwesomeIcon icon={faStar} size="6x" style={{color: "#feb21b"}} />
                                <button type="button" className="btn-close" onClick={handleModalRatingForm}></button>
                            </div>
                            <h3>Review and rate station</h3>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <label htmlFor="score" className="form-label" style={{fontSize: "30px"}}>
                                        Score 
                                    </label>
                                    <RatingBar
                                            size="2xl"
                                            editable={true}
                                            value={formik.values.score}
                                            handleChange={(newStar) => formik.setFieldValue('score', newStar)}
                                        />
                                        {formik.errors.score ? (
                                            <div>{formik.errors.score}</div>
                                        ) : null}
                                </div>
                                <label htmlFor="review" className="form-label"></label>
                                <textarea
                                    className="form-control"
                                    type="text"
                                    id="review"
                                    placeholder="Write a review"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.review} />
                                {formik.touched.review && formik.errors.review ? (
                                    <div>{formik.errors.review}</div>

                                ) : null}
                                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default RatingForm