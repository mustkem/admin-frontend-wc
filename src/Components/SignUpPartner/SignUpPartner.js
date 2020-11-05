import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';


import Layout from '../Layout/Layout'

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../../store/actions'

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <div className="ip-field-wrp">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

function SignUp() {
    const dispatch = useDispatch()

    return (
        <div className="login-page">
            {
                <Layout>
                    <div className="login-content">
                        <div class="log-form">
                            <div className="inner-wrp">
                                <h2>Sign Up</h2>
                                {/* <form>
                                    <input className="form-control" type="text" title="Email" placeholder="Email" />
                                    <input className="form-control" type="password" title="Password" placeholder="Password" />
                                    <input className="form-control" type="password" title="Type Password Again" placeholder="Type Password Again" />

                                    <div className="btn-wrp">
                                        <Button className="align-right" type="submit" >Sign up</Button>
                                    </div>
                                </form> */}
                                <Formik
                                    initialValues={{
                                        password: '',
                                        passwordRe: '',
                                        email: ''
                                    }}
                                    validationSchema={Yup.object({
                                        password: Yup.string()
                                            .max(15, 'Must be 15 characters or less')
                                            .required('Required'),
                                        passwordRe: Yup.string()
                                            .max(20, 'Must be 20 characters or less')
                                            .required('Required'),
                                        email: Yup.string()
                                            .email('Invalid email address')
                                            .required('Required'),
                                    })}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            alert(JSON.stringify(values, null, 2));
                                            setSubmitting(false);
                                            dispatch(signup(values))
                                        }, 400);
                                    }}
                                >
                                    <Form>

                                        <MyTextInput
                                            className="form-control"
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                        />

                                        <MyTextInput
                                            className="form-control"
                                            type="text"
                                            placeholder="Password"
                                            label="Password"
                                            name="password"
                                        />
                                        <MyTextInput
                                            className="form-control"
                                            type="text"
                                            placeholder="Password"
                                            label="Fill Password Again"
                                            name="passwordRe"
                                        />

                                        <div className="btn-wrp">
                                            <Button className="align-right" type="submit" >Sign up</Button>
                                        </div>
                                        <div className="btn-wrp">
                                            <span className="vertical-space inline-block">
                                                <Link to="/login">
                                                    Already have account? Login
                                                </Link>
                                            </span>
                                        </div>

                                    </Form>
                                </Formik>

                                <div className="terms-and-cond right-align">By clicking signup you agree to out {` `}
                                    <Link to="#">Terms & Conditions</Link>
                                </div>
                                {/* <div className="head-batch">Are you a Transport company. Get in touch and be partner with us.</div>
                                <div className="btn-wrp">
                                    <Button className="link-btn">
                                        <Link to="/signup-partner">Register as Transporter</Link>
                                    </Button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </Layout>
            }
        </div >
    )
}

export default SignUp;

