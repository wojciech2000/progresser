import React, { useEffect } from 'react'
import Form from './Form'
import Nav from './Nav'
import { getAllData } from '../redux/data/fetchData'
import { getAllDataNames } from '../redux/dataNames/fetchDataNames'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router,Switch, Route, Redirect } from 'react-router-dom'

function Body() {

    //this data is download by logging in and remove by logging out
    const checkIfUserIsLogged = useSelector(state => state.datasName)
    const dispatch = useDispatch()

    useEffect(() => {
        //if user is logged fetch his data to redux
        if(sessionStorage.getItem("token"))
        {
            dispatch(getAllData('/logged/fetch-all-data'))
            dispatch(getAllDataNames())
        }
    }, [dispatch])

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
