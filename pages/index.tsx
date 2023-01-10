import Head from "next/head";
import DashBoard from "../components/DashBoard";
import Auth from "../components/auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetServerSideProps } from "next";



export default function Home({
  authorized,
  user,
}: {
  authorized: boolean;
  user: any;
}) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer />

      {authorized ? <DashBoard user={user} /> : <Auth />}
      {/* <DashBoard /> */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const jwt = ctx.req.cookies.token;

  if (jwt) {
    const res = await fetch(`https://bucket-app.vercel.app/api/dashboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    });

    let response = await res.json();


    return {
      props: {
        authorized: jwt ? true : false,
        user: response.user,
      },
    };
  }

  return {
    props: {
      authorized: jwt ? true : false,
    },
  };
};
