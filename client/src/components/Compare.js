import React, { useState, useContext, Fragment } from 'react'
import { DataContext } from './DataContext'
import { useSelector } from 'react-redux'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'

function Comapre() {

    const { LoggedMessage, transitionAnimation, pageVariants, pageTransition } = useContext(DataContext)
    const store = useSelector(state => state.datas)
    const [numOne, setNumOne] = useState({})
    const [numTwo, setNumTwo] = useState({})

    const confirm = () => {

        const selectWrapper = document.querySelector('.select-number')
        const chosenWrapper = document.querySelector('.chosen-number')

        const num1 = document.querySelector('.select-number__num1').value-1
        const num2 = document.querySelector('.select-number__num2').value-1

        if(store.length < num1+1 || store.length < num2+1 || num1 < 0 || num2 < 0)
        {
            LoggedMessage('Niepoprawna liczba')
        }
        else if(num1 === num2)
        {
            LoggedMessage("Liczby nie mogą być takie same")
        }
        else
        {

            setNumOne(store[num1])
            setNumTwo(store[num2])

            transitionAnimation(selectWrapper, chosenWrapper)
        }
    }

    const back = () => {
        const selectWrapper = document.querySelector('.select-number')
        const chosenWrapper = document.querySelector('.chosen-number')

        transitionAnimation(chosenWrapper, selectWrapper)

    }

    const display = dataArray => (
        dataArray.map((data, id) => {

            if(data[0] !== "Date" && data[0] !== "_id" && data[0] !== 'image') return <span key={id}>{data[0]}: {data[1]}cm</span>
            else if(data[0] === 'image' ) return <img key={id} className="data__image" alt="zdjęcie sylwetki" src={document.location.origin + '/' + data[1]} />

        })
    )

    return (
        <Fragment>
            <motion.div className="select-number"
            initial='in'
            animate='done'
            exit='out'
            variants={pageVariants}
            transition={pageTransition}>
                <h2 className="select-number__title">Wybierz numery tabel</h2>
                <div className="select-number__section">
                    <input type="number" className="select-number__num1"/>
                    <input type="number" className="select-number__num2"/>
                    <button type="submit" className="select-number__confirm" onClick={confirm}><FaArrowAltCircleRight /></button>
                </div>
            </motion.div>

            <div className="chosen-number">
                <div className="chosen-number__back" onClick={back}><FaArrowAltCircleLeft /></div>
                <div className="chosen-number__data">
                    <h2 className="data__title">{numOne && numOne.Date}</h2>

                    <div className="data__section">
                        {display(Object.entries(numOne))}
                    </div>

                </div>
                <div className="chosen-number__data">
                    <h2 className="data__title">{numTwo && numTwo.Date}</h2>

                    <div className="data__section">
                        {display(Object.entries(numTwo))}
                    </div>

                </div>
            </div>

        </Fragment>
    )
}

export default Comapre
