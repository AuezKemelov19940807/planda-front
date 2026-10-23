"use client";
import {
  ArrowRight,
  BriefcaseBusiness,
  Car,
  Laptop,
  ShoppingCart,
  Utensils,
  Wallet,
} from "lucide-react";
import DashboardCard from "./dashboard-card";
import FinanceTransactionList from "./finance-transaction-list";
import { useState } from "react";

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
import { useClickOutside } from "@/lib/hooks/useClickOutside";

import { TransactionModalContent } from "./transaction-modal-content";
import MainModal from "../../ui/main-modal";
import { FINANCE_SPACES } from "@/graphql/queries/finance/queries/financeSpaces";
import {
  FinanceSpaceResponseType,
  FinanceSpaceType,
} from "@/graphql/types/financeSpaces";
import { useQuery } from "@apollo/client/react";
import { li } from "framer-motion/client";

export default function Finance() {
  const { data, loading, error } = useQuery<FinanceSpaceResponseType>(
    FINANCE_SPACES,
    {
      fetchPolicy: "network-only",
    },
  );

  const spaces = data?.financeSpaces ?? [];

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

  type TransactionType = "income" | "expense";
  type ModalMode = "select" | "direct";
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [profileType, setProfileType] = useState<"personal" | "business">(
    "personal",
  );

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

  if (loading) {
    return <p>Загрузка финансов...</p>;
  }

  if (error) {
    return <p>Не удалось загрузить финансовые пространства.</p>;
  }

  return (
    <div>
      <div className="flex items-center gap-x-5 mb-5">
        {spaces.map((space) => (
          <li className="list-none" key={space.id}>
            <span className="uppercase"> {space.name} </span>
          </li>
        ))}
        {/* <div className="flex gap-2">
          <button
            className={`
      cursor-pointer text-sm rounded-md px-5 py-2 transition
      ${
        profileType === "personal"
          ? "bg-yellow text-black"
          : "bg-transparent text-gray-500 dark:text-gray-400"
      }
    `}
            onClick={() => setProfileType("personal")}
          >
            ФИЗ. ЛИЦО
          </button>

          <button
            className={`
      cursor-pointer text-sm rounded-md px-5 py-2 transition
      ${
        profileType === "business"
          ? "bg-yellow text-black"
          : "bg-transparent text-gray-500 dark:text-gray-400"
      }
    `}
            onClick={() => setProfileType("business")}
          >
            ЮР. ЛИЦО
          </button>
        </div> */}
      </div>
      <DashboardCard
        title="Каржы есебы"
        icon={<Wallet className="dark:text-yellow  w-5 md:w-7 md:h-7 h-5" />}
        border
        action={
          <button
            className="cursor-pointer text-sm border border-transparent dark:border-yellow bg-[#FFF4D0] dark:bg-[#121211] text-black dark:text-yellow-400 rounded-md px-5 py-2"
            onClick={() => handleOpenModal("income", "select")}
          >
            + Қосу
          </button>
        }
      >
        <div className="flex flex-col gap-y-2">
          <FinanceTransactionList
            title="Табыстар"
            totalLabel="Күндік жалпы табыс:"
            total="650 000 тг"
            color="text-green-500"
            iconBg="bg-green-500"
            items={incomes}
            action={() => handleOpenModal("income")}
          />
          <FinanceTransactionList
            title="Шығындар"
            totalLabel="Күндік жалпы шығын:"
            total="125 000 тг"
            color="text-red-500"
            iconBg="bg-red-500"
            action={() => handleOpenModal("expense")}
            items={expenses}
          />
          <button className="flex items-center justify-center gap-x-2">
            <span className="text-yellow">Барлыгын кору</span>
            <ArrowRight className="text-yellow" />
          </button>
        </div>
      </DashboardCard>
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
