import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts';

function Likes({ searchResults }) {
    const colours = ["#f06292", "#ba68c8", "#9575cd", "#4fc3f7", "#ef5350"];
    if(searchResults){
        const data = [];
        let totalLikes = 0;
        for (let i = 0; i < searchResults.likecats.length; i++) {
            const cat = searchResults.likecats[i];
            const value = searchResults.likes[i];
            const colour = colours[i];
            const likesObject = { cat, value, colour };
            data.push(likesObject);
            totalLikes += value;
        }

        return(
            <div className='likes-sec'>
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

export default Likes;