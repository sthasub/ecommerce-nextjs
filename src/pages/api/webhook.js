// import { buffer } from 'micro';
import * as admin from 'firebase-admin';
// import serviceAccount  from '../../../firebase.json';
// const serviceAccount = require('../../../firebase.json');
//Secure connection to firebase from the backend
const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY
);
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

const fulfillOrder = async (session) => {
    return app.firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection('order').doc(session.id).set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        }).then(() => console.log(`SUCCESS: order ${session.id} had been added to the DB`))
};

async function buffer(readable) {
    const chunks = [];
    for await (const chunk of readable) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
  }

//Establish conneciton to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async (request, response) => {
    if (request.method === 'POST') {
        const requestBuffer = await buffer(request);
        const payload = requestBuffer.toString();
        const sig = request.headers["stripe-signature"];
        let event;
        //verify that the EVENT posted came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (error) {
            console.log('ERROR', error.message);
            return response.status(400).send(`Webhook error:${error.message}`);
        }

        //handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            //fullfill the order
            return fulfillOrder(session).
            then(() => response.status(200).end()).
            catch(err => response.status(400).send(`Webhook Error ${err.message}`));
        }
    }
};

export const config = {
    api:{
        bodyParser:false,
        externalResolver:true
    }
}