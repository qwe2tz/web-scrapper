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
  const [requestsCounter, setRequestCounter] = useState(0);
  const [flatsData, setFlatsData] = useState([]);

  const fetchFlats = async () => {
    const response = await get('flat');

    if (response) {
      setFlatsData(response.data);
      setRequestCounter(0);
    }
  }

  const handleFetchData = async () => {
    setLoadingInProgress(true);
    await initScrapingProcess();
    setRequestCounter(1);
  };

  // Hooks
  useEffect(() => {
    console.log("Initial load. Fetching flats ...");
    fetchFlats();
  }, []);

  useEffect(() => {
    if(requestsCounter == 0) {
      return;
    }

    async function getScrapperStatus () {
      await get('scrapper/status').then((response) => {
        console.log('Scrapper status: ', response.status);
        if (response.status === false && requestsCounter > 1) {
          console.log('Scrapper status: ', requestsCounter);
          fetchFlats();
          return;
        }
        const counter = requestsCounter + 1;
        setRequestCounter(counter);
      });
    }

    const timeoutId = setTimeout(() => {
      getScrapperStatus();
    }, 2000)
    return () => clearTimeout(timeoutId);
    
  }, [requestsCounter]);

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