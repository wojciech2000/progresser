import React, { createContext } from 'react'
import gsap from 'gsap'

export const DataContext = createContext()

export const DataProvider = props => {

    const inputActiveAnimation = e => {
        const input = e.target
        const label = input.nextSibling

        label.classList.add('label--active') 

        input.addEventListener('blur', () =>
        {
            if(input.value === "")
            {
                label.classList.remove('label--active')
            }
        })
    }

    const HomeFormMessage = incomeMessage => {

        const existingMessage = document.querySelector('.form__message')

        if(!existingMessage)
        {
            const message = document.createElement('div')
            message.classList.add('form__message')
            message.textContent = incomeMessage
            document.querySelector('.form').appendChild(message)

            const tl = gsap.timeline()
            tl.fromTo(message, {duration: .5,x: "70", opacity: 0}, {duration: .5,x: "0", opacity: 1})
            .to(message, {duration: .5, delay: 2.5,x: "0", opacity: 0})

            //remove div after animation
            setTimeout(()=> message.remove() ,3500)
        }

    }

    return (
        <DataContext.Provider value={{ inputActiveAnimation, HomeFormMessage }}>
            {props.children}
        </DataContext.Provider>
    )
}
