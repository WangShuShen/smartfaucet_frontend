import React from "react";

export default function Search_engine_Component() {
  return (
    <div className="flex flex-col justify-end">
      <input
        type="text"
        className="py-1 bg-transparent border border-t-0 border-r-0 border-l-0 border-b-2 border-blue-500 text-blue-800 font-semibold placeholder-blue-500 focus:outline-none"
        placeholder="SEARCH"
      />
    </div>
  );
}
