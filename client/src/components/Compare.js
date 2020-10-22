import React, {useContext} from "react";
import {DataContext} from "./DataContext";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";

import CompareChoose from "./CompareChoose";
import CompareDisplay from "./CompareDisplay";

function Compare() {
  const {pageVariants, pageTransition} = useContext(DataContext);

  return (
    <motion.div
      className="compare"
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
                  path="/logged/compare/choose"
                  component={CompareChoose}
                />
                <Route
                  exact
                  path="/logged/compare/display"
                  component={CompareDisplay}
                />
              </Switch>
            </AnimatePresence>
          )}
        ></Route>
      </Router>
    </motion.div>
  );
}

export default Compare;
