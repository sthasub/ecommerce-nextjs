import { useSelector } from "react-redux";
import Header from "../components/Header";
import Image from "next/image";
import { selectItems, selectTotal } from "../slices/trolleySlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";

function Checkout() {
  const {data:session, status} = useSession();
  const total = useSelector(selectTotal);
  const items = useSelector(selectItems);
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-lg mx-auto">
        {/**left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image src="https://links.papareact.com/ikj"
            alt="checkImage"
            width={1020}
            height={250}
            style={{ objectFit: "contain" }}
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "your trolley is empty" : "Shopping Trolley"}
            </h1>
            {items.map((item, i) => {
              return <CheckoutProduct key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                rating={item.rating}
                hasPrime={item.hasPrime}
              />
            })}
          </div>
        </div>
        {/**right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 &&(
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items): 
                <span className="font-bold">
                   <Currency quantity={total} currency="NPR"/>
                </span>
              </h2>
              <button 
              disabled={!session}
              className={`button mt-2 ${!session && 'cursor-not-allowed from-gray-300 to-gray-500 border-gray-200 text-gray-300'}`}>
                  {!session ? "Sign in to checkout":"Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Checkout