import React, { useContext, useState } from "react";
import { DataContext } from "./DataContext";
import { useSelector } from "react-redux";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { TweenMax, Power4, Back } from "gsap";

function AddData(props) {
  const dataNames = useSelector(state => state.dataNames);
  const { loggedMessage, pageVariants, pageTransition } = useContext(
    DataContext
  );

  const [choosenData, setChoosenData] = useState([]);

  const mouseDown = e => {
    TweenMax.to(e.target, { scale: 0.8, duration: 0.2, ease: Power4.easeOut });
  };

  const mouseUp = e => {
    const dataName = e.target;
    dataName.classList.toggle("select-data__data-name--active");

    const isInArray = choosenData.find(
      current => current === dataName.textContent
    );

    if (isInArray) {
      //remove from array
      setChoosenData(
        choosenData.filter(
          current => current !== dataName.textContent && current
        )
      );
    } else {
      //add to array
      setChoosenData([...choosenData, dataName.textContent]);
    }

    TweenMax.to(e.target, {
      scale: 1,
      duration: 0.5,
      ease: Back.easeOut.config(6),
    });
  };

  const confirm = () => {
    const chosenData = Array.from(
      document.querySelectorAll(".select-data__data-name--active")
    );

    if (chosenData.length === 0)
      return loggedMessage("wybierz przynajmniej jedną opcje");
    else {
      props.history.push({
        pathname: "/logged/add-data-send",
        state: choosenData,
      });
    }
  };

  return (
    <motion.div
      className='add-data'
      initial='in'
      animate='done'
      exit='out'
      variants={pageVariants}
      transition={pageTransition}>
      <div className='select-data'>
        {dataNames.map((name, id) => (
          <div
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            className='select-data__data-name'
            key={id}>
            {name === "image" ? "zdjęcie" : name}
          </div>
        ))}

        <button className='select-data__confirm' onClick={confirm}>
          <FaArrowAltCircleRight />
        </button>
      </div>
    </motion.div>
  );
}

export default AddData;
