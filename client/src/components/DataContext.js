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

    const switchFormAnimation = elements => {
        const tl = gsap.timeline()
        tl.fromTo(elements, { opacity: 0, x: elements.length === 3 ? -80: 80}, { opacity: 1, x: 0, stagger: .2, delay: .2})
    }

    const homeFormMessage = incomeMessage => {

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

    const loggedMessage = incomeMessage => {

        const existingMessage = document.querySelector('.logged__message')

        if(!existingMessage)
        {
            const message = document.createElement('div')
            message.classList.add('logged__message')
            message.textContent = incomeMessage
            document.querySelector('.body').appendChild(message)

            const tl = gsap.timeline()
            tl.fromTo(message, {duration: .5,x: "70", opacity: 0}, {duration: .5,x: "0", opacity: 1})
            .to(message, {duration: .5, delay: 1.5,x: "-70", opacity: 0})

            //remove div after animation
            setTimeout(()=> message.remove() ,3600)
        }

    }

    const transitionAnimation = (fadeOut, fadeIn) => {
        const tl = gsap.timeline()

        let forwardAnimation = false

        if(fadeOut.classList.contains('select-data') || fadeOut.classList.contains('select-number')) forwardAnimation = true

        tl.to(fadeOut, {x: forwardAnimation ? 100 : -100, opacity: 0} )
        .fromTo(fadeIn, { x: forwardAnimation ? -100 : 100, opacity: 0 }, { x: 0, opacity: 1})

        setTimeout(()=> {
            fadeOut.style.zIndex = 0
            fadeOut.style.userSelect = 'none'

            fadeIn.style.zIndex = 1
            fadeIn.style.userSelect = 'unset'
        }, 700)
    }

    const logInLogOutTransition = status => {

        const root = document.getElementById('root')
        const div = document.createElement('div')
        div.classList.add('logInLogOut')
        div.textContent = status

        root.appendChild(div)

        const tl = gsap.timeline()

        tl.from(div, { opacity: 0, x: -100, duration: .3})
        .to(div, { opacity: 0, x: 100, duration: .3, delay: .8 })

        //clear after animation
        setTimeout(()=> div.remove(), 2000)

    }

    const pageVariants = {
        in: {
            opacity: 0,
            x: '-200%',
        },
        done: {
            opacity: 1,
            x: 0,
        },
        out: {
            opacity: 0,
            x: '200%',
        }
    }

    const pageTransition = {
        duration: .2,
        type: 'spring',
        stiffness: 50
    }

    return (
        <DataContext.Provider value={{ inputActiveAnimation, homeFormMessage, loggedMessage, transitionAnimation, switchFormAnimation, logInLogOutTransition, pageVariants, pageTransition }}>
            {props.children}
        </DataContext.Provider>
    )
}
