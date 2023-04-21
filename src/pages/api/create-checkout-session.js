const stripe = require('stripe')(process.env.SECRET_KEY);

export default async (request, response)=>{
    const {items, email} = request.body;
    const transformedItems = items.map(item=>({
        quantity:1,
        price_data:{
            currency:'aud',
            unit_amount:item.price * 100,
            product_data:{
                name:item.title,
                description:item.description,
                images:[item.image]
            },
        }
    }));

    const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            shipping_options:[{
                shipping_rate:'shr_1MwH7CEDOfcpPqbkAKNp0o9w',
            }],
            shipping_address_collection:{
                allowed_countries:["AU","NP","JP"]
            },
            line_items:transformedItems,
            mode:'payment',
            success_url:`${process.env.HOST}/success`,
            cancel_url:`${process.env.HOST}/checkout`,
            metadata:{
                email,
                images: JSON.stringify(items.map(item=>item.image))
            }

    });
    response.status(200).json({id:session.id});
};