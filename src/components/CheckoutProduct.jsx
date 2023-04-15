import Currency from "react-currency-formatter";
import { StarIcon } from "@heroicons/react/20/solid";
import Image from 'next/image';
import { useDispatch } from "react-redux";
import { addTotrolley, removeFromtrolley } from "@/slices/trolleySlice";

export default function CheckoutProduct({ id, title, price, description, category, image, rating, hasPrime }) {
    const dispatch = useDispatch();
    const addItemToTrolley = ()=>{
        const product = {
            id, title, price, description, category, image, rating, hasPrime 
        };
        dispatch(addTotrolley(product));
    };

    const removeItemFromtrolley = ()=>{
        dispatch(removeFromtrolley({id})); 
    }

    return (
        <div className="grid grid-cols-5">
            <Image
                alt='props'
                src={image}
                height={200}
                width={200}
                style={{ objectFit: "contain" }}
            />
            {/**Middle section */}
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className='flex'>
                    {
                        Array(rating).fill().map((_, i) => {
                            return <StarIcon key={i} className='h-5 text-yellow-500' />
                        })
                    }
                </div>
                <p className='text-xs my-2 line-clamp-2'>{description}</p>
                <Currency quantity={price} currency="AUD" />
                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img loading="lazy" src="https://links.papareact.com/fdw" alt="laz" className="w-12" />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>

                )}
            </div>
            {/**Right add/ remove buttons */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                    <button className="button" onClick={addItemToTrolley}>Add to trolley</button>
                    <button className="button" onClick={removeItemFromtrolley}>Remove from trolley</button>
            </div>
        </div>
    );
}
