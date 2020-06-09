import React, { useContext } from 'react'
import { DataContext } from './DataContext'
import { getAllData } from '../redux/data/fetchData'
import { getAllDataNames } from '../redux/dataNames/fetchDataNames'
import { useDispatch } from 'react-redux'
import axios from 'axios'

function Login() {

    const { inputActiveAnimation, HomeFormMessage } = useContext(DataContext)
    const dispatch = useDispatch()

    const login = e =>
    {
        
        e.preventDefault()
        
        const name = document.querySelector('.login__userName')
        const password = document.querySelector('.login__userPassword')

        const sendDatas = {
            userName: name.value,
            userPassword: password.value
        }

            axios.post('/login', sendDatas)
                 .then((res) => {

                    //If there is message, trouble occured
                    if(res.data === "Uzupełnij wszystkie pola" || res.data === "Niepoprawne hasło lub login")
                    {
                        HomeFormMessage(res.data)
                    }
                    else
                    {
                        console.log(res)
                        const auth = res.headers.auth
                        sessionStorage.setItem('token', auth)

                        axios.get('/logged/fetch-all-data', {headers: { auth }})
                        .catch(err => {
                            console.log(err)
                        })

                        dispatch(getAllData('/logged/fetch-all-data'))
                        dispatch(getAllDataNames())
                    }
                 })
                 .catch(err => console.log(err))

    }
    return (
        <form className="login" onSubmit={login}>
            <div className="login__input">
                <input onFocus={inputActiveAnimation} type="text" className="login__userName"/>
                <label className="userName__label">login</label>
            </div>

            <div className="login__input">
                <input onFocus={inputActiveAnimation} type="password" className="login__userPassword"/>
                <label className="userPassword__label">haslo</label>
            </div>

            <input className="login__submit" type="submit" value="Zaloguj się"/>
        </form>
    )
}

export default Login