import React, {useContext, useEffect} from "react";
import {DataContext} from "./DataContext";
import {motion, AnimatePresence} from "framer-motion";

const loggedMessageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  leave: {
    opacity: 0,
  },
};

function LoggedMessageModal() {
  const {loggedMessage, setLoggedMessage} = useContext(DataContext);

  useEffect(() => {
    const fadeout = setTimeout(() => {
      setLoggedMessage("");
    }, 2000);

    return () => {
      clearTimeout(fadeout);
    };
  }, [loggedMessage]);

  return (
    <AnimatePresence>
      {loggedMessage && (
        <motion.div
          className="logged__message"
          variants={loggedMessageVariants}
          animate="visible"
          initial="hidden"
          exit="leave"
        >
          {loggedMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoggedMessageModal;
