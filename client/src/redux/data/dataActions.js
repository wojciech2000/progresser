import types from './dataTypes'

const add = value => ({ type: types.ADD_DATA, payload: value })
const remove = id => ({ type: types.REMOVE_DATA, payload: id })
const clear = () => ({ type: types.CLEAR_DATA })

export default {
    add,
    remove,
    clear
}