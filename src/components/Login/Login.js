import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

const actions = {
  SET_EMAIL: "set-email",
  VALIDATE_EMAIL: "validate-email",
  SET_PASSWORD: "set-pwd",
  VALIDATE_PASSWORD: "validate-pwd",
};

function reducer(state, action) {
  if (action.type === actions.SET_EMAIL) {
    return {
      ...state,
      enteredEmail: action.value,
      emailIsValid: action.value.includes("@"),
    };
  }
  if (action.type === actions.VALIDATE_EMAIL) {
    return { ...state, emailIsValid: state.enteredEmail.includes("@") };
  }
  if (action.type === actions.SET_PASSWORD) {
    return {
      ...state,
      enteredPassword: action.value,
      passwordIsValid: action.value.trim().length > 6,
    };
  }
  if (action.type === actions.VALIDATE_PASSWORD) {
    return {
      ...state,
      passwordIsValid: state.enteredPassword.trim().length > 6,
    };
  }
  return { value: "", isValid: false };
}
const Login = (props) => {
  const ctx = useContext(AuthContext)
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [
    { enteredEmail, emailIsValid, enteredPassword, passwordIsValid },
    dispatch,
  ] = useReducer(reducer, {
    enteredEmail: "",
    emailIsValid: null,
    enteredPassword: "",
    passwordIsValid: null,
  });

  useEffect(
    function () {
      const interval = setTimeout(function () {
        setFormIsValid(emailIsValid && passwordIsValid);
      }, 500);

      return () => {
        clearTimeout(interval);
      };
    },
    [emailIsValid, passwordIsValid]
  );

  const emailChangeHandler = (event) => {
    const email = event.target.value;
    dispatch({ type: actions.SET_EMAIL, value: email });
  };

  const passwordChangeHandler = (event) => {
    const pwd = event.target.value;
    dispatch({ type: actions.SET_PASSWORD, value: pwd });
  };

  const validateEmailHandler = () => {
    dispatch({ type: actions.VALIDATE_EMAIL });
  };

  const validatePasswordHandler = () => {
    dispatch({ type: actions.VALIDATE_PASSWORD });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
