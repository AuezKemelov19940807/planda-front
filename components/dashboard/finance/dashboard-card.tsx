import { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  border?: ReactNode;
};

export default function DashboardCard({
  title,
  icon,
  children,
  action,
  border,
}: DashboardCardProps) {
  return (
    <div className="bg-white  transition shadow flex flex-col h-full dark:bg-[#0E1013] rounded-lg md:rounded-2xl max-w-xl  pt-3 pb-3">
      <div
        className={`mb-2  pb-3 ${border ? "border-b border-light-gray dark:border-dark-gray" : ""} `}
      >
        <div className="px-2 md:px-5 flex items-center justify-between">
          <h2 className="md:text-lg font-medium flex items-center gap-x-2.5 md:gap-x-5 text-center text-zinc-900 dark:text-zinc-100 ">
            <span className="w-6 h-6 md:w-12 md:h-12 border-2 relative bg-[#FFF4D0] dark:bg-black border-transparent dark:border-yellow flex items-center justify-center rounded-full">
              {icon}
            </span>
            <span>{title}</span>
          </h2>
          {action}
        </div>
      </div>
      {children}
    </div>
  );
}
