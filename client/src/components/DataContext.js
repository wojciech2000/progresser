import React, {createContext, useState} from "react";
import gsap from "gsap";

export const DataContext = createContext();

export const DataProvider = props => {
  const inputActiveAnimation = e => {
    const input = e.target;
    const label = input.nextSibling;

    label.classList.add("label--active");

    input.addEventListener("blur", () => {
      if (input.value === "") {
        label.classList.remove("label--active");
      }
    });
  };

  const [homeMessage, setHomeMessage] = useState("");
  const [loginLogoutContent, setLoginLogoutContent] = useState("");

  const loggedMessage = incomeMessage => {
    const existingMessage = document.querySelector(".logged__message");
    existingMessage && existingMessage.remove();

    const message = document.createElement("div");
    message.classList.add("logged__message");
    message.textContent = incomeMessage;
    document.querySelector(".body").appendChild(message);

    const tl = gsap.timeline();
    tl.from(message, {duration: 0.5, opacity: 0})
      .to(message, {duration: 0.5, delay: 1.5, opacity: 0})
      .set(message, {display: "none"});
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childrenVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    loginHidden: {
      opacity: 0,
      x: -50,
    },
    registerHidden: {
      opacity: 0,
      x: 50,
    },
  };

  const pageVariants = {
    in: {
      opacity: 0,
      scale: 0.2,
      y: "-100%",
    },
    done: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      scale: 0.2,
      y: "100%",
    },
  };

  const subPageVariants = {
    in: {
      opacity: 0,
      scale: 0.2,
    },
    done: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
    out: {
      opacity: 0,
      scale: 0.2,
      transition: {
        duration: 0.4,
      },
    },
  };

  const pageTransition = {
    duration: 0.1,
    type: "spring",
    stiffness: 40,
  };

  const subPageTransition = {
    duration: 0.1,
    type: "spring",
    stiffness: 40,
  };

  return (
    <DataContext.Provider
      value={{
        inputActiveAnimation,
        homeMessage,
        setHomeMessage,
        loginLogoutContent,
        setLoginLogoutContent,
        loggedMessage,
        containerVariants,
        childrenVariants,
        pageVariants,
        subPageVariants,
        pageTransition,
        subPageTransition,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
