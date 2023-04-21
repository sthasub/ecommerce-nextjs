/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["links.papareact.com","fakestoreapi.com"]
  }

}



module.exports = {
  images:{
    domains:["links.papareact.com","fakestoreapi.com"]
  },
  env:{
    next_public_stripe_publishable_key:process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  },
};
