import Image from "next/image"
import { useState } from "react"
import {StarIcon} from "@heroicons/react/20/solid"
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addTotrolley } from "../slices/trolleySlice";


function Product({id, title, price, description, category, image, rating, hasPrime}) {

  const dispatch = useDispatch();

  const [ratingState] = useState(rating
    // Math.floor(Math.random()*(MAX_RATING-MIN_RATING+1)+MIN_RATING)
  );  

  const [hasPrimeState] = useState(hasPrime);

  const addItemToTrolley = ()=>{
    const product = {
      id, title, price, description, category, image, rating, hasPrime
    }
    dispatch(addTotrolley(product));
  }

    return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10"> 

        <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>

        <Image alt="images" className="mx-auto"src={image} height={200} width={200} style={{objectFit:"contain"}} />

        <h4 className="my-3">{title}</h4>
        
        <div className="flex">
            {Array(ratingState).fill().map((_,i)=>{
              return <StarIcon key={i} className="h-5 text-yellow-500" />
             } )}
        </div>
        <p className="text-xs my-2 line-clamp-2">{description}</p>
        
        <div className="mb-5">
            <Currency quantity={price} currency="AUD"/>  
        </div>
        {hasPrimeState && (<div className="flex items-center space-x-2 -mt-5"> 
            <img className="w-12" src="https://links.papareact.com/fdw" alt="images" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>)}

        <button onClick={addItemToTrolley} className="mt-auto button">Add to basket</button>
    </div>
  )
}

export default Product