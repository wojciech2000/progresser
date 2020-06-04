const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { newUser }  = require('../model/UserModel')
const jwt = require('jsonwebtoken')

// REGISTRATION

router.post('/add-user', async (req,res) =>
{  

    const { userName, userPassword, userPassword2 } = req.body

    let error = ''

    if(!userName || !userPassword || !userPassword2)
    {
        error = "Uzupełnij wszystkie pola"
    }
    else if(userPassword !== userPassword2)
    {
        error = "Hasła muszą być takie same"
    }
    else if(userPassword.length < 6)
    {
        error = "Hasło powinno składać się z co najmniej 6 znaków"
    }

    if(error)
    {
        res.send(error)
    }
    else
    {
        const findUser = await newUser.findOne({ userName })

        try {

            if(!findUser)
            {
                const hashedPassword = await bcrypt.hashSync(userPassword, 10)
        
                const addUser = await new newUser({
                    userName,
                    userPassword: hashedPassword,
                    Datas: req.body.Datas
                })
            
                try {
                    await addUser.save()
                    // Send !error
                    res.json('')
                } catch (error) {
                    res.json(error)
                }
            }
            else
            {
                res.json("Użytkownik o takim loginie już istnieje")
            }

        } catch (error) {
            res.json(error)
        }
    }

})

// LOGIN

router.post('/login', async (req,res)=>
{
    const { userName, userPassword } = req.body

    if(!userName || !userPassword)
    {
        res.send("Uzupełnij wszystkie pola")
    }
    else
    {
        try {

            const user = await newUser.findOne({userName: req.body.userName})

            if(user)
            {
                const validPass = await bcrypt.compare(userPassword, user.userPassword)
        
                if(validPass)
                {
                    const token = jwt.sign({_id: user._id}, 'secret')
                
                    res.header('auth', token).send(token)
                }
                else
                {
                    res.json("Niepoprawne hasło lub login")
                }
                
            }
            else
            {
                res.json("Niepoprawne hasło lub login")
            }
        } catch (error) {
            res.json(error)
        }
    }

})

module.exports = router