import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { API_URL } from "../../config";

function Login(props) {
    const [formDataLogin, setFormData] = useState({ phone: "", password: "" });
    const history = useHistory();

    const handleChangeLogin = (key, e) => {
        const updatedFormData = { ...formDataLogin };

        updatedFormData[key] = e.target.value;

        setFormData(updatedFormData);
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            url: API_URL + "/admin/auth/login",
            data: formDataLogin,
        })
            .then(function (response) {
                localStorage.setItem("woodenculture-token-admin", response.data.token);
                history.push("/dashboard/add-product");

                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="login-page">
            <div className="login-content">
                <div class="log-form medium-size">
                    <div className="inner-wrp">
                        <h2>Admin SignIn</h2>
                        <Form onSubmit={handleSubmitLogin}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter mobile number"
                                    onChange={(e) => {
                                        handleChangeLogin("phone", e);
                                    }}
                                    value={formDataLogin.phone}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        handleChangeLogin("password", e);
                                    }}
                                    value={formDataLogin.password}
                                />
                            </Form.Group>
                            <div className="button-grp">
                                <Button variant="primary" type="submit">
                                    Submit
                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
