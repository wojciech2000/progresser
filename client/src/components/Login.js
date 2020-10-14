import React, {useContext, useEffect} from "react";
import {DataContext} from "./DataContext";
import {getAllData} from "../redux/data/fetchData";
import {getAllDataNames} from "../redux/dataNames/fetchDataNames";
import {useDispatch} from "react-redux";
import axios from "axios";
import {motion} from "framer-motion";

function Login() {
  const {
    inputActiveAnimation,
    setHomeMessage,
    logInLogOutTransition,
    containerVariants,
    childrenVariants,
  } = useContext(DataContext);
  const dispatch = useDispatch();

  const login = e => {
    e.preventDefault();

    const name = document.querySelector(".login__userName");
    const password = document.querySelector(".login__userPassword");

    const sendDatas = {
      userName: name.value,
      userPassword: password.value,
    };

    axios
      .post("/login", sendDatas)
      .then(res => {
        //If there is message, trouble occured
        if (
          res.data === "Uzupełnij wszystkie pola" ||
          res.data === "Niepoprawne hasło lub login"
        ) {
          setHomeMessage(res.data);
        } else {
          const auth = res.headers.auth;
          sessionStorage.setItem("token", auth);
          logInLogOutTransition("zalogowano");
          dispatch(getAllData());
          dispatch(getAllDataNames());
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <motion.form
      className="login"
      onSubmit={login}
      variants={containerVariants}
      animate="visible"
    >
      <motion.div
        className="login__input"
        variants={childrenVariants}
        animate="visible"
        initial="loginHidden"
      >
        <input
          onFocus={inputActiveAnimation}
          type="text"
          className="login__userName"
        />
        <label className="userName__label">login</label>
      </motion.div>

      <motion.div
        className="login__input"
        variants={childrenVariants}
        animate="visible"
        initial="loginHidden"
      >
        <input
          onFocus={inputActiveAnimation}
          type="password"
          className="login__userPassword"
        />
        <label className="userPassword__label">haslo</label>
      </motion.div>

      <motion.input
        className="login__submit"
        type="submit"
        value="Zaloguj się"
        variants={childrenVariants}
        animate="visible"
        initial="loginHidden"
      />
    </motion.form>
  );
}

export default Login;
