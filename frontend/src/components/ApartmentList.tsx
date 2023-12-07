import { ApartmentType } from "../types";
import ApartmentCard from "./ApartmentCard";

export default function AppartmentList({ apartments } : { apartments: ApartmentType[] } ) {

  return (
    <>
      <h1 className="flex justify-center text-5xl font-bold p-10 m-2">Appartments</h1>
      <div className="flex flex-wrap justify-center">
          {apartments.map(appartment => 
            <ApartmentCard apartment={appartment}/>
          )}
      </div>
    </>
  )
}