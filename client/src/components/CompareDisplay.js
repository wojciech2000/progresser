import React, {useContext, useState, Fragment} from "react";
import {DataContext} from "./DataContext";
import {useSelector} from "react-redux";
import {FaArrowAltCircleLeft} from "react-icons/fa";
import {motion} from "framer-motion";

function Comapre({history}) {
  const store = useSelector(dataNumber => dataNumber.datas);

  const {subPageVariants, subPageTransition} = useContext(DataContext);
  const [toggleButton, setToggleButton] = useState(true);

  const back = () => history.push("/logged/compare/choose");

  const toggleDisplay = () => {
    const displayDifference = document.querySelector(".chosen-number__difference");
    const displayDivs = document.querySelectorAll(".chosen-number__data");

    displayDifference.classList.toggle("chosen-number__difference--active");
    displayDivs.forEach(div => div.classList.toggle("chosen-number__data--unactive"));

    setToggleButton(prevValue => !prevValue);
  };

  const displayDifference = () => {
    let dataNames = [];
    for (let i of Object.entries(store[history.location.dataNumber[0]])) {
      for (let j of Object.entries(store[history.location.dataNumber[1]])) {
        if (i[0] === j[0]) {
          if (i[1] - j[1] < 0) {
            dataNames.push(`${i[0]}: wzrost ${Math.abs(i[1] - j[1])}cm`);
          } else if (i[1] - j[1] > 0) {
            dataNames.push(`${i[0]}: spadek ${Math.abs(j[1] - i[1])}cm`);
          } else if (i[1] - j[1] === 0) {
            dataNames.push(`${i[0]}: brak zmian`);
          }
        }
      }
    }
    return dataNames.map((dataName, id) => <span key={id}>{dataName}</span>);
  };

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
          <img key={id} className="data__image" alt="zdjęcie sylwetki" src={document.location.origin + "/" + data[1]} />
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
      {history.location.dataNumber && store.length > 0 && (
        <Fragment>
          <button type="button" className="chosen-number__back" onClick={back}>
            <FaArrowAltCircleLeft />
          </button>
          <div className="chosen-number__data">
            <h2 className="data__title">{store[history.location.dataNumber[0]].Date}</h2>

            <div className="data__section">{display(Object.entries(store[history.location.dataNumber[0]]))}</div>
          </div>
          <div className="chosen-number__data">
            <h2 className="data__title">{store[history.location.dataNumber[1]].Date}</h2>

            <div className="data__section">{display(Object.entries(store[history.location.dataNumber[1]]))}</div>
          </div>
          {displayDifference().length > 0 && (
            <Fragment>
              <div className="chosen-number__difference">{displayDifference()}</div>
              <button type="button" className="chosen-number__difference-toggle" onClick={toggleDisplay}>
                {toggleButton ? "Pokaż" : "Ukryj"} porównanie
              </button>
            </Fragment>
          )}
        </Fragment>
      )}
    </motion.div>
  );
}

export default Comapre;
