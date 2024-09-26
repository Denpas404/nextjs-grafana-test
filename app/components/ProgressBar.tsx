import React from 'react'
import Style from './ProgressBar.module.css'


const ProgressBar = ({ value }: { value: number}) => {

    
value = value / 50
console.log(value)

    return (
        <div className={Style.progress_bar}>
            <span className={Style.start_label}>CPH</span>
            <progress className="progress w-full h-5" value={value} max="100"></progress>
            <span className={Style.end_label}>Paris</span>
            <div className={Style.arrow} style={{ left: `${value}%` }}></div>
        </div>

    )
}

export default ProgressBar
