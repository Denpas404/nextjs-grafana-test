import React from 'react'
import Style from './ProgressBar.module.css'

const ProgressBar = () => {

    
const range = "91,71";

    return (
        // <div className="bg-white rounded-lg w-72 border shadow block m-4 p-4">
        //     {/* <div className="w-full h-4 bg-gray-400 rounded-full"> */}
        //     <div className={Style.progressBackground}>        
        //         {/* <div className="w-3/4 h-full text-center text-xs text-white bg-violet-500 rounded-full"> */}
        //         <div className={Style.progress}> </div>
        //     </div>
        // </div>

        // <div className='m-5'>
        //     <progress className="progress w-full h-5" value={range} max="100"></progress>        
        // </div>  
        
        <div className={Style.progress_bar}>
            <span className={Style.start_label}>CPH</span>
            <progress className="progress w-full h-5" value={range} max="100"></progress>
            <span className={Style.end_label}>Paris</span>
            <div className={Style.arrow} style={{ left: `${range}%` }}></div>
        </div>

    )
}

export default ProgressBar
