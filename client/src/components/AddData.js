import React, { Fragment, useState, useContext } from 'react'
import { DataContext } from './DataContext'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentData } from '../redux/data/fetchData'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import { GrSend } from 'react-icons/gr'
import { MdInsertPhoto } from 'react-icons/md'
import gsap from 'gsap'
import axios from 'axios'

function AddData() {

    const dataNames = useSelector(state => state.dataNames)
    const dispatch = useDispatch()
    const [selectedData, setSelectedData] = useState([])
    const [image, setImage] = useState(null)
    const { inputActiveAnimation, LoggedMessage } = useContext(DataContext)

    const displayDataNames = () => (
            dataNames.map((name, id) => (
                <div onClick={activeStyle} className="select-data__data-name" key={id}>{name === 'image' ? 'zdjęcie' : name}</div>
            ))
    )

    const activeStyle = e => {
        e.target.classList.toggle('select-data__data-name--active')
    }

    const transitionAnimation = (fadeOut, fadeIn) => {
        const tl = gsap.timeline()

        console.log()

        tl.to(fadeOut, {x: fadeOut.classList.contains('select-data') ? 100 : -100, opacity: 0} )
        .fromTo(fadeIn, { x: fadeOut.classList.contains('select-data') ? -100 : 100, opacity: 0 }, { x: 0, opacity: 1})

        setTimeout(()=> {
            fadeOut.style.zIndex = 0
            fadeOut.style.userSelect = 'none'

            fadeIn.style.zIndex = 1
            fadeIn.style.userSelect = 'unset'
        }, 700)
    }

    const confirm = () => {
        const selectWrapper = document.querySelector('.select-data')
        const chosenWrapper = document.querySelector('.chosen-data')
        const chesenDataInputs = document.querySelector('.chosen-data__inputs')
        const chosenData = Array.from(document.querySelectorAll('.select-data__data-name--active'))
        
        if(chosenData.length === 0) return LoggedMessage('wybierz przynajmniej jedną opcje')

        transitionAnimation(selectWrapper, chosenWrapper)

        const findImage = chosenData.find(data => data.textContent === 'zdjęcie')

        if(findImage && chosenData.length === 1)
        {
            chesenDataInputs.style.display = 'none'
        }
        else
        {
            chesenDataInputs.style.display = 'flex'
        }

        setSelectedData(chosenData)

    }

    const back = () =>{
        const selectWrapper = document.querySelector('.select-data')
        const chosenWrapper = document.querySelector('.chosen-data')

        transitionAnimation(chosenWrapper, selectWrapper)
    }

    const showImage = e => 
    {
        const file = e.target.files[0]
        const imagePreview = document.querySelector('.chosen-data__input-image')
    
        if(file)
        {
    
          const reader = new FileReader()
    
          reader.addEventListener("load", function(){
            imagePreview.style.background = ` url(${this.result}) center / cover no-repeat  `
          })
          setImage(file)
          reader.readAsDataURL(file)
        }
    }

    const displayChosen = dataType => {
        if(selectedData)
        {
            return (selectedData.map((data, id) => {

                if(dataType !== 'image' && data.textContent !== 'zdjęcie')
                {
                    return (
                        <div className="chosen-data__input-div" key={id}>
                            <input onFocus={inputActiveAnimation} className="input-div__input" type="number" id={data.textContent} />
                            <label htmlFor={data.textContent}>{data.textContent}(cm)</label>
                        </div>
                    )
                }
                if(dataType === 'image' && data.textContent === 'zdjęcie')
                {
                    return (
                        <div className="chosen-data__input-image" key={id}>
                            <input onChange={showImage} type="file" className="input-image__input" id={data.textContent} />
                            <label htmlFor={data.textContent} className="input-image__label"><MdInsertPhoto /></label>
                        </div>
                    )
                }

            }))
        }
        
    }
    
    const send = () => {
        const inputsNumber = document.querySelectorAll('.input-div__input')
        const fileWrapper = document.querySelector('.input-image__input')
        let positiveValidation = true
        const formData = new FormData()

        if(fileWrapper)
        {
            if(image) 
            {
                formData.append('image', image)
            }
            else
            {
                positiveValidation = false
                LoggedMessage('uzupełnij wszystkie dane')
            }
        }

        inputsNumber.forEach(input => {

            if(!input.value)
            {
                positiveValidation = false
                LoggedMessage('uzupełnij wszystkie dane')
            }
            else
            {
                formData.append(input.getAttribute('id'), input.value)
            }
        })

        console.log(formData)

        if(positiveValidation)
        {
            axios.post('/logged/add-data', formData, { headers: { auth: sessionStorage.getItem('token') } })
            .then(res => {
                LoggedMessage('dodano')
                dispatch(getCurrentData())
                console.log(res)

            })
            .catch(err => {
                LoggedMessage('Możesz dodać tylko zdjęcie (.jpg / .png)')
            })
        }

    }

    return (
        <Fragment>
            <div className="select-data">
                {displayDataNames()}
                <button className="select-data__confirm" onClick={confirm}><FaArrowAltCircleRight /></button>
            </div>

            <div className="chosen-data">
                    {displayChosen('image')}
                    <div className="chosen-data__inputs">
                        {displayChosen('data')}
                    </div>
                    
                <button className="chosen-data__back" onClick={back}><FaArrowAltCircleLeft /></button>
                <button type="submit" className="chosen-data__confirm" onClick={send}><GrSend /></button>
            </div>
        </Fragment>
    )
}

export default AddData
