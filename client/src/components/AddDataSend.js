import React, {useState, useContext, Fragment} from "react";
import {DataContext} from "./DataContext";
import {useDispatch} from "react-redux";
import {getCurrentData} from "../redux/data/fetchData";
import {FaArrowAltCircleLeft} from "react-icons/fa";
import {MdAddCircle} from "react-icons/md";
import {MdInsertPhoto} from "react-icons/md";
import {motion} from "framer-motion";
import axios from "axios";

function AddData({history}) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const {
    inputActiveAnimation,
    loggedMessage,
    subPageVariants,
    subPageTransition,
  } = useContext(DataContext);

  const back = () => history.push("/logged/add-data/choose");

  const showImage = e => {
    const file = e.target.files[0];
    const imagePreview = document.querySelector(".chosen-data__input-image");

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        imagePreview.style.background = ` url(${this.result}) center / cover no-repeat  `;
      });
      setImage(file);
      reader.readAsDataURL(file);
    }
  };

  const displayChosen = dataType => {
    if (history.location.state) {
      return history.location.state.map((data, id) => {
        if (dataType !== "image" && data !== "zdjęcie") {
          return (
            <div className="chosen-data__input-div" key={id}>
              <input
                onFocus={inputActiveAnimation}
                className="input-div__input"
                type="number"
                id={data}
                autoComplete="off"
              />
              <label htmlFor={data}>{data}(cm)</label>
            </div>
          );
        }
        if (dataType === "image" && data === "zdjęcie") {
          return (
            <div className="chosen-data__input-image" key={id}>
              <input
                onChange={showImage}
                type="file"
                className="input-image__input"
                id={data}
              />
              <label htmlFor={data} className="input-image__label">
                <MdInsertPhoto />
              </label>
            </div>
          );
        }
      });
    }
  };

  const send = () => {
    const inputsNumber = document.querySelectorAll(".input-div__input");
    const fileWrapper = document.querySelector(".input-image__input");
    let positiveValidation = true;
    const formData = new FormData();

    if (fileWrapper) {
      if (image) {
        formData.append("image", image);
      } else {
        positiveValidation = false;
        loggedMessage("uzupełnij wszystkie dane");
      }
    }

    inputsNumber.forEach(input => {
      if (!input.value) {
        positiveValidation = false;
        loggedMessage("uzupełnij wszystkie dane");
      } else {
        formData.append(input.getAttribute("id"), input.value);
      }
    });

    if (positiveValidation) {
      axios
        .post("/logged/add-data", formData, {
          headers: {auth: sessionStorage.getItem("token")},
        })
        .then(res => {
          loggedMessage("dodano");
          dispatch(getCurrentData());
        })
        .catch(err => {
          loggedMessage("Możesz dodać tylko zdjęcie (.jpg / .png)");
        });
    }
  };

  return (
    <Fragment>
      <motion.div
        className="chosen-data"
        initial="in"
        animate="done"
        exit="out"
        variants={subPageVariants}
        transition={subPageTransition}
      >
        {displayChosen("image")}
        <div className="chosen-data__inputs">{displayChosen("data")}</div>
        <button className="chosen-data__back" onClick={back}>
          <FaArrowAltCircleLeft />
        </button>
        <button type="submit" className="chosen-data__confirm" onClick={send}>
          <MdAddCircle />
        </button>
      </motion.div>
    </Fragment>
  );
}

export default AddData;
