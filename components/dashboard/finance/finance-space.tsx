"use client";

import FinanceSpaceList from "./finance-space-list";
import FinanceSpaceAdd from "./finance-space-add";



export default function FinanceSpace() {
  return (
    <div className="flex items-center gap-x-5">
      <div className="bg-[#D5EADF] flex gap-x-2.5 p-1 rounded-sm">
        <FinanceSpaceList />
      </div>
      <FinanceSpaceAdd />
    </div>
  );
}
