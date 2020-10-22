import React, {useState, useContext} from "react";
import {DataContext} from "./DataContext";
import {useSelector} from "react-redux";
import {FaArrowAltCircleRight} from "react-icons/fa";
import {motion} from "framer-motion";

function Comapre(props) {
  const {setLoggedMessage, subPageVariants, subPageTransition} = useContext(
    DataContext,
  );

  const store = useSelector(state => state.datas);

  const [numOne, setNumOne] = useState(0);
  const [numTwo, setNumTwo] = useState(0);

  const confirm = () => {
    if (
      store.length < numOne ||
      store.length < numTwo ||
      numOne <= 0 ||
      numTwo <= 0
    ) {
      setLoggedMessage("Niepoprawna liczba");
    } else if (numOne === numTwo) {
      setLoggedMessage("Liczby nie mogą być takie same");
    } else if (parseInt(numOne) > parseInt(numTwo)) {
      console.log(numOne, numTwo);
      setLoggedMessage("Pierwsza liczba musi być mniejsza od drugiej");
    } else {
      props.history.push({
        pathname: "/logged/compare/display",
        dataNumber: [parseInt(numOne) - 1, parseInt(numTwo) - 1],
      });
    }
  };

  return (
    <motion.div
      className="select-number"
      initial="in"
      animate="done"
      exit="out"
      variants={subPageVariants}
      transition={subPageTransition}
    >
      <h2 className="select-number__title">Wybierz numery tabel</h2>
      <div className="select-number__section">
        <input
          type="number"
          className="select-number__num1"
          autoComplete="off"
          value={numOne}
          onChange={e => setNumOne(e.target.value)}
        />
        <input
          type="number"
          className="select-number__num2"
          autoComplete="off"
          value={numTwo}
          onChange={e => setNumTwo(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="select-number__confirm"
        onClick={confirm}
      >
        <FaArrowAltCircleRight />
      </button>
    </motion.div>
  );
}

export default Comapre;
