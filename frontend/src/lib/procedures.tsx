import { get } from "./api";

export default async function initScrapingProcess() {
    const response =  await get('scrapper/start');
    console.log("Response ", response);
    return response;
}