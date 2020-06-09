import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducerDatas from './data/dataReducer'
import reducerDatasName from './dataNames/dataNamesReducer'

const rootReducer = combineReducers({
    datas: reducerDatas,
    datasName: reducerDatasName
})

const store = createStore(rootReducer, (composeWithDevTools(applyMiddleware(thunk))))

export default store