import types from './dataNamesTypes'

const add = value => ({ type: types.ADD_DATA_NAME, data: value })
const clear = () => ({ type: types.CLEAR_DATA_NAME })

export default {
    add,
    clear
}