import React, { useEffect, useState, } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import * as API from "../api";

const PriceGraph = ({stationId}) => {
    const [priceGraphData, setPriceGraphData] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await API.priceHistory(stationId);
            const dataTransform = data.price_history.map((data) => (
                {
                    price: data.price,
                    update: data.updated_on
                }
            ));
            setPriceGraphData(dataTransform);
        })()
    }, [stationId]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart width={600} height={300} data={priceGraphData}>
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="update" />
                <YAxis />
            </LineChart>
        </ResponsiveContainer>

    )
};

export default React.memo(PriceGraph);