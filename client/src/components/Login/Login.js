import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import "./Form.css";

function LoginForm() {
    const { register, errors, handleSubmit } = useForm({});
    const onSubmit = async data => {
        await axios.post("http://localhost:5000/api/users/login", data)
            .then(res => {
                alert(res.data.message);
                if (res.data.session) {
                    sessionStorage.setItem("session", res.data.session)
                }
            })
            .catch(err => console.log(err))
    };

    if (sessionStorage.getItem("session")) {
        return (
            <Redirect to={"/dashboard"} />
        )
    }
    return (
            <div className={"loginForm"}>
                <Form onSubmit={event => event.preventDefault()}>
                    <FormGroup controlId={"loginUsername"}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type={"text"} name={"username"} ref={register({required: "Username is required"})} />
                        {errors.username && <p>{errors.username.message}</p>}
                    </FormGroup>
                    <FormGroup controlId={"loginPassword"}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={"password"}
                            name={"password"}
                            ref={register({
                                required: "Password is required"
                            })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </FormGroup>
                    <Button type={"submit"} onClick={handleSubmit(onSubmit)}>Log In</Button>
                </Form>
                <div className={"register-redirect"}>
                    Don't have an account yet? <Link to={"/register"}>Register here</Link>
                </div>
            </div>
    )
}

export default LoginForm;