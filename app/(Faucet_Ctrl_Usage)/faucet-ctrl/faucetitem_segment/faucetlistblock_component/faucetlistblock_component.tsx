import React, { useState } from "react";

// Define a type for the faucet object
type Faucet = {
  id: string;
  status:
    | "electromagneticvalve_status"
    | "normalconnection_status"
    | "humanfixed_status"
    | "errorconnection_status";
};

// Define the Faucetlist array with types
const Faucetlist: Faucet[] = [
  { id: "TAP230011", status: "electromagneticvalve_status" },
  { id: "TAP230012", status: "normalconnection_status" },
  { id: "TAP230013", status: "humanfixed_status" },
  { id: "TAP230014", status: "errorconnection_status" },
  { id: "TAP230015", status: "normalconnection_status" },
];

export default function FaucetListBlock_Component() {
  // Update the useState type to number | null
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // Add type annotations to getRingColor function
  const getRingColor = (
    status: Faucet["status"],
    isSelected: boolean
  ): string => {
    if (!isSelected) return "hidden";
    return status === "electromagneticvalve_status" ||
      status === "errorconnection_status"
      ? "ring-red-500"
      : "ring-[#D9D9D9]";
  };

  return (
    <>
      <div className="bg-[#EFEFEF] w-11/12 flex overflow-x-auto rounded-md ml-2">
        <div className="flex flex-nowrap">
          {Faucetlist.map((faucet, index) => (
            <div
              key={faucet.id}
              className="card card-compact w-68 bg-[#EFEFEF] h-auto mr-2 flex-shrink-0 relative"
              onClick={() => setSelectedCard(index)} // Updated to pass index as number
            >
              <div className="flex flex-col items-center p-4 relative">
                <img
                  src={`/${
                    selectedCard === index
                      ? `${faucet.status}_select`
                      : faucet.status
                  }.svg`}
                  alt={faucet.status}
                  className="mb-4 z-10 pb-2"
                />
                <img
                  src="/TAP-145015.svg"
                  alt="TAP-145015"
                  className="mb-2 z-10"
                />
                <div
                  className={`absolute top-8 left-4 right-4 bottom-16 rounded-lg ${getRingColor(
                    faucet.status,
                    selectedCard === index
                  )} ring-4 ring-opacity-50 z-0`}
                ></div>
                <p className="z-10 text-[#5F6162] font-bold">ID {faucet.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
