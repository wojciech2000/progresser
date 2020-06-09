import types from './dataNamesTypes'
import produce from 'immer'

const datasName = []

const reducer = (state = datasName, action) => {

    switch (action.type) {
        case types.ADD_DATA_NAME:
            return produce(state, draftState => { draftState.push(action.data) })
    
        case types.CLEAR_DATA_NAME:
            return state = []
        default:
            return state;
    }

}

export default reducer