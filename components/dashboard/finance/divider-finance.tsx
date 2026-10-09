import { Diamond } from "lucide-react";

interface DividerProps {
  type: "income" | "expense" | null;
}

export default function DividerFinance({ type }: DividerProps) {
  const color =
    type === "income"
      ? "text-green-500"
      : type === "expense"
        ? "text-red-500"
        : "text-gray-400";

  return (
    <div className="mt-6 flex items-center gap-x-1">
      <span className="block h-0.5 w-full rounded-full bg-gray-300" />

      <Diamond strokeWidth={3} className={`h-5 w-5 ${color}`} />

      <span className="block h-0.5 w-full rounded-full bg-gray-300" />
    </div>
  );
}
