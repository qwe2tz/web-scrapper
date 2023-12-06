import { FlatType } from "../types";
import FlatCard from "./FlatCard";

export default function FlatList({ flats } : { flats: FlatType[] } ) {

  return (
    <>
      <h1 className="text-3xl font-bold">Flat List</h1>
      <ol>
        {flats.map(flat => 
          <li>
            <FlatCard flat={flat}/>
          </li>)
        }
      </ol>
    </>
  )
}