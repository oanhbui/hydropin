import React from "react";
import { Field, useFormik } from "formik";
import * as Yup from 'yup';
import * as API from "../api";
import RatingBar from "./RatingBar";



const RatingForm = ({stationID, afterSubmit}) => {
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
                console.log(data);
                formik.resetForm();
                afterSubmit(data.review)
            } catch (error){
                console.error(error)
                formik.setFieldError('_global', 'Something went wrong please try again')
            }
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor={'score'} className={"label-color"}>
                    Score <RatingBar
                        editable={true}
                        value={formik.values.score}
                        handleChange={(newStar) => formik.setFieldValue('score', newStar)}
                    />
                    {formik.errors.score ? (
                        <div>{formik.errors.score}</div>
                    ) : null}
                </label>
            </div>
            <label htmlFor="review"></label>
            <input 
                type="text" 
                id="review" 
                placeholder="Write a review" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.review} />
            {formik.touched.review && formik.errors.review ? (
                <div>{formik.errors.review}</div>
            ) : null}
            <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default RatingForm