'use client'
import React, { useState, useEffect } from "react";
import ProgressBar from '../components/ProgressBar'
import { InfluxDB } from '@influxdata/influxdb-client'

const token = '8ed8CtHqaX4zM5_uxLC_6HMdvaJ6pBTcDcRGaMcD1dxFfWPAR1tL3N72n9vRFOH6Ucw2o0hJqtuF3zGGnYTxpA=='
const org = '5a3a8a21bc640642'
const bucket = 'Watt'
const url = 'http://10.233.134.112:8086'


const queryAPI = new InfluxDB({url, token}).getQueryApi(org)
const page = () => {
    const [number, setNumber] = useState(0);
    
    useEffect(() => {
        let fetchMeasurements = async () => {  
            const stopDateTime = new Date().toISOString(); // Current date and time in RFC3339 format
            const startDateTime = new Date('2024-01-01').toISOString(); // Start date and time in RFC3339 format

            // const fluxQuery = 'from(bucket: "Watt") |> range(start: 2024-01-01, stop: 2024-12-31) |> sum() |> yield(name: "total_sum")';

            const fluxQuery = `
                from(bucket: "${bucket}") 
                |> range(start: ${startDateTime}, stop: ${stopDateTime}) 
                |> sum() 
                |> yield(name: "total_sum")`;
            
            try {
                const rows = await queryAPI.collectRows(fluxQuery); 
                
                if (rows.length > 0) {
                const totalSum = (rows[0] as { _value: number })._value; // Assuming the result has a field named '_value'
                
                
                setNumber(totalSum);                
                }
            } catch (error) {
                console.error('Error fetching measurements:', error);
            }

            
        };
    
        fetchMeasurements();
    }, []);
    return (
        

        <div>
            <div className='flex-row justify-center text-center mt-8'>
                <h1 className='font-bold'>InfluxDb</h1>
                <h2>{number}</h2>
            </div>

            <div className='m-8' >
                <ProgressBar value={number} />
            </div>
        </div>
    )
}

export default page
