import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, CartesianGrid, XAxis } from 'recharts';

function Sex({ searchResults }) {
    const colour = "#f06292";
    if(searchResults){
        const data = [];
        for (let i = 0; i < searchResults.sexcats.length; i++) {
            const cat = searchResults.sexcats[i];
            const votes = searchResults.sex[i];
            const sexObject = { cat, votes };
            data.push(sexObject);
        }
        return(
            <div className='sex-sec'>
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

export default Sex;