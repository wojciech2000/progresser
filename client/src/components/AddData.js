import React, {useContext} from "react";
import {DataContext} from "./DataContext";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";

import AddDataChoose from "./AddDataChoose";
import AddDataSend from "./AddDataSend";

function AddData() {
  const {pageVariants, pageTransition} = useContext(DataContext);

  return (
    <motion.div
      className="add-data"
      initial="in"
      animate="done"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Router>
        <Route
          render={({location}) => (
            <AnimatePresence>
              <Switch location={location} key={location.pathname}>
                <Route
                  exact
                  path="/logged/add-data/choose"
                  component={AddDataChoose}
                />
                <Route
                  exact
                  path="/logged/add-data/send"
                  component={AddDataSend}
                />
              </Switch>
            </AnimatePresence>
          )}
        ></Route>
      </Router>
    </motion.div>
  );
}

export default AddData;
