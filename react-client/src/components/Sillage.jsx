import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, CartesianGrid, XAxis } from 'recharts';

function Sillage({ searchResults }) {
    const colour = "#9575cd";
    if(searchResults){
        const data = [];
        for (let i = 0; i < searchResults.sillagecats.length; i++) {
            const cat = searchResults.sillagecats[i];
            const votes = searchResults.sillage[i];
            const sillageObject = { cat, votes };
            data.push(sillageObject);
        }
        return(
            <div className='sillage-sec'>
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

export default Sillage;