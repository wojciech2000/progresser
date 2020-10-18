import React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import LoggedMessageModal from "./HomeMessageModal";
import Login from "./Login";
import Register from "./Register";

const Form = () => {
  const switchTab = e => {
    const clickedTab = e.target;
    const tabs = document.querySelectorAll(".switches__switch");

    tabs.forEach(tab => {
      tab.classList.remove("switches__switch--active");
    });

    clickedTab.classList.add("switches__switch--active");
  };

  return (
    <div className="form">
      <Router>
        <div className="form__switches">
          <Link
            onClick={switchTab}
            to="/home/login"
            className="switches__switch switches__switch--active"
          >
            zaloguj
          </Link>
          <Link
            onClick={switchTab}
            to="/home/register"
            className="switches__switch"
          >
            zarejestruj
          </Link>
        </div>

        <div className="form__content">
          <Switch>
            <Route exac path="/home/login" component={Login} />
            <Route exac path="/home/register" component={Register} />
          </Switch>
        </div>
        <LoggedMessageModal />
      </Router>
    </div>
  );
};

export default Form;
