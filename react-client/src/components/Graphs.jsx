import React, { useState, useEffect } from 'react'
import Accords from './Accords';
import Likes from './Likes';
import Seasons from './Seasons';
import TimeOfDay from './TimeOfDay';
import Sillage from './Sillage';
import Longevity from './Longevity';
import Sex from './Sex';
import Value from './Value';
import Rating from '@mui/material/Rating';

function Graphs({ searchResults }) {
    const [SearchResultsRating, setSearchResultsRating] = useState(null);
    useEffect(() => {
        setSearchResultsRating(searchResults == null ? null : searchResults.ratinginfo[0]);
    }, [searchResults]);

        return(
        <div className="graphContainer">
            <div>
                <img src={searchResults.img}></img>
                <div>
                    <Rating name='rating' value={SearchResultsRating} precision={0.1} readOnly />
                    <span className='rating-text'>({searchResults.ratinginfo[2]})</span>
                </div>
            </div>
            <Accords searchResults={searchResults}/>
            <Sillage searchResults={searchResults} />
            <Longevity searchResults={searchResults} />
            <Sex searchResults={searchResults} />
            <Value searchResults={searchResults} />
            <Likes searchResults={searchResults}/>
            <Seasons searchResults={searchResults}/>
            <TimeOfDay searchResults={searchResults} />
        </div>
    );
}

export default Graphs;