import { useEffect, useState } from 'react';
import './App.css'
import { get } from './lib/api';
import FlatList from './components/FlatList';
import initScrapingProcess from './lib/procedures';
import Spinner from './components/Spinner';

// Get flats
// Get pagination component, update state based on the pagination
// Clear interval when pagination data is the same as the set one
function App() {
  const [loadingInProgress, setLoadingInProgress] = useState(false);
  const [flatsData, setFlatsData] = useState([]);

  const fetchFlats = async () => {
    const response = await get('flat');

    if (response) {
      if(response.length != flatsData.length) {
        setFlatsData(response);
      }
    }
  }

  const handleFetchData = async () => {
    setLoadingInProgress(true);
    await initScrapingProcess();
  };

  // Hooks
  useEffect(() => {
    console.log("Initial load. Fetching flats ...");
    fetchFlats();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchFlats();
    }, 2000);

    return () => clearInterval(interval);
  }, [flatsData]);

  return (
    <>
      {flatsData.length == 0 ?
        (
          loadingInProgress ? <Spinner /> : <button onClick={() => { handleFetchData() }}>Fetch flats data </button>
        ) :
        (<FlatList flats={flatsData} />)
      }
    </>
  )
}

export default App