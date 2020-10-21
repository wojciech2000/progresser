import React, {useContext} from "react";
import {DataContext} from "./DataContext";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import dataActions from "../redux/data/dataActions";
import boarIllustration from "../pictures/red-boar.png";
import {motion} from "framer-motion";
import {MdDeleteForever} from "react-icons/md";
import axios from "axios";

function History() {
  const datas = useSelector(state => state.datas);
  const dispatch = useDispatch();
  const {pageVariants, pageTransition, setLoggedMessage} = useContext(
    DataContext,
  );

  const deleteTab = e => {
    const tab = e.target.closest(".history__tab");
    const tabNumber = tab.querySelector(".tab__number").textContent;

    dispatch(dataActions.remove(tabNumber - 1));
    setLoggedMessage("dane usunięto");
    axios
      .delete(
        `/logged/delete-data/${datas[tabNumber - 1]._id}/${
          datas[tabNumber - 1].image &&
          datas[tabNumber - 1].image.substr(
            7,
            datas[tabNumber - 1].image.length,
          )
        }`,
        {headers: {auth: sessionStorage.getItem("token")}},
      )
      .catch(err => console.log(err));
  };

  const display = () => {
    if (datas.length === 0) {
      return (
        <div className="history__no-data">
          <span className="no-data__span">dodaj dane, dziku</span>
          <img
            className="no-data__image"
            src={boarIllustration}
            alt="boar-illustration"
          />
        </div>
      );
    }

    return datas
      .map(data => Object.entries(data))
      .map((value, id) => {
        let datas = [];
        let image;
        let date;

        for (let [, val] of Object.entries(value)) {
          if (val[0] === "Date") date = val[1];
          else if (val[0] === "image") image = val[1];
          else if (val[0] !== "_id") {
            datas.push(`${val[0]}: ${val[1]}cm`);
          }
        }

        return (
          <div className="history__tab" key={id}>
            <h2 className="tab__header">{date}</h2>
            <span className="tab__number">{id + 1}</span>
            <div className="tab__section">
              {image && (
                <img
                  className="tab__image"
                  alt="zdjęcie sylwetki"
                  src={document.location.origin + "/" + image}
                />
              )}
              <div
                className={
                  image ? "tab__data" : "tab__data tab__data--just-data"
                }
              >
                {datas.map((data, key) => (
                  <span key={key}>{data}</span>
                ))}
              </div>
            </div>
            <div className="tab__delete" onClick={deleteTab}>
              <MdDeleteForever />
            </div>
          </div>
        );
      });
  };

  return (
    <motion.div
      className="history"
      initial="in"
      animate="done"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="history__tabs">{display()}</div>
    </motion.div>
  );
}

export default History;
