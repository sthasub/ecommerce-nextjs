import Header from '@/components/Header'
import { getSession, useSession } from 'next-auth/react'
import db from '../../firebase';
import moment from "moment";
import { collection,query, getDocs, orderBy } from 'firebase/firestore';
import { data } from 'autoprefixer';

export default function Orders({ orders }) {
    const { data: session, status } = useSession();

    console.log(orders);
    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto'>
                <h1 className='text-3xl border-b mb-2 mt-3 pb-1 border-yellow-400'>Your Orders</h1>
                {session ? (
                    <h2>x Orders</h2>
                ) : (<h2>Please sign in to see your orders</h2>)}
                <div className='mt-5 space-y-4'></div>
            </main>
        </div>
    )
}

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    //Get the users logged in credentials..
    const session = await getSession(context);
    if (!session) {
        return {
            props: {},
        };
    } else {
        // firebase db
        
        // const stripeOrders = await db.collection('users')
        //     .doc(session.user.email).collection('order').orderBy('timestamp', 'desc').get();

        // db, collection/document/subcollection
        const stripeOrders = query(collection(db, "users", session.user.email, "order"),orderBy('timestamp', 'desc'))
        
        const getOrders = await getDocs(stripeOrders);

        const orders = await Promise.all(
            getOrders.docs.map(async order => ({
                id: order.id,
                amountShipping: order.data().amount_shipping,
                amount: order.data().amount,
                images: order.data().images,
                timestamp: moment(order.data().timestamp.toDate()).unix(),
                items: (
                    await stripe.checkout.sessions.listLineItems(order.id, {
                        limit: 100,
                    })
                ).data
            }))
        );
        return {
            props: {
                orders,
            }
        }
    }
}