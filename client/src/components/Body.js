import React, {useEffect, useContext} from "react";
import Form from "./Form";
import Nav from "./Nav";
import {DataContext} from "./DataContext";
import {getAllData} from "../redux/data/fetchData";
import {getAllDataNames} from "../redux/dataNames/fetchDataNames";
import {useDispatch, useSelector} from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginLogoutModal from "./LoginLogoutModal";

function Body() {
  const {loginLogoutContent} = useContext(DataContext);

  //this datas are download by logging in and remove by logging out
  const checkIfUserIsLogged = useSelector(state => state.dataNames);
  const dispatch = useDispatch();

  useEffect(() => {
    //if user is logged fetch his data to redux
    if (sessionStorage.getItem("token")) {
      dispatch(getAllData("/logged/fetch-all-data"));
      dispatch(getAllDataNames());
    }
  }, [dispatch]);

  return (
    <div className="body">
      <Router>
        <Switch>
          <Route path="/home/login">
            <Form />
          </Route>

          <Route path="/logged/current">
            <Nav />
          </Route>
        </Switch>

        {checkIfUserIsLogged.length > 0 || sessionStorage.getItem("token") ? (
          <Redirect to="/logged/current" />
        ) : (
          <Redirect to="/home/login" />
        )}
      </Router>
      <LoginLogoutModal />
    </div>
  );
}

export default Body;
