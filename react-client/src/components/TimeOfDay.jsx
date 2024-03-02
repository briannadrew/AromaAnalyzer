import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts';

function TimeOfDay({ searchResults }) {
    const colours = ["#fff176", "#5c6bc0"];
    if(searchResults){
        const data = [];
        let totalLikes = 0;
        for (let i = 0; i < searchResults.daynight.length; i++) {
            const cat = searchResults.daynight[i];
            const value = searchResults.tod[i];
            const colour = colours[i];
            const todObject = { cat, value, colour };
            data.push(todObject);
            totalLikes += value;
        }
        const labelStyle = {
            fill: "white",
            fontSize: "1rem",
        };

        return(
            <div className='tod-sec'>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie 
                    data={data} 
                    dataKey="value" 
                    nameKey="cat" 
                    label={({ cat }) => (cat)}
                    stroke={null}
                    >
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.colour} />
                            ))
                        }
                    </Pie>
                    <Tooltip formatter={(value) => `${(value / totalLikes * 100).toFixed(2)}%`}/>
                </PieChart>
            </ResponsiveContainer>
            </div>
        );
    }
}

export default TimeOfDay;