import React, { useContext } from 'react'
import { DataContext } from './DataContext'
import { useSelector } from 'react-redux'
import boarIllustration from '../pictures/black-boar.png'
import { motion } from 'framer-motion'

function Current() {
    
    const currentData = useSelector(state => state.datas[state.datas.length-1])
    const { pageVariants, pageTransition } = useContext(DataContext)

    const displayData = dataType => {
    if(!currentData && dataType==='span')
    {
        return (
            <div className="current__no-data">
                <span className="no-data__span">dodaj dane, dziku</span>
                <img className="no-data__image" src={boarIllustration} alt="boar-illustration"/>
            </div>)
    }
    else if(currentData)
    {
        // change object of data(except id and date) into arry so it be possible to use array methods
        const arrayDatas = Object.entries(currentData).slice(2, Object.entries(currentData).length)

        //if there is no image center datas
        const image = arrayDatas.find(data => data[0] === 'image')

        return(
            arrayDatas.map((data, id) => {
                if(data[0] !== 'image' && dataType === 'span') return <span key={id} style={!image ? { width: "100%", textAlign: "center"} : undefined}>{data[0]}: {data[1]}cm</span>
                else if(data[0] === 'image' && dataType === 'image') return <img key={id} className="current__image" alt="zdjęcie sylwetki" src={document.location.origin + '/' + data[1]} />
            })
        )
    }
    }

    return (
        <motion.div className="current"
        initial='in'
        animate='done'
        exit='out'
        variants={pageVariants}
        transition={pageTransition}>
            <h2 className="current__header">{currentData && currentData.Date}</h2>
            <div className="current__section">
                {displayData('image')}
                <div className="current__data">
                    {displayData('span')}
                </div>
            </div>
        </motion.div>
    )
}

export default Current
