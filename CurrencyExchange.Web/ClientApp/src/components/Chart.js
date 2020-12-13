import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Chart(props) {

    return (
        <LineChart
            width={500}
            height={300}
            left={'45%'}
            data={props.data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="rate" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rate" stroke="#8884d8"  />
        </LineChart>
    );
}
export default Chart;