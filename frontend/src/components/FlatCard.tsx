import { FlatType } from '../types';

export default function FlatCard({flat }: { flat: FlatType}) {
  const priceNA = "Information about price at agency";

  return (
    <>
      <div className="flex-card m-2 text-gray bg-lighter bg-white">
        <img src={ flat.image_url }></img>
        <div className="grid grid-cols-1 divide-y">
          <div className="p-3">
            <h3><b>{ flat.title }</b></h3>
          </div>
          <div >
            <div className="p-4">
              <p>{ flat.location }</p>
            </div>
            <div className="grid grid-cols-2 relative bottom-0">
              <div className="p-3 bg-green-200">
                <p><b>{ flat.size }</b></p>
              </div>
              <div className="p-3 bg-blue-200">
                { flat.price == priceNA ? (<p>N/A</p>) : (<p><b>{ flat.price }</b></p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}