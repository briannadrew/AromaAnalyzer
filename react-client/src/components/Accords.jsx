import React from 'react';
import { FunnelChart, Funnel, LabelList, ResponsiveContainer } from 'recharts';

function Accords({ searchResults }) {
    if(searchResults){
        const data = [];
        for (let i = 0; i < searchResults.accords.length; i++) {
            const accord = searchResults.accords[i];
            const fill = searchResults.accordhex[i];
            const accordwidth = searchResults.accordwidths[i];
            const accordObject = { accordwidth, accord, fill };
            data.push(accordObject);
        }
        return(
            <div className='accord-sec'>
            <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
                <Funnel
                dataKey="accordwidth"
                data={data}
                stroke={null}
                strokeWidth={0}
                isAnimationActive>
                    <LabelList position="center" fill="#000" stroke="none" dataKey="accord"/>
                </Funnel>
            </FunnelChart>
            </ResponsiveContainer>
            </div>
        );
    }
}

export default Accords;