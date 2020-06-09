import types from './dataTypes'
import produce from 'immer'

const datas = []

const reducer = (state = datas, action) => {

    switch (action.type) {
        case types.ADD_DATA:
            return produce(state, draftState => { draftState.push(action.payload) })
    
        case types.REMOVE_DATA:
            return produce(state, draftState => {  draftState.splice(action.payload, 1) })

        case types.CLEAR_DATA:
            return state = []

        default:
            return state;
    }

}

export default reducer