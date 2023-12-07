import { ApartmentType } from '../types';

export default function ApartmentCard({ apartment }: { apartment: ApartmentType}) {
  const priceNA = "Information about price at agency";

  return (
    <>
      <div className="flex-card m-2 text-gray bg-lighter bg-white">
        <div className="image">
          <img src={ apartment.image_url } alt="test"></img>
        </div>
        
        <div className="grid grid-cols-1 divide-y divide-slate-700/25">
          <div className="p-3 text-gray-600 text-xl h-20">
            <h2><b>{ apartment.title }</b></h2>
          </div>
          <div className="">
            <div className="p-4 h-20 text-gray-700">
              <p>{ apartment.location }</p>
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