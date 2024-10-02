import { InfluxDB } from '@influxdata/influxdb-client';

const token = '8ed8CtHqaX4zM5_uxLC_6HMdvaJ6pBTcDcRGaMcD1dxFfWPAR1tL3N72n9vRFOH6Ucw2o0hJqtuF3zGGnYTxpA==';
const org = '5a3a8a21bc640642';
const bucket = 'Watt';
const url = 'http://10.233.134.112:8086';

const queryAPI = new InfluxDB({ url, token }).getQueryApi(org);

export async function fetchMeasurements(startDateTime: string, stopDateTime: string) {
    try {
        const fluxQuery = `
        from(bucket: "${bucket}")
        |> range(start: ${startDateTime}, stop: ${stopDateTime})
        |> sum()
        |> yield(name: "total_sum")
        `;

        const rows = await queryAPI.collectRows(fluxQuery);

        if (rows.length > 0) {
        const totalSum = (rows[0] as { _value: number })._value;
        return totalSum;
        } else {
        return null; // Or handle the case where no data is found
        }
    } catch (error) {
        console.error('Error fetching measurements:', error);
        throw error; // Re-throw the error to be handled by the calling component
    }
}