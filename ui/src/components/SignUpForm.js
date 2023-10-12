import React from "react";
import logo from "../images/logo_transparent.png";
import { useFormik } from "formik";
import * as API from "../api";
import * as Yup from 'yup';

const SignUpForm = ({ modalSignup, handleModalSignup, setLoggedInUser }) => {

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(8, 'Must be 8 character or more').required('Required')
        }),
        onSubmit: async (values) => {
            try {
                const data = await API.signUp(values);
                if (data.error) {
                    formik.setFieldError(data.field, data.error);
                    return;
                }
                handleModalSignup();
                setLoggedInUser(data.user);
                formik.resetForm();
            } catch (error){
                formik.setFieldError('_global', 'Something went wrong please try again')
                console.error(error)
            }
        },
    });

    return (
        <div className={`modal fade ${modalSignup ? 'show' : ''}`} id="signupModal" tabindex="-1" style={{ display: modalSignup ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.25)' }} onClick={handleModalSignup}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-head">
                        <div className="modal-logo">
                            <img src={logo} width="50px" />
                            <button type="button" className="btn-close" onClick={handleModalSignup}></button>
                        </div>
                        <h1>Welcome to Hydropin</h1>
                    </div>
                    <div className="modal-body mb-5">
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                {formik.errors._global ? formik.errors._global : null }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="first_name" className="form-label">First Name</label>
                                <input
                                    className="form-control"
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.first_name}
                                />
                                {formik.touched.first_name && formik.errors.first_name ? (
                                    <div className="error-message">{formik.errors.first_name}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                <input
                                    className="form-control"
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.last_name}
                                />
                                {formik.touched.last_name && formik.errors.last_name ? (
                                    <div className="error-message">{formik.errors.last_name}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="error-message">{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="error-message">{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <div class="d-grid gap-2"><button type="submit" className="btn btn-danger" disabled={formik.isSubmitting}>Sign me up</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignUpForm;