import Head from "next/head";

import Shopify from "@shopify/shopify-api";
import Hero from "../components/Hero";
import { shop, storefrontAccessToken } from "../endpoints";
import { productsQuery } from "../src/queries/products";
import Products from "../components/Products/Products";
import { shopQuery } from "../src/queries/shop";

export async function getStaticProps() {
  const storefrontClient = new Shopify.Clients.Storefront(shop, storefrontAccessToken);

  const productsData = await storefrontClient.query(productsQuery);
  const shopData = await storefrontClient.query(shopQuery);
  const products = productsData.body.data.products.edges;
  const shopInfo = shopData.body.data.shop;

  return {
    props: {
      products,
      shopInfo,
    },
  };
}

export default function Home({ products, shopInfo }) {
  console.log(shopInfo);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero products={products} shopInfo={shopInfo} />
      <Products products={products} />
    </>
  );
}
