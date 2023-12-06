import { get } from "./api";


// Used only once, remove this file?
export default async function initScrapingProcess() {
    const response = await get('scrapper/start');
    console.log("Response ", response);
    return response;
}