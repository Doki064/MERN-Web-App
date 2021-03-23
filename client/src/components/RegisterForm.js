import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import "./RegisterForm.css";

function RegisterForm() {
    const { register, errors, handleSubmit, watch } = useForm({});
    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = async data => {
        await axios.post("http://localhost:5000/api/users/register", data)
            .then(res => {
                alert(res.data.message);
                if (res.data.registered) {
                    localStorage.setItem("isRegistered", res.data.registered)
                }
            })
            .catch(err => console.log(err))
    };

    return (
        localStorage.getItem("isRegistered") ? <Redirect to={"/"} /> :
        <div className={"registerForm"}>
            <Form onSubmit={event => event.preventDefault()}>
                <FormGroup controlId={"registerEmail"}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type={"email"}
                        name={"email"}
                        ref={register({
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </FormGroup>
                <FormGroup controlId={"registerUsername"}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type={"text"} name={"username"} ref={register({required: "Username is required"})} />
                    {errors.username && <p>{errors.username.message}</p>}
                </FormGroup>
                <FormGroup controlId={"registerPassword"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type={"password"}
                        name={"password"}
                        ref={register({
                            required: "You must specify a password",
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </FormGroup>
                <FormGroup controlId={"repeatPassword"}>
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control
                        type={"password"}
                        name={"password_repeat"}
                        ref={register({
                            validate: value =>
                                value === password.current || "The passwords do not match"
                        })}
                    />
                    {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
                </FormGroup>
                <Button type={"submit"} onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Form>
            <div className={"login-redirect"}>
                Already have an account? <Link to={"/login"}>Login</Link>
            </div>
        </div>
    )
}

export default RegisterForm;