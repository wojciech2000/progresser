import React, { useContext } from 'react'
import { DataContext } from './DataContext'

function Login() {

    const { inputActiveAnimation } = useContext(DataContext)

    return (
        <form className="login">
            <div className="login__input">
                <input onFocus={inputActiveAnimation} type="text" className="login__userName"/>
                <label className="userName__label">login</label>
            </div>

            <div className="login__input">
                <input onFocus={inputActiveAnimation} type="password" id="login__userPassword"/>
                <label className="userPassword__label">haslo</label>
            </div>

            <input className="login__submit" type="submit" value="Zaloguj się"/>
        </form>
    )
}

export default Login
