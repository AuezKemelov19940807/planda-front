import { BriefcaseBusiness, Laptop, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type Transaction = {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  amount: string;
  time: string;
};

type FinanceTransactionListProps = {
  title: string;
  totalLabel: string;
  total: string;
  color: string;
  iconBg: string;
  items: Transaction[];
  action?: () => void;
};

const incomes = [
  {
    id: 1,
    icon: BriefcaseBusiness,
    title: "Жалақы",
    description: "Негізгі жұмыс",
    amount: "400 000 тг",
    time: "05:32",
  },
  {
    id: 2,
    icon: Laptop,
    title: "Фриланс",
    description: "Upwork",
    amount: "250 000 тг",
    time: "08:11",
  },
];

export default function FinanceTransactionList({
  title,
  totalLabel,
  total,
  color,
  iconBg,
  items,
  action,
}: FinanceTransactionListProps) {
  return (
    <div className="px-2 md:px-5  flex flex-col flex-1">
      <div className="dark:bg-[#0D1012] border rounded-lg border-light-gray  dark:border-dark-gray">
        <button
          type="button"
          onClick={action}
          disabled={!action}
          className="flex items-center  w-full px-2 md:px-4 py-3.5 justify-between cursor-pointer"
        >
          <span className={color}>{title}</span>
          <span className="flex gap-x-2 items-center">
            <span className="text-xs hidden md:inline-block md:text-sm text-zinc-600">
              {totalLabel}
            </span>
            <span className={color}>{total}</span>
          </span>
        </button>
        <ul>
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <li
                key={item.id}
                className="border-t border-b px-2 md:px-4 py-2.5 md:py-3.5 border-light-gray flex  justify-between dark:border-dark-gray"
              >
                <div className="flex gap-x-4 items-center">
                  <span
                    className={`${iconBg} flex w-8 h-8 md:h-10 md:w-10 items-center justify-center rounded-full`}
                  >
                    <Icon className="w-4 h-4 md:h-5 md:w-5 text-white" />
                  </span>
                  <span className="flex flex-col text-sm md:text-base">
                    <span>{item.title}</span>

                    <span className="text-zinc-600 text-xs md:text-sm">
                      {item.description}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="pr-2 md:pr-5 text-sm md:text-base">
                    {item.amount}{" "}
                  </span>
                  <span className="flex justify-end text-zinc-600 text-xs md:text-sm">
                    {item.time}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
