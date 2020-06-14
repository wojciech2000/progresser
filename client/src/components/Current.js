import React from 'react'
import { useSelector } from 'react-redux'
import boarIllustration from '../pictures/black-boar.png'

function Current() {
    
    const currentData = useSelector(state => state.datas[state.datas.length-1])

    const displayData = dataType => {
    if(currentData)
    {
        // change object of data(except id and date) into arry so it be possible to use array methods
        const arrayDatas = Object.entries(currentData).slice(2, Object.entries(currentData).length)
        return(
            arrayDatas.map((data, id) => {
                if(data[0] !== 'image' && dataType === 'span') return <span key={id}>{data[0]}: {data[1]}cm</span>
                else if(data[0] === 'image' && dataType === 'image') return <img key={id} className="current__image" alt="zdjęcie sylwetki" src={document.location.origin + '/' + data[1]} />
            })
        )
    }
    else if(!currentData && dataType==='span')
    {
        return (
            <div className="current__no-data">
                <span className="no-data__span">dodaj dane, dziku</span>
                <img className="no-data__image" src={boarIllustration} alt="boar-illustration"/>
            </div>)
    }
}


    return (
        <div className="current">
            <h2 className="current__header">{currentData && currentData.Date}</h2>
            <div className="current__section">
                {displayData('image')}
                <div className="current__data">
                    {displayData('span')}
                </div>
            </div>
        </div>
    )
}

export default Current
