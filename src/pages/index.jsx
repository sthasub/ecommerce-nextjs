import Header from "@/components/Header";
import Head from "next/head";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";

const MAX_RATING = 5;
const MIN_RATING = 1;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products")
    .then(
      res => res.json()
    );

  return {
    props: {
      products: products.map((product) => ({
        ...product,
        rating: Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING),
        hasPrime: Math.random() < 0.5
      })),
      session,
    }
  };
}

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      {/* ---- TO BEGIN, delete this section and GET CODING!!! ---- */}

      {/* ---- header---- */}
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/**banner */}
        <Banner />

        {/**Product feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

//https://fakestoreapi.com/products