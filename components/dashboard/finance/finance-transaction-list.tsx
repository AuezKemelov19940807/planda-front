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
    <div className=" flex flex-col flex-1 w-full">
      <div className="dark:bg-[#0D1012] border rounded-lg border-light-gray  dark:border-dark-gray">
        <div className="flex items-center w-full px-2 md:px-4 py-3.5 justify-between">
          <span className="font-bold flex text-lg items-center gap-x-2">
            <span>{title}</span>
          </span>

          <button
            type="button"
            onClick={action}
            className="text-green-700 font-semibold"
          >
            + Қосу
          </button>
        </div>
        <ul>
          {items.length > 0 ? (
            items.map((item) => {
              const Icon = item.icon;

              return (
                <li
                  key={item.id}
                  className="border-t px-2 md:px-4 py-2.5 md:py-3.5 border-light-gray flex justify-between dark:border-dark-gray"
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
                      {item.amount}
                    </span>
                    <span className="flex justify-end text-zinc-600 text-xs md:text-sm">
                      {item.time}
                    </span>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="border-t border-light-gray dark:border-dark-gray py-8 px-4 text-center">
              <p className="text-sm text-zinc-500">Әзірге операциялар жоқ</p>
              <p className="text-xs text-zinc-400 mt-1">
                Жаңа операция қосу үшін «+ Қосу» батырмасын басыңыз
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
