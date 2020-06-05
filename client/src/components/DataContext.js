import React, { createContext } from 'react'

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

    return (
        <DataContext.Provider value={{ inputActiveAnimation }}>
            {props.children}
        </DataContext.Provider>
    )
}
