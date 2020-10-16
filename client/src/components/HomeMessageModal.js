import React, {useContext, useEffect} from "react";
import {DataContext} from "./DataContext";
import {motion, AnimatePresence} from "framer-motion";

const homeMessageVariants = {
  hidden: {
    x: 50,
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

function HomeMessage() {
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

export default HomeMessage;
