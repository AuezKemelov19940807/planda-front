"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";

import { CREATE_FINANCE_SPACE } from "@/graphql/queries/finance/mutations/createSpace";
import { FINANCE_SPACES } from "@/graphql/queries/finance/queries/financeSpaces";

import {
  CreateFinanceSpaceResponse,
  CreateFinanceSpaceVariables,
} from "@/graphql/types/financeSpaces";

import { X } from "lucide-react";

export default function NewSpaceForm() {
  const router = useRouter();

  const [name, setName] = useState("");

  const [
    createFinanceSpace,
    { loading: creatingSpace, error: createSpaceError },
  ] = useMutation<CreateFinanceSpaceResponse, CreateFinanceSpaceVariables>(
    CREATE_FINANCE_SPACE,
    {
      refetchQueries: [{ query: FINANCE_SPACES }],
      awaitRefetchQueries: true,
    },
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName || creatingSpace) return;

    try {
      await createFinanceSpace({
        variables: {
          input: {
            name: trimmedName,
          },
        },
      });

      router.back();
      router.refresh();
    } catch (error) {
      console.error("Ошибка создания пространства:", error);
    }
  };

  const handleClose = () => {
    if (creatingSpace) return;
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Новое пространство</h2>

          <p className="mt-1 text-sm text-gray-500">
            Создай пространство для управления финансами.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClose}
          disabled={creatingSpace}
          aria-label="Закрыть"
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:hover:bg-white/10"
        >
          <X size={20} />
        </button>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="space-name" className="text-sm font-medium">
          Название пространства
        </label>

        <input
          id="space-name"
          autoFocus
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Например, Business"
          maxLength={50}
          disabled={creatingSpace}
          className="w-full rounded-xl border border-light-gray bg-transparent px-4 py-3 outline-none transition focus:border-[#0f7a4f] dark:border-dark-gray"
        />

        <span className="text-xs text-gray-400">{name.length}/50</span>
      </div>

      {/* Error */}
      {createSpaceError && (
        <p role="alert" className="text-sm text-red-500">
          {createSpaceError.message}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleClose}
          disabled={creatingSpace}
          className="rounded-xl border border-light-gray px-4 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-dark-gray dark:hover:bg-white/10"
        >
          Отмена
        </button>

        <button
          type="submit"
          disabled={!name.trim() || creatingSpace}
          className="rounded-xl bg-[#0f7a4f] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0c6843] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {creatingSpace ? "Создание..." : "Создать"}
        </button>
      </div>
    </form>
  );
}
