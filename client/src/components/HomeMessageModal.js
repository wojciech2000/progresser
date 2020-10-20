import React, {useContext, useEffect} from "react";
import {DataContext} from "./DataContext";
import {motion, AnimatePresence} from "framer-motion";

const homeMessageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
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
  const {homeMessage, setHomeMessage} = useContext(DataContext);

  useEffect(() => {
    const fadeout = setTimeout(() => {
      setHomeMessage("");
    }, 2000);

    return () => {
      clearTimeout(fadeout);
    };
  }, [homeMessage]);

  return (
    <AnimatePresence>
      {homeMessage && (
        <motion.div
          className="form__message"
          variants={homeMessageVariants}
          animate="visible"
          initial="hidden"
          exit="leave"
        >
          {homeMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoggedMessageModal;
