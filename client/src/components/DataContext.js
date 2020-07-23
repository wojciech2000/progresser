import React, { createContext } from "react";
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

  const switchFormAnimation = elements => {
    const tl = gsap.timeline();
    //if there is 3 elements it means it's a register form
    tl.fromTo(
      elements,
      { opacity: 0, x: elements.length === 3 ? -80 : 80 },
      { opacity: 1, x: 0, stagger: 0.2, delay: 0.2 }
    );
  };

  const homeFormMessage = incomeMessage => {
    const existingMessage = document.querySelector(".form__message");
    existingMessage && existingMessage.remove();

    const message = document.createElement("div");
    message.classList.add("form__message");
    message.textContent = incomeMessage;
    document.querySelector(".form").appendChild(message);

    const tl = gsap.timeline();
    tl.fromTo(
      message,
      { duration: 0.5, x: "70", opacity: 0 },
      { duration: 0.5, x: "0", opacity: 1 }
    ).to(message, { duration: 0.5, delay: 2.5, x: "0", opacity: 0 });
  };

  const loggedMessage = incomeMessage => {
    const existingMessage = document.querySelector(".logged__message");
    existingMessage && existingMessage.remove();

    const message = document.createElement("div");
    message.classList.add("logged__message");
    message.textContent = incomeMessage;
    document.querySelector(".body").appendChild(message);

    const tl = gsap.timeline();
    tl.from(message, { duration: 0.5, opacity: 0 })
      .to(message, { duration: 0.5, delay: 1.5, opacity: 0 })
      .set(message, { display: "none" });
  };

  const logInLogOutTransition = status => {
    const existinglogInLogOut = document.querySelector(".logInLogOut");
    existinglogInLogOut && existinglogInLogOut.remove();

    const root = document.getElementById("root");
    const div = document.createElement("div");
    div.classList.add("logInLogOut");
    div.textContent = status;

    root.appendChild(div);
    const tl = gsap.timeline();

    tl.from(div, { opacity: 0, x: -100, duration: 0.3 })
      .to(div, { opacity: 0, x: 100, duration: 0.3, delay: 0.8 })
      .set(div, { display: "none" });
  };

  const pageVariants = {
    in: {
      opacity: 0,
      x: "-200%",
    },
    done: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: "200%",
    },
  };

  const subPageVariants = {
    in: {
      opacity: 0,
      x: "-30%",
    },
    done: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: "30%",
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
        homeFormMessage,
        loggedMessage,
        switchFormAnimation,
        logInLogOutTransition,
        pageVariants,
        subPageVariants,
        pageTransition,
        subPageTransition,
      }}>
      {props.children}
    </DataContext.Provider>
  );
};
