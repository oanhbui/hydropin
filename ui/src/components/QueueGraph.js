import React, { PureComponent, useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import * as API from "../api";


const QueueGraph = ({ stationId }) => {
    const [queueGraphData, setQueueGraphData] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await API.queueHistory(stationId);
            const dataTransform = data.queue_history.map((data) => (
                {
                    hour: data.hour,
                    queue: data.queue
                }
            ));
            setQueueGraphData(dataTransform);
        })()
    }, [stationId]);
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                width={500}
                height={300}
                data={queueGraphData}
                margin={{top: 0, right: 50, bottom: 0, left: 20}}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <ReferenceLine y={0} stroke="#000" />
                <Brush dataKey="hour" height={30} stroke="#8884d8" />
                <Bar dataKey="queue" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    )
};

export default QueueGraph;