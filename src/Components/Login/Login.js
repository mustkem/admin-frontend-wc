import React, { useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { path } from "ramda";
import { login } from "../../store/actions";
import { parse } from "query-string";
import { useHistory, useParams, useLocation } from "react-router-dom";

import Layout from "../Layout/Layout";
import ButtonSpinner from "../Shared/ButtonSpinner";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className="ip-field-wrp">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return path(["user", "user", "loading"], state);
  });

  const myFormRef = useRef(null);

  let history = useHistory();
  const location = useLocation();
  const query = parse(location.search);

  return (
    <div className="login-page">
      <div className="login-content">
        <div class="log-form medium-size">
          <div className="inner-wrp">
            <h2>Admin</h2>
            <Formik
              initialValues={{
                password: "",
                email: "",
              }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                email: Yup.string().email("Invali`d email address").required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                const formNode = myFormRef.current;
                formNode.querySelectorAll("input").forEach((item) => {
                  item.blur();
                });

                dispatch(login(values)).then(() => {
                  if (query["target-url"]) {
                    history.push(query["target-url"]);
                  } else {
                    history.push("/dashboard/orders");
                  }
                });
              }}
            >
              <Form ref={myFormRef}>
                <MyTextInput
                  // autoFocus
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
                <div className="btn-wrp">
                  <Button className="align-right login-btn" type="submit">
                    <span>Login</span>
                    {loading && <ButtonSpinner />}
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
