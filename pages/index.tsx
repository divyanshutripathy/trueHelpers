import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { BigNumberish, ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Login from "../components/Login";
import Image from "next/image";
import toast from "react-hot-toast";
import Admin from "../components/Admin";

type messageType = {
  cause: string;
  message: string;
  to: string;
  spent: BigNumberish;
};

const Home: NextPage = () => {
  const uAdd = useAddress();
  const { contract } = useContract(
    "0x01F038E57A8CF079a280871b5918406F70dB4BA9"
  );
  const { data: donatedAmt } = useContractRead(
    contract,
    "donated_amt_arg",
    uAdd
  );
  const { mutateAsync: donate } = useContractWrite(contract, "donate");
  const { data: spendMessages, isLoading } = useContractRead(
    contract,
    "donor_messages_arg",
    uAdd
  );
  const [envDonation, setEnvDonation] = useState<number>(0);
  const [womDonation, setWomDonation] = useState<number>(0);
  const [eduDonation, setEduDonation] = useState<number>(0);

  interface causeType {
    env: string;
    wom: string;
    edu: string;
  }
  const causes: causeType = {
    env: "Save the Green",
    wom: "Empowering Feminine",
    edu: "Education for free",
  };

  // useEffect(() => {
  //   if (spendMessages) {
  //     console.log(spendMessages);
  //   }
  // }, [isLoading]);

  const handleDonation = async (cause: string) => {
    const notif = toast.loading("Transaction Initiated");
    let donation = 0;
    if (cause === "env") {
      donation = envDonation;
    } else if (cause === "wom") {
      donation = womDonation;
    } else {
      donation = eduDonation;
    }
    try {
      await donate([
        cause,
        { value: ethers.utils.parseEther(donation.toString()) },
      ]);
      toast.success("Thanks for your contribution", { id: notif });
    } catch (err) {
      toast.error("Transaction Interrupted", { id: notif });
    }
  };

  if (!uAdd) {
    return <Login />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (uAdd === "0xE764578cFe2798cB65D92CcB3182aBFC51CCB1E2") {
    if (contract) {
      return <Admin contract={contract} />;
    }
  }

  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col text-white">
      <Head>
        <title>True Helpers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <h1 className="text-4xl font-bold p-4">Fund Our Causes!</h1>
      </div>
      <p className="text-small px-5 py-1">
        Help us by funding our campaigns, which helps us create a better future
        for all. You will get an accurate report of how we have spent your
        hard-earned money, whenever we a spending.
      </p>
      {/* <div>{donatedAmt[0][2].toString()}</div> */}
      <div className="mx-auto p-4 mb-4 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-[#0c3932] min-h-[250px] w-[400px] rounded-lg flex flex-col md:w-[300px]">
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
          <div className="px-2">
            <h2 className="text-lg font-bold">About:</h2>
            <p className="text-justify">
              Help us in saving the green cover, which helps maitain the O2 and
              CO2 balance of the world. Your generous donations will help us in
              buying new saplings, acquiring new land for plantations and paying
              salaries of people who take care of them.
            </p>
            <h2 className="py-1 text-lg font-bold">
              Donate <span className="font-medium">(Matic)</span>:
            </h2>
            <div className="flex space-x-2 mb-3">
              <input
                value={envDonation}
                onChange={(e) => setEnvDonation(Number(e.target.value))}
                type="number"
                min={0}
                step={0.01}
                className="pr-1 outline-none bg-inherit border-2 border-[#139f8a] rounded-md text-right"
              />
              <button
                onClick={() => handleDonation("env")}
                className="bg-[#11554b] px-2 py-1 pb-1.5 rounded-md"
              >
                Donate
              </button>
            </div>
            <span className="text-sm italic flex flex-1 mb-3">
              <p className="mr-auto">Total donated:</p>
              <p className="ml-auto">
                {ethers.utils.formatEther(donatedAmt[1][0])} Matic
              </p>
            </span>
          </div>
        </div>

        {/* Woman */}
        <div className="bg-[#0c3932] min-h-[250px] w-[400px] rounded-lg flex flex-col md:w-[300px]">
          <h3 className="p-2 text-lg bg-[#11554b] font-bold rounded-t-lg text-center">
            Empowering Feminine
          </h3>
          <div className="flex flex-col items-center my-2">
            <Image
              src="/female.png"
              alt="Save the Green"
              height={300}
              width={300}
              className="w-40"
            />
          </div>
          <div className="px-2">
            <h2 className="text-lg font-bold">About:</h2>
            <p className="text-justify">
              We closesly work closely with organizations which employ women, to
              get into these organizations we give underprivileged women
              vocational training. During this course we provide them with free
              rations, help us create a future with equal opportunities.
            </p>
            <h2 className="py-1 text-lg font-bold">
              Donate <span className="font-medium">(Matic)</span>:
            </h2>
            <div className="flex space-x-2 mb-3">
              <input
                value={womDonation}
                onChange={(e) => setWomDonation(Number(e.target.value))}
                type="number"
                min={0}
                step={0.01}
                className="pr-1 outline-none bg-inherit border-2 border-[#139f8a] rounded-md text-right"
              />
              <button
                onClick={() => handleDonation("wom")}
                className="bg-[#11554b] px-2 py-1 pb-1.5 rounded-md"
              >
                Donate
              </button>
            </div>
            <span className="text-sm italic flex flex-1 mb-3">
              <p className="mr-auto">Total donated:</p>
              <p className="ml-auto">
                {ethers.utils.formatEther(donatedAmt[1][1])} Matic
              </p>
            </span>
          </div>
        </div>

        {/* Education */}
        <div className="bg-[#0c3932] min-h-[250px] w-[400px] rounded-lg flex flex-col md:w-[300px]">
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
          <div className="px-2">
            <h2 className="text-lg font-bold">About:</h2>
            <p className="text-justify">
              Our efforts in this area include spreading awareness about
              education among underdeveloped areas and building institutions to
              help underprevileged children to get free basic education along
              with compulsary English and IT subjects.
            </p>
            <h2 className="py-1 text-lg font-bold">
              Donate <span className="font-medium">(Matic)</span>:
            </h2>
            <div className="flex space-x-2 mb-3">
              <input
                value={eduDonation}
                onChange={(e) => setEduDonation(Number(e.target.value))}
                type="number"
                min={0}
                step={0.01}
                className="pr-1 outline-none bg-inherit border-2 border-[#139f8a] rounded-md text-right"
              />
              <button
                onClick={() => handleDonation("edu")}
                className="bg-[#11554b] px-2 py-1 pb-1.5 rounded-md"
              >
                Donate
              </button>
            </div>
            <span className="text-sm italic flex flex-1 mb-3">
              <p className="mr-auto">Total donated:</p>
              <p className="ml-auto">
                {ethers.utils.formatEther(donatedAmt[1][2])} Matic
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="mx-4 mb-8">
        <h2 className="text-3xl font-bold mb-2">Spend Records</h2>
        <div className="bg-[#0c3932] rounded-lg">
          <div className="grid grid-cols-7 justify-items-center">
            <span>Cause</span>
            <span className="col-span-2">Sent to</span>
            <span className="col-span-3">Messsage</span>
            <span>Amount</span>
          </div>
          <hr />
          {spendMessages.map((data: messageType) => (
            <div className="grid grid-cols-7 justify-items-center pt-2">
              <span>{causes[data.cause as keyof causeType]}</span>
              <span className="col-span-2 sm:text-ellipsis">{data.to}</span>
              <span className="col-span-3">{data.message}</span>
              <span>{ethers.utils.formatEther(data.spent)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
