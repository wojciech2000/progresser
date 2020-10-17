import React, {useContext, useEffect} from "react";
import {DataContext} from "./DataContext";
import {motion, AnimatePresence} from "framer-motion";

const loginLogoutVariants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  leave: {
    x: -50,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

function LoginLogoutModal() {
  const {loginLogoutContent, setLoginLogoutContent} = useContext(DataContext);

  useEffect(() => {
    const fadeout = setTimeout(() => {
      setLoginLogoutContent("");
    }, 2000);

    return () => {
      clearTimeout(fadeout);
    };
  }, [loginLogoutContent]);

  return (
    <AnimatePresence>
      {loginLogoutContent && (
        <motion.div
          className="logInLogOut"
          variants={loginLogoutVariants}
          animate="visible"
          initial="hidden"
          exit="leave"
        >
          {loginLogoutContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoginLogoutModal;
