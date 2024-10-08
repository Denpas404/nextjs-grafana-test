
import React from 'react'
import Style from './ProgressBar.module.css'
import { useEffect, useState } from 'react';
import { fetchMeasurements } from '../../services/fetchMeasurements';
import car from '../../public/car.png'
import Image from 'next/image'

let carPosition: number = 0;
let currentConsumption: number = 0;
let consumption: number = 0;
let tripsAroundTheWorld: number = 0;
let totalConsumption: number = 0;
let tripThreshold: number = 7494025
let thresholdKoeffecient: number = 1;


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

    totalConsumption = number;
    
    //Temporary conversion of the number to a value that can be used in the progress bar 
    currentConsumption = tripThreshold * 3 + 1 ;

    if( currentConsumption > tripThreshold * thresholdKoeffecient) {
        thresholdKoeffecient++;
        tripsAroundTheWorld++;
    }
    
    
    
    carPosition = (currentConsumption / (tripThreshold * thresholdKoeffecient)) * 100;
    console.log(currentConsumption);
    console.log(tripThreshold * thresholdKoeffecient)
    console.log(carPosition);

    return (
        <div className='flex-row justify-center text-center font-bold mt-8'>
            <h1>Jorden rundt i en Tesla</h1>           
            <div className={Style.progress_bar}> {/* Check modul.css for styling */}
                <progress className="progress progress-success w-full h-5" value={currentConsumption} max={tripThreshold * thresholdKoeffecient}></progress>            
                <div className={Style.arrow} style={{ left: `${carPosition}%` }}>
                    <Image src={car} alt="Car" width={50} height={50} priority />
                </div>                
            </div>
            <p>Watt forbrug {totalConsumption}</p>
            
            <p>Antal omgange rundt om jorden: {tripsAroundTheWorld}</p>
        </div>        

    )
}

export default ProgressBar
