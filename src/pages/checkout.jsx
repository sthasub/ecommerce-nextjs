import { useSelector } from "react-redux";
import Header from "../components/Header";
import Image from "next/image";
import { selectItems, selectTotal } from "../slices/trolleySlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// load stripe
const stripePromise = loadStripe(`${process.env.stripe_publishable_key}`);

function Checkout() {
  const {data:session, status} = useSession();
  const total = useSelector(selectTotal);
  const items = useSelector(selectItems);

  const createCheckoutSession = async ()=>{
    const stripe = await stripePromise;
    //call the backend to create a checkout session...
    // const checkoutSession = await fetch("/api/create-checkout-session",{
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   mode: "cors", // no-cors, *cors, same-origin
    //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: "same-origin", // include, *same-origin, omit
    //   headers: {
    //     "Content-Type": "application/json",
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },redirect: "follow", // manual, *follow, error
    //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: JSON.stringify({
    //     items:items,
    //     email:session.user.email
    //   }), // body data type must match "Content-Type" header
      
    // }).then(data=>{
    //   console.log(data);
    // });
    const checkoutSession = await axios.post("/api/create-checkout-session",{
      items:items,
      email:session.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    });
  };

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
                   <Currency quantity={total} currency="AUD"/>
                </span>
              </h2>
              <button 
              role="link"
              onClick={createCheckoutSession}
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