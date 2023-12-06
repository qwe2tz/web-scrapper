import { useEffect, useState } from 'react';
import './App.css'
import { get } from './lib/api';
import FlatList from './components/FlatList';
import initScrapingProcess from './lib/procedures';
import Spinner from './components/Spinner';
import ReactPaginate from 'react-paginate';
import { PaginationMeta } from './types';
import { IconContext } from "react-icons";


function App() {
  const [loadingInProgress, setLoadingInProgress] = useState(false);
  const [requestsCounter, setRequestCounter] = useState(0);
  const [flatsData, setFlatsData] = useState([]);
  const [paginationData, setPaginationData] = useState<PaginationMeta>();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchFlats = async () => {
    const response = await get(`flat?take=24&page=${currentPage}`);

    if (response) {
      setFlatsData(response.data);
      setPaginationData(response.meta);
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
    fetchFlats();
  }, [currentPage]);

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
      {flatsData.length == 0?
        (
          loadingInProgress ? <Spinner /> : (
            <>
              <p className="m-3">Uh-oh, nothing here yet ...</p>
              <button onClick={() => { handleFetchData() }}>Fetch flats data </button>
            </>
          )
        ) :
        (
          <>
            <FlatList flats={flatsData} />
            <div className="grid md:justify-items-center p-2 m-2">
              <ReactPaginate
                onPageChange={(event) => setCurrentPage(event.selected + 1)}
                pageCount={paginationData?.pageCount || 1}
                previousLabel={
                  <IconContext.Provider value={{ color: "#5227d3", size: "36px" }}>
                    PREV
                  </IconContext.Provider>
                }
                nextLabel={
                  <IconContext.Provider value={{ color: "#5227d3", size: "36px" }}>
                    NEXT
                  </IconContext.Provider>
                }
                containerClassName={'pagination flex justify-between'}
                pageLinkClassName={'page-number'}
                previousLinkClassName={'page-number'}
                nextLinkClassName={'page-number'}
                activeLinkClassName={'page-active'}
              />
            </div>
          </>
        )
      }
    </>
  )
}

export default App