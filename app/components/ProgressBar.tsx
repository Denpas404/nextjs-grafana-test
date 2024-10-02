import React from 'react'
import Style from './ProgressBar.module.css'

const ProgressBar = ({ value }: { value: number}) => {

value = 1000000;

const arrowPosition = (value / 7494025) * 100;

    return (
        <div className={Style.progress_bar}>
            <span className={Style.start_label}>CPH</span>
            <progress className="progress progress-success w-full h-5" value={value} max="7494025"></progress>
            <span className={Style.end_label}>Jorden rundt</span>
        <div className={Style.arrow} style={{ left: `${arrowPosition}%` }}></div>
        </div>

    )
}

export default ProgressBar
