import { Link } from "@/i18n/navigation";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex gap-x-2.5 pb-10 items-center">
        <span className="w-9 h-9 rounded-lg bg-[#0f7a4f] flex items-center justify-center font-bold text-lg ">
          P
        </span>
        <span className="text-2xl font-extrabold">PlanDa</span>
      </div>
    </Link>
  );
}
