import React, {useContext} from "react";
import {DataContext} from "./DataContext";
import {useSelector} from "react-redux";
import {FaArrowAltCircleLeft} from "react-icons/fa";
import {motion} from "framer-motion";

function Comapre({history}) {
  const store = useSelector(dataNumber => dataNumber.datas);

  const {subPageVariants, subPageTransition} = useContext(DataContext);

  const back = () => history.push("/logged/compare/choose");

  const display = dataArray =>
    dataArray.map((data, id) => {
      if (data[0] !== "Date" && data[0] !== "_id" && data[0] !== "image")
        return (
          <span key={id}>
            {data[0]}: {data[1]}cm
          </span>
        );
      else if (data[0] === "image")
        return (
          <img
            key={id}
            className="data__image"
            alt="zdjęcie sylwetki"
            src={document.location.origin + "/" + data[1]}
          />
        );
    });

  return (
    <motion.div
      className="chosen-number"
      initial="in"
      animate="done"
      exit="out"
      variants={subPageVariants}
      transition={subPageTransition}
    >
      <div className="chosen-number__back" onClick={back}>
        <FaArrowAltCircleLeft />
      </div>
      <div className="chosen-number__data">
        <h2 className="data__title">
          {history.location.dataNumber &&
            store[history.location.dataNumber[0]].Date}
        </h2>

        <div className="data__section">
          {history.location.dataNumber &&
            display(Object.entries(store[history.location.dataNumber[0]]))}
        </div>
      </div>
      <div className="chosen-number__data">
        <h2 className="data__title">
          {history.location.dataNumber &&
            store[history.location.dataNumber[1]].Date}
        </h2>

        <div className="data__section">
          {history.location.dataNumber &&
            display(Object.entries(store[history.location.dataNumber[1]]))}
        </div>
      </div>
    </motion.div>
  );
}

export default Comapre;
