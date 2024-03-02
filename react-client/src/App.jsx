import './App.css'
import Navbar from './components/Navbar'
import Body from './components/Body'
import React, { useState } from 'react'
import axios from "axios"

function App() {

  const ip_address = "127.0.0.1";

  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (search) => {
    setSearchResults(null);
    setError(null);
    setLoading(true);
    await axios.post("http://" + ip_address + ":5000/req", { search }).then(response => { console.log(response.data); setSearchResults(response.data); }).catch(error => setError(error));
    setLoading(false);
  }

  return (
    <div className='app'>
      <Navbar onSearch={handleSearch}/>
      <Body searchResults={searchResults} loader={loading} error={error}/>
    </div>
  )
}

export default App;
