import React from "react";
import logo from "../images/logo_transparent.png";
import { useFormik } from "formik";
import * as API from "../api";
import * as Yup from 'yup';

const LogInForm = ({ modalLogin, handleModalLogin, setLoggedInUser }) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: async (values) => {
            try {
                const data = await API.logIn(values);
                if (data.error) {
                    formik.setFieldError(data.field || '_global', data.error);
                    return;
                }
                handleModalLogin();
                setLoggedInUser(data.user);
                formik.resetForm()
            } catch (error) {
                formik.setFieldError('_global', 'Something went wrong please try again')
            }
        },
    });

    return (

        <div className={`modal fade ${modalLogin ? 'show' : ''}`} id="loginModal" tabindex="-1" style={{ display: modalLogin ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.25)' }} onClick={handleModalLogin}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-head">
                        <div className="modal-logo">
                            <img src={logo} width="50px" />
                            <button type="button" className="btn-close" onClick={handleModalLogin}></button>
                        </div>
                        <h1>Welcome to Hydropin</h1>
                    </div>
                    <div className="modal-body mb-5">
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                {formik.errors._global ? formik.errors._global : null}
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
                                    <div>{formik.errors.email}</div>
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
                                    <div>{formik.errors.password}</div>
                                ) : null}
                                <div className="form-text">Forgot your password?</div>
                            </div>
                            <div class="d-grid gap-2"><button type="submit" className="btn btn-danger">Log in</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default LogInForm;