"use client";
import { useRouter } from "next/navigation";
import { CirclePlus } from "lucide-react";

export default function FinanceSpaceAdd() {
  const router = useRouter();
  return (
    <button
      className="cursor-pointer"
      type="button"
      onClick={() => router.push("/dashboard/finance/spaces/new")}
    >
      <CirclePlus color="#0f7a4f" />
    </button>
  );
}
