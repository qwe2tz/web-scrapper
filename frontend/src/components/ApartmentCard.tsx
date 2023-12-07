import { ApartmentType } from '../types';

export default function ApartmentCard({ apartment }: { apartment: ApartmentType}) {
  const priceNA = "Information about price at agency";

  return (
    <>
      <div className="lg:flex-card-lg sm:m-2 md:m-2 text-gray bg-lighter bg-white">
        <div className="image">
          <a href={ apartment.apartment_url } target="_blank">
            <img className="w-full" src={ apartment.image_url } alt="test" ></img>
          </a>
        </div>
        
        <div className="grid grid-cols-1 divide-y divide-slate-700/25">
          <div className="p-4 m-4 text-gray-600 text-xl h-20">
            <h2><b>{ apartment.location }</b></h2>
          </div>
          <div>
            <div className="m-1 p-6 h-20 text-gray-700">
              Property type: <b>Apartment</b>
            </div>
            <div className="grid grid-cols-2">
              <div className="p-3 bg-green-500">
                <p><b>{ apartment.size }</b></p>
              </div>
              <div className="p-3 bg-blue-500">
                { apartment.price == priceNA ? (<p>N/A</p>) : (<p><b>{ apartment.price }</b></p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}