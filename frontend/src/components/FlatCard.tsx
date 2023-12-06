import { FlatType } from '../types';

export default function FlatCard({flat }: { flat: FlatType}) {
  return (
    <>
      <ol>
        <img src={ flat.image_url }></img>
        <li>{ flat.title }</li>
        <li>{ flat.location }</li>
        <li>{ flat.size }</li>
        <li>{ flat.price }</li>
      </ol>
    </>
  )
}