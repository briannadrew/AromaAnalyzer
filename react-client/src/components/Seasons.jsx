import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts';

function Seasons({ searchResults }) {
    const colours = ["#4fc3f7", "#aed581", "#fff176", "#ffb74d"];
    if(searchResults){
        const data = [];
        let totalLikes = 0;
        for (let i = 0; i < searchResults.seasoncats.length; i++) {
            const cat = searchResults.seasoncats[i];
            const value = searchResults.seasons[i];
            const colour = colours[i];
            const seasonsObject = { cat, value, colour };
            data.push(seasonsObject);
            totalLikes += value;
        }
        return(
            <div className='seasons-sec'>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie 
                    data={data} 
                    dataKey="value" 
                    nameKey="cat" 
                    label={({ cat }) => cat}
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

export default Seasons;