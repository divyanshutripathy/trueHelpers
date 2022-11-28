import React from "react";
import Image from "next/image";
import { useMetamask } from "@thirdweb-dev/react";
import Head from "next/head";

export default function Login() {
  const metaLogin = useMetamask();
  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col text-white items-center justify-center text-center">
      <Head>
        <title>True Helpers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/logo.jpg"
        alt="Logo"
        width={100}
        height={100}
        className="w-56 rounded-full mb-5"
      />
      <h1 className="text-5xl font-bold mb-5">Welcome to True Helpers!</h1>
      <p>Login with your MetaMask to experience a truly trackable charity</p>
      <button
        onClick={metaLogin}
        className="text-black bg-white px-8 py-5 mt-4 rounded-md font-bold hover:bg-gray-200 active:bg-gray-400"
      >
        Login with MetaMask
      </button>
    </div>
  );
}
