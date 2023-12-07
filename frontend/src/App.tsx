import { useEffect, useState } from 'react';
import './App.css'
import { get } from './lib/api';
import FlatList from './components/FlatList';
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
  const [logMessage, setLogMessage] = useState("");

  const fetchFlats = async (page: number=currentPage) => {

    const response = await get(`flat?take=24&page=${page}`);

    if (response) {
      if(flatsData.length === 0 || page != currentPage) {
        setFlatsData(response.data);
        setCurrentPage(page);
      }
      
      setPaginationData(response.meta);
    }
  }

  const handleFetchData = async () => {
    setLoadingInProgress(true);
    setLogMessage("");

    await get('scrapper/start').then((response) => {
      console.log(response);
    }).catch((error) => {
        console.error(error);
        setLogMessage('Error while starting scrapper service ...');
        setLoadingInProgress(false);
    });
    
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
        const data = response.data;
        console.log('Scrapper status: ', data.status);
        // If there is at least one filled page, show results
        // Keep pooling and updating the pagination component
        if (data.current_page > 1 && requestsCounter > 1) {
          fetchFlats();

          if(data.status === false) {
            // Scrapper finished
            return;
          }
        }

        const counter = requestsCounter + 1;
        setRequestCounter(counter);
      }).catch((err) => {
        console.error('Exception occured: ', err);
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
                onPageChange={(event) => fetchFlats(event.selected + 1)}
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

      { (logMessage !== "") ? (
        <>
          <div className="m-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{logMessage}</span>
          </div>
        </>
      ) : null}

    </>
  )
}

export default App