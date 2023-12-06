import { get } from "./api";

export default async function initScrapingProcess() {
    const response =  await get('scrapper');
    console.log("Response ", response);
    return response;
}