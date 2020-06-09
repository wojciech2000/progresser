import React from 'react'
import Form from './Form'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router,Switch, Route, Redirect } from 'react-router-dom'

function Body() {

    //this data is download by logging in and remove by logging out
    const checkIfUserIsLogged = useSelector(state => state.datasName)

    console.log()

    return (
        <div className="body">
            <Router>

            <Switch>

                <Route path="/home/login">
                    <Form />
                </Route>
                
                <Route path="/logged/current">
                    <Nav />
                </Route>

            </Switch>

            {(checkIfUserIsLogged.length > 0 || sessionStorage.getItem('token')) ? <Redirect to="/logged/current" /> : <Redirect to="/home/login" />}

            </Router>
        </div>
    )
}

export default Body
