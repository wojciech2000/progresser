import React, { Fragment, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import actions from "../redux/data/dataActions";
import actionsName from "../redux/dataNames/dataNamesActions";
import { DataContext } from "./DataContext";
import { AnimatePresence } from "framer-motion";

import Current from "./Current";
import AddData from "./AddData";
import AddDataSend from "./AddDataSend";
import Compare from "./Compare";
import History from "./History";

function Nav() {
  const { logInLogOutTransition } = useContext(DataContext);

  const toggleNav = () => {
    const nav = document.querySelector(".nav");

    nav.classList.toggle("nav--active");

    const lines = document.querySelectorAll(".hamburger__line");

    lines.forEach((line, index) => {
      line.classList.toggle(`hamburger__line${index + 1}--active`);
    });

    const lis = document.querySelectorAll("nav li");

    lis.forEach(li => {
      li.addEventListener("click", () => {
        nav.classList.remove("nav--active");

        lines.forEach((line, index) => {
          line.classList.remove(`hamburger__line${index + 1}--active`);
        });
      });
    });
  };

  const dispatch = useDispatch();

  const logOut = () => {
    logInLogOutTransition("wylogowano");
    dispatch(actions.clear());
    dispatch(actionsName.clear());
    sessionStorage.removeItem("token");
  };

  return (
    <Fragment>
      <Router>
        <div className='hamburger' onClick={toggleNav}>
          <div className='hamburger__line hamburger__line1'></div>
          <div className='hamburger__line hamburger__line2'></div>
          <div className='hamburger__line hamburger__line3'></div>
        </div>

        <nav className='nav'>
          <ul>
            <li>
              <NavLink tabIndex='-1' to='/logged/current'>
                aktualne
              </NavLink>
            </li>
            <li>
              <NavLink tabIndex='-1' to='/logged/add-data'>
                dodaj
              </NavLink>
            </li>
            <li>
              <NavLink tabIndex='-1' to='/logged/compare'>
                porównaj
              </NavLink>
            </li>
            <li>
              <NavLink tabIndex='-1' to='/logged/history'>
                historia
              </NavLink>
            </li>
            <li className='nav__logout' onClick={logOut}>
              wyloguj
            </li>
          </ul>
        </nav>

        <Route
          render={({ location }) => (
            <AnimatePresence>
              <Switch location={location} key={location.pathname}>
                <Route exact path='/logged/current' component={Current} />
                <Route exact path='/logged/add-data' component={AddData} />
                <Route
                  exact
                  path='/logged/add-data-send'
                  component={AddDataSend}
                />
                <Route exact path='/logged/compare' component={Compare} />
                <Route exact path='/logged/history' component={History} />
              </Switch>
            </AnimatePresence>
          )}
        />
      </Router>
    </Fragment>
  );
}

export default Nav;
