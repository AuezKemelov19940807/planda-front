import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { FinanceSpaceType } from "@/graphql/types/financeSpaces";
import { useFinanceSpace } from "@/lib/contexts/finance-space-context";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import router from "next/router";

interface SpaceItemProps {
  spaceItem: FinanceSpaceType;
}

export default function FinanceSpaceItem({ spaceItem }: SpaceItemProps) {
  const { selectedSpace, setSelectedSpace } = useFinanceSpace();
  const activeSpaceID = selectedSpace?.id === spaceItem.id;

  return (
    <div
      onClick={() => setSelectedSpace(spaceItem)}
      className={`
    group cursor-pointer inline-flex items-center gap-x-2.5
    rounded-lg py-2.5 pl-4 pr-2.5
    transition-all duration-200
    ${
      activeSpaceID
        ? "bg-[#0F7A4F] text-white shadow-sm"
        : "bg-white text-gray-700 hover:bg-[#EAF3EE]"
    }
  `}
    >
      <button type="button" key={spaceItem.id} className="cursor-pointer">
        <span>{spaceItem.name}</span>
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md outline-none transition-colors "
          onClick={(e) => e.stopPropagation()}
        >
          <EllipsisVertical className="" size={18} />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/finance/${spaceItem.slug}/settings`)
            }
          >
            <Pencil className="mr-2 h-4 w-4" />
            Редактировать
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => console.log("Удаление:", spaceItem.id)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
