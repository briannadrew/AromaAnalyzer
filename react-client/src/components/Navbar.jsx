import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react'

function Navbar({ onSearch }) {
    const [search, setSearch] = useState("");

    async function requestData(event) {
        event.preventDefault();
        onSearch(search);
    };

    return ( <div className="navbar"><form onSubmit={requestData}><TextField
    fullWidth
    id="fullWidth"
    label="Enter a fragrance name!"
    InputLabelProps={{ sx: { color: "#CCCCCC" }}}
    InputProps={{endAdornment: (<InputAdornment position="end"><IconButton onClick={requestData}><SearchIcon sx={{color: "#CCCCCC"}}/></IconButton></InputAdornment>), sx: {color: "#CCCCCC"}}}
    onChange={(e) => setSearch(e.target.value)}
    /></form></div>);
}

export default Navbar;