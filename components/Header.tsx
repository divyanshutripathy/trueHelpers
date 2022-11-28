import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import React from "react";

function Header() {
  const uAdd = useAddress();
  const disconnect = useDisconnect();

  return (
    <nav className="flex justify-between p-4 bg-[#0c3932] sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <img src="/logo.jpg" alt="logo" className="w-20 rounded-full" />
        <div className="">
          <h1 className="text-lg text-white font-bold">True Helpers</h1>
          <p className="text-xs text-emerald-500 truncate">
            {uAdd &&
              uAdd?.substring(0, 5) +
                "..." +
                uAdd?.substring(uAdd.length - 6, uAdd.length - 1)}
          </p>
        </div>
      </div>
      <div className="ml-auto">
        <button
          onClick={disconnect}
          className="py-2 px-4 border-2 border-[#036756] hover:bg-[#036756] rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;
