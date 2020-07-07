import axios from 'axios'
import actions from './dataActions'

// fetch data after login and refreshing if user is logged in
export const getAllData = () => async dispatch => {

    const response = await axios.get(document.location.origin + '/logged/fetch-all-data', { headers: { auth: sessionStorage.getItem('token') } })
    const datas = await response.data

    await datas.forEach(data => {
        dispatch(actions.add(data))
    });
}

//fetch current data after adding new data
export const getCurrentData = () => async dispatch => {

    const response = await axios.get(document.location.origin + '/logged/fetch-current-data', { headers: { auth: sessionStorage.getItem('token') } })
    const data = await response.data

    await dispatch(actions.add(data))

}