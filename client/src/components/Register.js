import React, { useContext, useEffect } from 'react'
import { DataContext } from './DataContext'
import axios from 'axios'
import gsap from 'gsap'

function Register() {

    const { inputActiveAnimation, HomeFormMessage, switchFormAnimation } = useContext(DataContext)

    useEffect(() => {
        switchFormAnimation(document.querySelector('.register').children)
    }, [])

    const createUser = e =>
    {
        e.preventDefault();
        
        const name = document.querySelector('.register__userName')
        const password = document.querySelector('.register__userPassword')
        const repeatPassword = document.querySelector('.register__userPassword2')

        const createUser = {
            userName: name.value,
            userPassword: password.value,
            userPassword2: repeatPassword.value
        }

        axios.post('/add-user', createUser)
            .then((res) => {
                //If there is message, trouble occured
                if(res.data)
                {
                    HomeFormMessage(res.data)
                }
                else
                {
                    HomeFormMessage("Użytkownik został dodany")
                    name.value = ""
                    password.value = ""
                    repeatPassword.value = ""
                                
                    const labels = document.querySelectorAll('.userName__label')
        
                    labels.forEach(label => label.classList.remove('label--active'))

                    name.blur()
                    password.blur()
                    repeatPassword.blur()

                }
            })
            .catch(err => console.log(err))
    }

    return (
        <form className="register">
            <div className="register__input">
                <input onFocus={inputActiveAnimation} type="text" className="register__userName"/>
                <label className="userName__label">login</label>
            </div>
            <div className="register__input">
                <input onFocus={inputActiveAnimation} type="password" className="register__userPassword"/>
                <label className="userName__label">hasło</label>
            </div>
            <div className="register__input">
                <input onFocus={inputActiveAnimation} type="password" className="register__userPassword2"/>
                <label className="userName__label">powtórz hasło</label>
            </div>

            <input className="register__submit" type="submit" value="Zarejestruj się" onClick={createUser}/>
        </form>
    )
}

export default Register
