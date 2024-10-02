import React from 'react'
import Style from './ProgressBar.module.css'
import { useEffect, useState } from 'react';
import { fetchMeasurements } from '../services/fetchMeasurements';

const ProgressBar = () => {
    const [number, setNumber] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const startDateTime = new Date('2024-01-01').toISOString();
        const stopDateTime = new Date().toISOString();

        try {
            const totalSum = await fetchMeasurements(startDateTime, stopDateTime);
            if (totalSum !== null) {
            setNumber(totalSum);
            }
        } catch (error) {
            console.error('Error fetching measurements:', error);
        }
        };

        fetchData();
    }, []);
    
    //Temporary conversion of the number to a value that can be used in the progress bar 
    let value = number * 10000;
    
    const arrowPosition = (value / 7494025) * 100;

    return (
        <div className='flex-row justify-center text-center font-bold mt-4'>
            <h1>Jorden rundt</h1>           
            <div className={Style.progress_bar}>                
                <progress className="progress progress-success w-full h-5" value={value} max="7494025"></progress>            
                <div className={Style.arrow} style={{ left: `${arrowPosition}%` }}></div>
            </div>
        </div>        

    )
}

export default ProgressBar
