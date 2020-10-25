import React, {useContext, useState} from "react";
import {DataContext} from "./DataContext";
import {useSelector} from "react-redux";
import {FaArrowAltCircleRight} from "react-icons/fa";
import {motion} from "framer-motion";

function AddData(props) {
  const dataNames = useSelector(state => state.dataNames);
  const {setLoggedMessage, subPageVariants, subPageTransition} = useContext(DataContext);

  const [chosenData, setChoosenData] = useState([]);

  const addDataName = e => {
    const dataName = e.target;
    dataName.classList.toggle("select-data__data-name--active");

    const isInArray = chosenData.find(current => current === dataName.textContent);

    if (isInArray) {
      //remove from array
      setChoosenData(chosenData.filter(current => current !== dataName.textContent && current));
    } else {
      //add to array
      setChoosenData([...chosenData, dataName.textContent]);
    }
  };

  const confirm = () => {
    if (chosenData.length === 0) return setLoggedMessage("wybierz przynajmniej jedną opcje");
    else {
      props.history.push({
        pathname: "/logged/add-data/send",
        state: chosenData.sort(),
      });
    }
  };

  return (
    <motion.div
      className="select-data"
      initial="in"
      animate="done"
      exit="out"
      variants={subPageVariants}
      transition={subPageTransition}
    >
      {dataNames.map((name, id) => (
        <motion.div
          onClick={e => addDataName(e)}
          className="select-data__data-name"
          key={id}
          whileTap={{scale: 0.85}}
          transition={{type: "spring", stiffness: 400}}
        >
          {name === "image" ? "zdjęcie" : name}
        </motion.div>
      ))}

      <button className="select-data__confirm" onClick={confirm}>
        <FaArrowAltCircleRight />
      </button>
    </motion.div>
  );
}

export default AddData;
