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
  // Missing types
  const [loadingInProgress, setLoadingInProgress] = useState(false);
  const [requestsCounter, setRequestCounter] = useState(0);
  const [flatsData, setFlatsData] = useState([]);  // missing flat type (interface?)
  const [paginationData, setPaginationData] = useState<PaginationMeta>();
  const [currentPage, setCurrentPage] = useState(1);

  // ej, tega verjetno jaz ne štekam. Zakaj je tuki async + await v kodi?
  const fetchFlats = async (page: number = currentPage) => {

    const response = await get(`flat?take=24&page=${page}`);

    if (response) {
      if (flatsData.length === 0 || page != currentPage) {
        setFlatsData(response.data);
        setCurrentPage(page);
      }

      setPaginationData(response.meta);
    }
    // handle err? maybe just: alert("error")
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
    if (requestsCounter == 0) {
      return;
    }

    async function getScrapperStatus() {
      await get('scrapper/status').then((response) => {
        const data = response.data;
        console.log('Scrapper status: ', data.status);
        // If there is at least one filled page, show results
        // Keep pooling and updating the pagination component
        if (data.current_page > 1 && requestsCounter > 1) {
          fetchFlats();

          if (data.status === false) {
            // Scrapper finished
            return;
          }
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
    </>
  )
}

export default App