const express = require('express')
const router = express.Router()
const verifyToken = require('../config/verifyToken')
const { newUser, SchemaOfDatas } = require('../model/UserModel')
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+file.originalname)
    }
})

const fileFilter = (req, file, cb) => {

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null, true)
    }
    else
    {
        cb(new Error('Only messages are allowed'), false)
    }
}

const upload = multer({ storage, fileFilter})

router.post('/add-data', upload.single("image"), verifyToken, async (req,res) =>
{
    try {
        const user = await newUser.findOne({_id: req.user._id})

    if(user) 
    {
        const incomingDatas = (datas, file) => {
            if(file) datas.image = file.path
            return datas
        }
        
            await user.updateOne({
                $addToSet: {
                    "Datas": incomingDatas(req.body, req.file) 
            }
        })

        res.send(req.body)
    }
    } catch (error) {
        res.send(error)
    }
    
})

router.delete('/delete-data/:id/:fileName', verifyToken, async (req,res) => 
{
    try {
        const userData = await newUser.updateOne({ _id: req.user._id }, { $pull: { Datas: { _id: req.params.id } } } )

        req.params.fileName != "undefined" && fs.unlinkSync(`upload/${req.params.fileName}`)

        res.send(userData)

    } catch (error) {
        console.log(error)
    }
})


router.get('/fetch-all-data', verifyToken, async (req,res)=>
{
    try {

        const user = await newUser.findById(req.user._id)
 
        if(user)
        {
            res.send(user.Datas)
        }


    } catch (error) {
        res.send(error)
    }
})

router.get('/fetch-current-data', verifyToken, async (req,res)=>
{
    try {

        const user = await newUser.findById(req.user._id)
 
        if(user)
        {
            res.send(user.Datas[user.Datas.length - 1])
        }


    } catch (error) {
        res.send(error)
    }
})

router.get('/schema-properties', (req,res) => {

    const SchemaProperties = Object.getOwnPropertyNames(SchemaOfDatas.schema.obj)
    const datasToSend = SchemaProperties.slice(1,SchemaProperties.length)

    res.send(datasToSend)

})

module.exports = router