import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import gsap from 'gsap'

const Form = () => {

    useEffect(() => {
        const tl = gsap.timeline()
        const form = document.querySelector('.form')
        tl.from(form, { opacity: 0, x: 100})
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
                    <Link onClick={switchTab} to='/home/login' className="switches__switch switches__switch--active">zaloguj</Link>
                    <Link onClick={switchTab} to='/home/register' className="switches__switch">zarejestruj</Link>
                </div>

                <div className="form__content">
                    <Switch>
                        <Route exac path='/home/login' component={Login}/>
                        <Route exac path='/home/register' component={Register}/>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default Form
