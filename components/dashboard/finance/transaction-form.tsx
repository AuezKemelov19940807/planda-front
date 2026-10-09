"use client";

import { AnimatePresence, motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import {
  Briefcase,
  Laptop,
  TrendingUp,
  Landmark,
  Gift,
  Wallet,
  BadgeDollarSign,
  HandCoins,
  PiggyBank,
  Coins,
  Shapes,
  ChevronDown,
  MessageCircle,
  CalendarCheck,
  LucideIcon,
  BriefcaseBusiness,
  Car,
  Film,
  GraduationCap,
  HeartPulse,
  House,
  Plane,
  Shirt,
  ShoppingCart,
  UtensilsCrossed,
  CalendarDays,
} from "lucide-react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useClickOutside } from "@/lib/hooks/useClickOutside";

type FinanceCategory = {
  id: number;
  title: string;
  icon: LucideIcon;
};

interface TransactionFormProps {
  transactionType: "income" | "expense";
}

const incomeCategories: FinanceCategory[] = [
  {
    id: 1,
    title: "Зарплата",
    icon: Briefcase,
  },
  {
    id: 2,
    title: "Фриланс",
    icon: Laptop,
  },
  {
    id: 3,
    title: "Бизнес",
    icon: TrendingUp,
  },
  {
    id: 4,
    title: "Инвестиции",
    icon: Landmark,
  },
  {
    id: 5,
    title: "Подарок",
    icon: Gift,
  },
  {
    id: 6,
    title: "Кэшбэк",
    icon: Wallet,
  },
  {
    id: 7,
    title: "Бонус",
    icon: BadgeDollarSign,
  },
  {
    id: 8,
    title: "Возврат долга",
    icon: HandCoins,
  },
  {
    id: 9,
    title: "Накопления",
    icon: PiggyBank,
  },
  {
    id: 10,
    title: "Другое",
    icon: Coins,
  },
];

export const expenseCategories: FinanceCategory[] = [
  {
    id: 1,
    title: "Продукты",
    icon: ShoppingCart,
  },
  {
    id: 2,
    title: "Кафе и рестораны",
    icon: UtensilsCrossed,
  },
  {
    id: 3,
    title: "Транспорт",
    icon: Car,
  },
  {
    id: 4,
    title: "Жильё",
    icon: House,
  },
  {
    id: 5,
    title: "Здоровье",
    icon: HeartPulse,
  },
  {
    id: 6,
    title: "Образование",
    icon: GraduationCap,
  },
  {
    id: 7,
    title: "Одежда",
    icon: Shirt,
  },
  {
    id: 8,
    title: "Путешествия",
    icon: Plane,
  },
  {
    id: 9,
    title: "Развлечения",
    icon: Film,
  },
  {
    id: 10,
    title: "Подарки",
    icon: Gift,
  },
  {
    id: 11,
    title: "Работа",
    icon: BriefcaseBusiness,
  },
  {
    id: 12,
    title: "Другое",
    icon: Wallet,
  },
];

export default function TransactionForm({
  transactionType,
}: TransactionFormProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof incomeCategories)[number] | null
  >(null);

  const [date, setDate] = useState<Date | null>(new Date());

  const ref = useClickOutside<HTMLLabelElement>(() => setIsCategoryOpen(false));
  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategorySelect = (category: FinanceCategory) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  const categories =
    transactionType === "income" ? incomeCategories : expenseCategories;

  const isIncome = transactionType === "income";

  const color = {
    text: isIncome ? "text-green-500" : "text-red-500",
    border: isIncome
      ? "focus-within:border-green-500"
      : "focus-within:border-red-500",
    bg: isIncome ? "bg-green-500" : "bg-red-500",
  };

  const activeBorder = isIncome ? "border-green-500" : "border-red-500";
  const scrollClass = isIncome ? "custom-scroll-green" : "custom-scroll-red";

  useEffect(() => {
    setSelectedCategory(null);
  }, [transactionType]);

  return (
    <div className="mt-6">
      <form className="flex flex-col gap-y-5">
        <label htmlFor="">
          <span className="text-sm font-semibold ">Сумма</span>
          <span
            className={`${color.border} flex border p-5 border-gray-400  rounded-lg items-center gap-x-4`}
          >
            <Wallet className={color.text} />
            <input
              className="w-full outline-none bg-transparent"
              type="number"
              placeholder="Введите сумму"
            />
          </span>
        </label>
        <label className="relative" htmlFor="" ref={ref}>
          <span className="text-sm font-semibold ">Категория</span>
          <div
            onClick={toggleCategoryDropdown}
            className={` ${isCategoryOpen ? activeBorder : "border-gray-400"} flex cursor-pointer border p-5 max-h-16.25   rounded-lg items-center gap-x-4 justify-between`}
          >
            <span className="flex items-center gap-x-4">
              {selectedCategory ? (
                <>
                  <span
                    className={`${color.bg} w-10 h-10 rounded-full flex items-center justify-center`}
                  >
                    <selectedCategory.icon color="white" />
                  </span>
                  <span>{selectedCategory.title}</span>
                </>
              ) : (
                <>
                  <Shapes className={color.text} />
                  <span className="text-gray-500">Выберите категорию</span>
                </>
              )}
            </span>

            <span
              className={`transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
            >
              <ChevronDown className={color.text} />
            </span>
          </div>
          <AnimatePresence>
            {isCategoryOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`${isCategoryOpen ? activeBorder : "border-gray-400"} ${scrollClass} absolute w-full z-10 bg-white dark:bg-[#0D1012] h-75 border overflow-hidden overflow-y-auto rounded-lg mt-2`}
              >
                <ul className="">
                  {categories.map((category) => {
                    return (
                      <li
                        key={category.id}
                        onClick={() => handleCategorySelect(category)}
                        className="flex items-center gap-x-4 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-gray cursor-pointer"
                      >
                        <span
                          className={`${color.bg} w-10 h-10 rounded-full flex items-center justify-center`}
                        >
                          <category.icon color="white" />
                        </span>
                        <span>{category.title}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </label>
        <label htmlFor="">
          <span className="text-sm font-semibold ">
            Комментарий (необязательно)
          </span>
          <span
            className={`flex border p-5 border-gray-400 ${color.border} rounded-lg gap-x-4`}
          >
            <MessageCircle className={color.text} />
            <textarea
              className="w-full outline-none bg-transparent resize-none"
              placeholder="Комментарий"
            />
          </span>
        </label>
        <label htmlFor="">
          <span className="text-sm font-semibold "> Дата </span>
          <span
            className={`flex border relative p-5 border-gray-400 ${color.border} rounded-lg items-center gap-x-4`}
          >
            <CalendarDays className={color.text} />

            <DatePicker
              selected={date}
              onChange={(date: Date | null) => setDate(date)}
              dateFormat="dd.MM.yyyy"
              className="w-full outline-none bg-transparent"
            />
          </span>
        </label>
        <button className="bg-yellow w-full font-bold py-4 text-black rounded-lg">
          Сохранить
        </button>
      </form>
    </div>
  );
}
