import axios from 'axios'
import actions from './dataNamesActions'

const fetchDatas = async () => {

    const response = await axios.get(document.location.origin + '/logged/schema-properties')
    const datas = response.data

    return datas
}

export const getAllDataNames = () => async dispatch => {

    const datas = await fetchDatas()

    datas.forEach(data => {
        dispatch(actions.add(data))
    });

}