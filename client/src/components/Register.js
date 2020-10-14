import React, {useContext} from "react";
import {DataContext} from "./DataContext";
import axios from "axios";
import {motion} from "framer-motion";

function Register() {
  const {
    inputActiveAnimation,
    setHomeMessage,
    containerVariants,
    childrenVariants,
  } = useContext(DataContext);

  const createUser = e => {
    e.preventDefault();

    const name = document.querySelector(".register__userName");
    const password = document.querySelector(".register__userPassword");
    const repeatPassword = document.querySelector(".register__userPassword2");

    const createUser = {
      userName: name.value,
      userPassword: password.value,
      userPassword2: repeatPassword.value,
    };

    axios
      .post("/add-user", createUser)
      .then(res => {
        //If there is message, trouble occured
        if (res.data) {
          setHomeMessage(res.data);
        } else {
          setHomeMessage("Użytkownik został dodany");
          name.value = "";
          password.value = "";
          repeatPassword.value = "";

          const labels = document.querySelectorAll(".userName__label");

          labels.forEach(label => label.classList.remove("label--active"));

          name.blur();
          password.blur();
          repeatPassword.blur();
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <motion.form
      className="register"
      variants={containerVariants}
      animate="visible"
    >
      <motion.div
        className="register__input"
        variants={childrenVariants}
        animate="visible"
        initial="registerHidden"
      >
        <input
          onFocus={inputActiveAnimation}
          type="text"
          className="register__userName"
        />
        <label className="userName__label">login</label>
      </motion.div>
      <motion.div
        className="register__input"
        variants={childrenVariants}
        animate="visible"
        initial="registerHidden"
      >
        <input
          onFocus={inputActiveAnimation}
          type="password"
          className="register__userPassword"
        />
        <label className="userName__label">hasło</label>
      </motion.div>
      <motion.div
        className="register__input"
        variants={childrenVariants}
        animate="visible"
        initial="registerHidden"
      >
        <input
          onFocus={inputActiveAnimation}
          type="password"
          className="register__userPassword2"
        />
        <label className="userName__label">powtórz hasło</label>
      </motion.div>

      <motion.input
        className="register__submit"
        type="submit"
        value="Zarejestruj się"
        onClick={createUser}
        variants={childrenVariants}
        animate="visible"
        initial="registerHidden"
      />
    </motion.form>
  );
}

export default Register;
