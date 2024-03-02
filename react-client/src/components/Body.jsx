import { Hearts } from "react-loader-spinner";
import PendingIcon from '@mui/icons-material/Pending';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Graphs from "./Graphs";
import React from 'react'

function Body({ searchResults, loader, error }) {
    return(
        <div className="sitebody">
            { !searchResults && !loader && !error && <div className="noData"><PendingIcon className="pending"/><p>Fragrance data will show up here...</p></div>}
            { searchResults && !error && <div><Graphs searchResults={searchResults} /></div>}
            { !searchResults && loader && !error && <div className="loader"><Hearts color="#F472B6" height={100} width={100}/><p>Loading Results...</p></div>}
            { error && <div className="showError"><WarningAmberIcon className="errSymbol"/><p>Uh Oh! Something went wrong.</p><p>Make sure you typed your fragrance correctly, it helps to specify the brand as well.</p></div>}
        </div>
    );
}

export default Body;