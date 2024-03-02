import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, CartesianGrid, XAxis } from 'recharts';

function Value({ searchResults }) {
    const colour = "#aed581";
    if(searchResults){
        const data = [];
        for (let i = 0; i < searchResults.valuecats.length; i++) {
            const cat = searchResults.valuecats[i];
            const votes = searchResults.priceval[i];
            const valueObject = { cat, votes };
            data.push(valueObject);
        }
        return(
            <div className='value-sec'>
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

export default Value;