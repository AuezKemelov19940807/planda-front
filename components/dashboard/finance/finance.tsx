"use client";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Car,
  Laptop,
  Settings,
  ShoppingCart,
  Utensils,
  Wallet,
} from "lucide-react";

import FinanceTransactionList from "./finance-transaction-list";
import { useState } from "react";

import "react-calendar/dist/Calendar.css";
import {
  Briefcase,
  TrendingUp,
  Gift,
  Landmark,
  Coins,
  HandCoins,
  PiggyBank,
  BadgeDollarSign,
  LucideIcon,
} from "lucide-react";

import { TransactionModalContent } from "./transaction-modal-content";
import MainModal from "../../ui/main-modal";
import { FINANCE_SPACES } from "@/graphql/queries/finance/queries/financeSpaces";
import { FinanceSpaceResponseType } from "@/graphql/types/financeSpaces";
import { useQuery } from "@apollo/client/react";

import DashboardCalendar from "./dashboard-calendar";
import { TRANSACTIONS } from "@/graphql/queries/finance/queries/transactions";

import { TransactionsResponse } from "@/graphql/queries/finance/types/transaction";
import { Link, useRouter } from "@/i18n/navigation";

import FinanceSpace from "./finance-space";
import { useFinanceTransactions } from "@/lib/hooks/use-finance-transactions";
import { useFinanceSpace } from "@/lib/contexts/finance-space-context";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Finance() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  type TransactionType = "income" | "expense";
  type ModalMode = "select" | "direct";
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [transactionType, setTransactionType] =
    useState<TransactionType>("income");

  const [modalMode, setModalMode] = useState<ModalMode>("select");

  const handleOpenModal = (
    type: TransactionType,
    mode: ModalMode = "direct",
  ) => {
    setTransactionType(type);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  type IncomeCategory = {
    id: number;
    title: string;
    icon: LucideIcon;
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

  const expenses = [
    {
      id: 1,
      icon: ShoppingCart,
      title: "Азық-түлік",
      description: "Magnum",
      amount: "18 450 тг",
      time: "09:20",
    },
    {
      id: 2,
      icon: Car,
      title: "Жанармай",
      description: "Qazaq Oil",
      amount: "15 000 тг",
      time: "11:45",
    },
    {
      id: 3,
      icon: Utensils,
      title: "Түскі ас",
      description: "Coffee Boom",
      amount: "6 800 тг",
      time: "13:15",
    },
  ];

  const incomeCategories: IncomeCategory[] = [
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

  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
  } = useFinanceTransactions();

  const { selectedSpace, setSelectedSpace } = useFinanceSpace();
  const transactions = transactionsData?.transactions ?? [];

  const income = transactions.reduce(
    (total, transaction) =>
      transaction.type === "INCOME" ? total + transaction.amount : total,
    0,
  );

  const expense = transactions.reduce(
    (total, transaction) =>
      transaction.type === "EXPENSE" ? total + transaction.amount : total,
    0,
  );

  const balance = income - expense;

  // Получаем дату в формате YYYY-MM-DD
  const getDateKey = (date: Date | string) => {
    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const selectedDateKey = getDateKey(selectedDate);

  // Транзакции выбранного дня
  const dailyTransactions = transactions.filter(
    (transaction) => getDateKey(transaction.date) === selectedDateKey,
  );

  const dailyOperationCount = dailyTransactions.length;

  // Доходы выбранного дня
  const dailyIncomes = dailyTransactions.filter(
    (transaction) => transaction.type === "INCOME",
  );

  // Расходы выбранного дня
  const dailyExpenses = dailyTransactions.filter(
    (transaction) => transaction.type === "EXPENSE",
  );

  // Суммы за выбранный день
  const dailyIncome = dailyIncomes.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  const dailyExpense = dailyExpenses.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  const formattedDate = selectedDate.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  const expensePercentage =
    income > 0 ? Math.min((expense / income) * 100, 100) : 0;

  const remainingPercentage = 100 - expensePercentage;

  return (
    <div>
      <div className="flex flex-col gap-x-5 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2.5">
            <h2 className="font-semibold text-2xl">Финансы</h2>
            <Link
              href={`/dashboard/finance/${selectedSpace?.slug}/settings`}
              className="cursor-pointer"
            >
              <Settings />
            </Link>
          </div>
          <FinanceSpace />
        </div>
      </div>

      <div className="flex gap-x-6">
        <div className="max-w-3/5 w-full">
          <div className="bg-[#0f7a4f] z-10 overflow-hidden  relative mb-6 rounded-lg p-7.5 text-white">
            <div className="absolute w-90 h-90 -z-10 -top-30.5 -right-28.5 ">
              <img src={"/card-finance.png"} />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-x-2.5 items-center">
                <span className="text-lg font-semibold">Каржы есебы:</span>
                <span className="py-1.5 px-4 bg-[#3A926F] rounded-full">
                  {selectedSpace?.name}
                </span>
              </div>
              <button
                type="button"
                className="bg-white cursor-pointer py-2 px-4 rounded-full text-black"
                onClick={() => handleOpenModal("income", "select")}
              >
                + Косу
              </button>
            </div>
            <div className="flex items-center gap-x-8 justify-between">
              <div className="flex  w-full max-w-84.5 flex-col gap-y-4.5">
                <div className="flex flex-col gap-y-1">
                  <span className="text-sm opacity-80">Ағымдағы баланс</span>
                  <span className="font-extrabold text-6xl">{balance} тг</span>
                </div>
                <div className="flex flex-col gap-y-2">
                  <span className="w-full flex gap-x-1 items-center">
                    <span
                      className="rounded-l-full h-2 bg-white"
                      style={{ flex: remainingPercentage }}
                    />

                    <span
                      className="rounded-r-full h-2 bg-red-200"
                      style={{ flex: expensePercentage }}
                    />
                  </span>

                  <span className="text-sm opacity-80">
                    Табыстың {Math.round(expensePercentage)}%-ы жұмсалды
                  </span>
                </div>
              </div>
              <div className="flex  flex-col w-full max-w-80 gap-y-2.5">
                <div className="bg-[#3A926F] relative -z-20 w-full flex items-center gap-x-3 p-4 rounded-lg">
                  <span className="flex items-center justify-center bg-white rounded-full w-10 h-10">
                    <ArrowUpRight color="#0f7a4f" />
                  </span>
                  <span className="flex flex-col gap-y-0.5">
                    <span className="text-sm">Табыс</span>
                    <span className="text-2xl font-bold">
                      {dailyIncome.toLocaleString("ru-RU")} тг
                    </span>
                  </span>
                </div>
                <div className="bg-[#3A926F] w-full relative -z-20 flex items-center gap-x-3 p-4 rounded-lg">
                  <span className="flex items-center justify-center bg-white rounded-full w-10 h-10">
                    <ArrowDownRight color="#932B12" />
                  </span>
                  <span className="flex flex-col gap-y-0.5">
                    <span className="text-sm">Шығын</span>
                    <span className="text-2xl font-bold">
                      {dailyExpense.toLocaleString("ru-RU")} тг
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-x-6">
              <FinanceTransactionList
                title="Табыстар"
                totalLabel="Күндік жалпы табыс:"
                total={`${dailyIncome.toLocaleString("ru-RU")} тг`}
                color="text-green-500"
                iconBg="bg-green-500"
                items={dailyIncomes.map((transaction) => ({
                  id: transaction.id,
                  icon: Wallet,
                  title: "Доход",
                  description: transaction.comment ?? "",
                  amount: `${transaction.amount.toLocaleString("ru-RU")} тг`,
                  time: new Date(transaction.date).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                }))}
                action={() => handleOpenModal("income")}
              />

              <FinanceTransactionList
                title="Шығындар"
                totalLabel="Күндік жалпы шығын:"
                total={`${dailyExpense.toLocaleString("ru-RU")} тг`}
                color="text-red-500"
                iconBg="bg-red-500"
                items={dailyExpenses.map((transaction) => ({
                  id: transaction.id,
                  icon: Wallet,
                  title: "Расход",
                  description: transaction.comment ?? "",
                  amount: `${transaction.amount.toLocaleString("ru-RU")} тг`,
                  time: new Date(transaction.date).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                }))}
                action={() => handleOpenModal("expense")}
              />
            </div>
          </div>
        </div>
        {/* Calendar */}
        <div className="flex-2/5 h-fit dark:bg-[#0D1012] border rounded-lg border-light-gray  dark:border-dark-gray p-5">
          <DashboardCalendar value={selectedDate} onChange={setSelectedDate} />
          <div className="border-t pt-4 flex flex-col gap-y-2.5">
            <div className="font-extrabold">
              <span>{formattedDate} · </span>
              <span>{dailyOperationCount} операций</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#0B6B45]">
                {" "}
                Табыс +{dailyIncome.toLocaleString("ru-RU")} тг
              </span>
              <span className="text-red-700">
                Шығын −{dailyExpense.toLocaleString("ru-RU")} тг
              </span>
            </div>
            <div className="flex gap-x-4">
              <span className="flex gap-x-2.5 items-center">
                <span className="w-2.5 h-2.5 bg-[#0B6B45] rounded-full flex items-center justify-center"></span>
                <span className="text-[#0B6B45]">Табыс</span>
              </span>
              <span className="flex gap-x-2.5 items-center">
                <span className="w-2.5 h-2.5 bg-red-700 rounded-full flex items-center justify-center"></span>
                <span className="text-red-700">Шығын</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <MainModal open={isModalOpen} onClose={handleCloseModal}>
        <TransactionModalContent
          onClose={handleCloseModal}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
          modalMode={modalMode}
        />
      </MainModal>
    </div>
  );
}
