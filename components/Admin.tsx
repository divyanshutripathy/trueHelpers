import React, { useState } from "react";
import Header from "./Header";
import Image from "next/image";
import { useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import Loading from "./Loading";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import Head from "next/head";

interface types {
  contract: SmartContract;
}

function Admin({ contract }: types) {
  const { data: env } = useContractRead(contract, "debug", "env");
  const { data: wom } = useContractRead(contract, "debug", "wom");
  const { mutateAsync: spend } = useContractWrite(contract, "spend");
  const { data: edu, isLoading } = useContractRead(contract, "debug", "edu");

  const [envRec, setEnvRec] = useState("");
  const [womRec, setWomRec] = useState("");
  const [eduRec, setEduRec] = useState("");

  const [envMess, setEnvMess] = useState("");
  const [womMess, setWomMess] = useState("");
  const [eduMess, setEduMess] = useState("");

  const [envDonation, setEnvDonation] = useState<number>(0);
  const [womDonation, setWomDonation] = useState<number>(0);
  const [eduDonation, setEduDonation] = useState<number>(0);

  const envSpend = async () => {
    const notif = toast.loading("Transaction Initiated");
    try {
      await spend([
        envRec,
        "env",
        envMess,
        { value: ethers.utils.parseEther(envDonation.toString()) },
      ]);
      setEnvRec("");
      setEnvMess("");
      setEnvDonation(0);
      toast.success("Transaction Successful!", { id: notif });
    } catch (err) {
      toast.error("Oops! Something went wrong", { id: notif });
    }
  };

  const womSpend = async () => {
    const notif = toast.loading("Transaction Initiated");
    try {
      await spend([
        womRec,
        "wom",
        womMess,
        { value: ethers.utils.parseEther(womDonation.toString()) },
      ]);
      setWomRec("");
      setWomMess("");
      setWomDonation(0);
      toast.success("Transaction Successful!", { id: notif });
    } catch (err) {
      toast.error("Oops! Something went wrong", { id: notif });
    }
  };

  const eduSpend = async () => {
    const notif = toast.loading("Transaction Initiated");
    try {
      await spend([
        eduRec,
        "edu",
        eduMess,
        { value: ethers.utils.parseEther(eduDonation.toString()) },
      ]);
      setEduRec("");
      setEduMess("");
      setEduDonation(0);
      toast.success("Transaction Successful!", { id: notif });
    } catch (err) {
      toast.error("Oops! Something went wrong", { id: notif });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col text-white">
      <Head>
        <title>TH Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold">Welcome Admin!</h2>
        <div className="mx-auto p-4 mb-4 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-[#0c3932] min-h-[250px] w-[400px] pb-5 rounded-lg flex flex-col md:w-[300px]">
            <h3 className="p-2 text-lg bg-[#11554b] font-bold rounded-t-lg text-center">
              Save the Green
            </h3>
            <div className="flex flex-col items-center">
              <Image
                src="/green.png"
                alt="Save the Green"
                height={300}
                width={300}
                className="w-40"
              />
            </div>
            <div className="px-2 mb-4 grid grid-cols-2 gap-y-2">
              <h2 className="text-lg font-bold mr-auto">Total Donated:</h2>
              <h2 className="ml-auto">{ethers.utils.formatEther(env)} Matic</h2>
              <h2>Receiver's Address:</h2>
              <input
                value={envRec}
                onChange={(e) => setEnvRec(e.target.value)}
                type="text"
                className="px-1 outline-none bg-inherit border-2 border-[#139f8a] rounded-md"
              />
              <h2>Amount:</h2>
              <input
                value={envDonation}
                onChange={(e) => setEnvDonation(Number(e.target.value))}
                type="number"
                min={0}
                max={parseInt(env)}
                step={0.01}
                className="pr-1 outline-none bg-inherit border-2 border-[#139f8a] rounded-md text-right"
              />
              <h2>Message:</h2>
              <input
                value={envMess}
                onChange={(e) => setEnvMess(e.target.value)}
                type="text"
                className="px-1 outline-none bg-inherit border-2 border-[#139f8a] rounded-md"
              />
            </div>
            <button
              onClick={envSpend}
              className="bg-[#11554b] px-2 py-1 pb-1.5 rounded-md w-20 mx-auto"
            >
              Spend
            </button>
          </div>

          {/* Women */}
          <div className="bg-[#0c3932] min-h-[250px] w-[400px] pb-5 rounded-lg flex flex-col md:w-[300px]">
            <h3 className="p-2 text-lg bg-[#11554b] font-bold rounded-t-lg text-center">
              Empowering Feminine
            </h3>
            <div className="flex flex-col items-center">
              <Image
                src="/female.png"
                alt="Save the Green"
                height={300}
                width={300}
                className="w-40"
              />
            </div>
            <div className="px-2 mb-4 grid grid-cols-2 gap-y-2">
              <h2 className="text-lg font-bold mr-auto">Total Donated:</h2>
              <h2 className="ml-auto">{ethers.utils.formatEther(wom)} Matic</h2>
              <h2>Receiver's Address:</h2>
              <input
                value={womRec}
                onChange={(e) => setWomRec(e.target.value)}
                type="text"
                className="px-1 outline-none bg-inherit border-2 border-[#139f8a] rounded-md"
              />
              <h2>Amount:</h2>
              <input
                value={womDonation}
                onChange={(e) => setWomDonation(Number(e.target.value))}
                type="number"
                min={0}
                max={parseInt(wom)}
                step={0.01}
                className="pr-1 outline-none bg-inherit border-2 border-[#139f8a] rounded-md text-right"
              />
              <h2>Message:</h2>
              <input
                value={womMess}
                onChange={(e) => setWomMess(e.target.value)}
                type="text"
                className="px-1 outline-none bg-inherit border-2 border-[#139f8a] rounded-md"
              />
            </div>
            <button
              onClick={womSpend}
              className="bg-[#11554b] px-2 py-1 pb-1.5 rounded-md w-20 mx-auto"
            >
              Spend
            </button>
          </div>

          {/* Education */}
          <div className="bg-[#0c3932] min-h-[250px] w-[400px] pb-5 rounded-lg flex flex-col md:w-[300px]">
            <h3 className="p-2 text-lg bg-[#11554b] font-bold rounded-t-lg text-center">
              Education for Free
            </h3>
            <div className="flex flex-col items-center">
              <Image
                src="/school.png"
                alt="Save the Green"
                height={300}
                width={300}
                className="w-40"
              />
            </div>
            <div className="px-2 mb-4 grid grid-cols-2 gap-y-2">
              <h2 className="text-lg font-bold mr-auto">Total Donated:</h2>
              <h2 className="ml-auto">{ethers.utils.formatEther(edu)} Matic</h2>
              <h2>Receiver's Address:</h2>
              <input
                value={eduRec}
                onChange={(e) => setEduRec(e.target.value)}
                type="text"
                className="px-1 outline-none bg-inherit border-2 border-[#139f8a] rounded-md"
              />
              <h2>Amount:</h2>
              <input
                value={eduDonation}
                onChange={(e) => setEduDonation(Number(e.target.value))}
                type="number"
                min={0}
                max={parseInt(env)}
                step={0.01}
                className="pr-1 outline-none bg-inherit border-2 border-[#139f8a] rounded-md text-right"
              />
              <h2>Message:</h2>
              <input
                value={eduMess}
                onChange={(e) => setEduMess(e.target.value)}
                type="text"
                className="px-1 outline-none bg-inherit border-2 border-[#139f8a] rounded-md"
              />
            </div>
            <button
              onClick={eduSpend}
              className="bg-[#11554b] px-2 py-1 pb-1.5 rounded-md w-20 mx-auto"
            >
              Spend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
