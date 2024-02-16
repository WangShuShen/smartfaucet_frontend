import React from "react";

export default function Search_engine_Component() {
  return (
    <div className="flex flex-col justify-end">
      <input
        type="text"
        className="py-1 bg-transparent border border-t-0 border-r-0 border-l-0 border-b-2 border-[#118BBB] text-[#118BBB] font-semibold placeholder-[#118BBB] focus:outline-none"
        placeholder="SEARCH"
      />
    </div>
  );
}
