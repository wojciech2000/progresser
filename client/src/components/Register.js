import React, { useContext } from 'react'
import { DataContext } from './DataContext'

function Register() {

    const { inputActiveAnimation } = useContext(DataContext)

    return (
        <form className="register">
            <div className="register__input">
                <input onFocus={inputActiveAnimation} type="text" className="register__userName"/>
                <label className="userName__label">login</label>
            </div>
            <div className="register__input">
                <input onFocus={inputActiveAnimation} type="text" className="register__userPassword"/>
                <label className="userName__userPassword">hasło</label>
            </div>
            <div className="register__input">
                <input onFocus={inputActiveAnimation} type="text" className="register__userPassword2"/>
                <label className="userName__userPassword2">powtórz hasło</label>
            </div>

            <input className="register__submit" type="submit" value="Zarejestruj się"/>
        </form>
    )
}

export default Register
