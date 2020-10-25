import React, {useContext} from "react";
import {DataContext} from "./DataContext";
import {useSelector} from "react-redux";
import boarIllustration from "../pictures/black-boar.png";
import {motion} from "framer-motion";

function Current() {
  const currentData = useSelector(state => state.datas[state.datas.length - 1]);
  const {pageVariants, pageTransition} = useContext(DataContext);

  const displayData = () => {
    if (!currentData) {
      return (
        <div className="current__no-data">
          <span className="no-data__span">dodaj dane, dziku</span>
          <img className="no-data__image" src={boarIllustration} alt="boar-illustration" />
        </div>
      );
    } else if (currentData) {
      // change object of data(except id and date) into arry so it be possible to use array methods
      const arrayDatas = Object.entries(currentData).filter(value => value[0] !== "Date" && value[0] !== "_id");

      const image = arrayDatas.find(data => data[0] === "image");

      return arrayDatas.map((data, id) => {
        if (data[0] !== "image")
          return (
            <span key={id}>
              {data[0]}: {data[1]}cm
            </span>
          );
        else if (data[0] === "image")
          return (
            <img
              key={id}
              className="current__image"
              alt="zdjęcie sylwetki"
              src={document.location.origin + "/" + data[1]}
            />
          );
      });
    }
  };

  return (
    <motion.div
      className="current"
      initial="in"
      animate="done"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h2 className="current__header">{currentData && currentData.Date}</h2>
      <div className="current__section">{displayData()}</div>
    </motion.div>
  );
}

export default Current;
