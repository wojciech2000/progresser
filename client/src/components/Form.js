import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

const Form = () => {

    useEffect(() => {

        //set active styles for current route's switch
        const location = window.location.pathname

        const login = document.querySelector('.form__switches').firstChild
        const register = document.querySelector('.form__switches').lastChild

        location === '/login' ? login.classList.add('switches__switch--active') : register.classList.add('switches__switch--active')
    }, [])

    const switchTab = e => {
        const clickedTab = e.target
        const tabs = document.querySelectorAll('.switches__switch')

        tabs.forEach(tab => {
            tab.classList.remove('switches__switch--active')
        })

        clickedTab.classList.add('switches__switch--active')
    }

    return (
        <div className="form">
            <Router>
                <div className="form__switches">
                    <Link onClick={switchTab} to='/login' className="switches__switch">zaloguj</Link>
                    <Link onClick={switchTab} to='/register' className="switches__switch">zarejestruj</Link>
                </div>

                <div className="form__content">
                    <Switch>
                        <Route exac path='/login' component={Login}/>
                        <Route exac path='/register' component={Register}/>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default Form
