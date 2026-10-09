import { Check, LucideIcon } from "lucide-react";

interface TransactionTypeCardProps {
  title: string;
  description: string;
  value: "income" | "expense";
  selected: "income" | "expense" | null;
  onClick: () => void;
  color: "green" | "red";
  Icon: LucideIcon;
}

export default function TransactionTypeCard({
  title,
  description,
  value,
  selected,
  onClick,
  color,
  Icon,
}: TransactionTypeCardProps) {
  const isActive = selected === value;

  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        relative
        flex
        items-center
        bg-white
        gap-x-5
        p-5
        py-3
        rounded-xl
        border
        font-medium
        transition
         ${color === "green" ? "hover:bg-green-100 hover:border-green-500" : "hover:bg-red-100 hover:border-red-500"}
         ${
           isActive
             ? color === "green"
               ? "border-green-500 bg-green-500/10"
               : "border-red-500 bg-red-500/10"
             : "border-gray-400"
         }
        ${color === "green" ? "text-green-500" : "text-red-500"}
      `}
    >
      <span
        className={`${
          color === "green" ? "bg-[#8BDE64]" : "bg-[#E7362D]"
        } rounded-full w-12 h-12 flex items-center justify-center shrink-0`}
      >
        <Icon className="w-8 h-8 text-white" />
      </span>

      <span className="flex flex-col items-start gap-y-1">
        <span className="font-bold">{title}</span>
        <span className="text-gray-500">{description}</span>
      </span>

      {isActive && (
        <span className="absolute right-3 top-3">
          <span
            className={`${
              color === "green" ? "bg-green-600" : "bg-red-600"
            } w-6 h-6 rounded-full flex items-center justify-center`}
          >
            <Check className="w-5 h-5 text-white" />
          </span>
        </span>
      )}
    </button>
  );
}
