import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

import { signup } from "../../../store/actions";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.

  function validateUsername(value) {
    let error;
    if (value === "admin") {
      error = "Nice try!";
    }
    console.log("test");
    return error;
  }

  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className="text-input form-control"
        {...field}
        {...props}
        validate={validateUsername}
      />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

// And now we can use these
const SignupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="login-page">
      <Layout>
        <div className="login-content">
          <div className="log-form">
            <div class="inner-wrp">
              <h2>Sign Up as a transporter</h2>

              <Formik
                initialValues={{
                  company_name: "",
                  name: "",
                  email: "",
                  mobile: "",
                  address: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={Yup.object({
                  // company_name: Yup.string()
                  //   .max(100, "Must be 100 characters or less")
                  //   .required("Required"),
                  // name: Yup.string().required("Required"),
                  // email: Yup.string().email("Invalid email address").required("Required"),
                  // password: Yup.string().required("Required"),
                  // confirmPassword: Yup.string().required("Required"),
                  // mobile: Yup.string().required("Required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  dispatch(signup({ ...values, user_type: "transporter_user" })).then(() => {
                    history.push("/login");
                  });
                }}
                setFieldError={() => {
                  console.log("testttt");
                }}
              >
                <Form>
                  <div class="ip-field-wrp">
                    <MyTextInput
                      label="Company Name"
                      name="company_name"
                      type="text"
                      placeholder="Enter"
                    />
                  </div>
                  <div class="ip-field-wrp">
                    <MyTextInput label="Name" name="name" type="text" placeholder="Enter" />
                  </div>
                  <div class="ip-field-wrp">
                    <MyTextInput
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="Enter"
                    />
                  </div>
                  <div class="ip-field-wrp">
                    <MyTextInput
                      label="Mobile No."
                      name="mobile"
                      type="number"
                      placeholder="Enter"
                    />
                  </div>

                  <div class="ip-field-wrp">
                    <MyTextInput
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Enter"
                    />
                  </div>
                  <div class="ip-field-wrp">
                    <MyTextInput
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Enter"
                    />
                  </div>
                  <div class="ip-field-wrp">
                    <MyTextInput label="Address" name="address" type="text" placeholder="Enter" />
                  </div>
                  <div className="btn-wrp">
                    <Button className="align-right" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SignupForm;
