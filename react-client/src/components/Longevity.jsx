import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, CartesianGrid, XAxis } from 'recharts';

function Longevity({ searchResults }) {
    const colour = "#5c6bc0";
    if(searchResults){
        const data = [];
        for (let i = 0; i < searchResults.longcats.length; i++) {
            const cat = searchResults.longcats[i];
            const votes = searchResults.longevity[i];
            const longObject = { cat, votes };
            data.push(longObject);
        }
        return(
            <div className='long-sec'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="white" />
                    <XAxis dataKey="cat" stroke="white" />
                    <Tooltip />
                    <Bar dataKey="votes" fill={colour}/>
                </BarChart>
            </ResponsiveContainer>
            </div>
        );
    }
}

export default Longevity;