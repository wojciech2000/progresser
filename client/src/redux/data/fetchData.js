import axios from 'axios'
import actions from './dataActions'

const fetchDatas = async () => {

    const response = await axios.get('http://localhost:5000/logged/fetch-all-data', { headers: { auth: sessionStorage.getItem('token') } })
    const datas = response.data

    return datas
}

export const getAllData = () => async dispatch => {

    const datas = await fetchDatas()

    datas.forEach(data => {
        dispatch(actions.add(data))
    });

}

const fetchCurrentData = async () => {

    const response = await axios.get('http://localhost:5000/logged/fetch-current-data', { headers: { auth: sessionStorage.getItem('token') } })
    const data = response.data

    return data
}

export const getCurrentData = () => async dispatch => {

    const data = await fetchCurrentData()

    dispatch(actions.add(data))

}