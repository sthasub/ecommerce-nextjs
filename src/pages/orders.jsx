import Header from '@/components/Header'
import { getSession, useSession } from 'next-auth/react'
import db from '../../firebase';
import moment from "moment";
import {collection, getDocs} from 'firebase/firestore';

export default function Orders({orders}) {
    const {data:session,status}=useSession();
  return (
    <div>
        <Header />
        <main className='max-w-screen-lg mx-auto'>
            <h1 className='text-3xl border-b mb-2 mt-3 pb-1 border-yellow-400'>Your Orders</h1>
            {session?(
                <h2>x Orders</h2>
            ):(<h2>Please sign in to see your orders</h2>)}
            <div className='mt-5 space-y-4'></div>
        </main>
    </div>
  )
}

export async function getServerSideProps(context){
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    //Get the users logged in credentials..
    const session = await getSession(context);
    console.log("first");
    if(!session){
        return {
            props:{},
        };
    }else{
        // firebase db
        
        const stripeOrders = await db.collection('users')
        .doc(session.user.email).collection('orders').orderBy('timestamp','desc').get();
        console.log(stripeOrders);
        // const orderCollection = await db.collection('users').doc()
        
        //     const stripeOrders = await getDocs(orderCollection);
        //     const filterData = stripeOrders.docs.map(doc=>({...doc.data(),id:session.user.id}));
        //     console.log(filterData); 

            // stripe orders
        const orders = await Promise.all(
            stripeOrders.docs.map(async (order)=>({
                id:order.id,
                amount:order.data().amount,
                amountShipping:order.data().amount_shipping,
                images:order.data().images,
                timestamp:moment(order.data().timestamp.toDate()).unix(),
                items:(
                    await stripe.checkout.sessions.listLineItems(order.id,{
                        limit:100,
                    }) 
                ).data,
            }))
        );
        
        
        
        return {
            props:{
                orders,
            }
        }
    }
}