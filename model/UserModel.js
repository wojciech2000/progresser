const mongoose = require('mongoose')
const Schema = mongoose.Schema

let currentDateTime = new Date()

MonthName = new Array(12)
MonthName[0] = "stycznia"
MonthName[1] = "lutego"
MonthName[2] = "marca"
MonthName[3] = "kwietnia"
MonthName[4] = "maja"
MonthName[5] = "czerwca"
MonthName[6] = "lipca"
MonthName[7] = "sierpnia"
MonthName[8] = "września"
MonthName[9] = "października"
MonthName[10] = "listopada"
MonthName[11] = "grudnia"

const formattedDate = currentDateTime.getDate() + "  " + (MonthName[currentDateTime.getMonth()]) + "  " + currentDateTime.getFullYear()

const DatasSchema = new Schema({
    Date: {
        type: String,
        default: formattedDate
    },
    image: String,
    biceps: Number,
    klatka: Number,
    przedramie: Number,
    udo: Number,
    lydka: Number,
    brzuch: Number,
    // add here parts of body and then it will be send to UI by REST API
})

const newUserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    Datas: [DatasSchema]
})

const newUser = mongoose.model("users", newUserSchema)
const SchemaOfDatas = mongoose.model('datas', DatasSchema)

module.exports = {newUser, SchemaOfDatas}