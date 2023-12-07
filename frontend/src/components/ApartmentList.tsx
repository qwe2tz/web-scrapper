import { ApartmentType } from "../types";
import ApartmentCard from "./ApartmentCard";

export default function AppartmentList({ apartments } : { apartments: ApartmentType[] } ) {

  return (
    <>
      <h1 className="text-5xl font-bold p-10">Flat List</h1>
      <div className="flex flex-wrap justify-items-center">
          {apartments.map(appartment => 
            <ApartmentCard apartment={appartment}/>
          )}
      </div>
    </>
  )
}