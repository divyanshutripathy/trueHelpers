import React from "react";
import Image from "next/image";
import { PulseLoader, SyncLoader } from "react-spinners";
import Head from "next/head";

export default function Loading() {
  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col text-white text-center items-center justify-center">
      <Head>
        <title>True Helpers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.jpg"
          alt="Logo"
          width={100}
          height={100}
          className="w-20 rounded-full mb-5"
        />
        <h1 className="text-lg text-bold pb-5">
          Loading The Best Way To Care...
        </h1>
      </div>

      <SyncLoader color="white" size="25" />
    </div>
  );
}
