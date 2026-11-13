import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Settings({ params }: Props) {
  const { slug } = await params;
  return (
    <div>
      <Link className="flex items-center gap-x-2.5" href={"/dashboard/finance"}>
        <ArrowLeft />
        <span>Настройки финансов</span>
      </Link>
      <span>
        <span className="py-1.5 px-4 text-white bg-[#3A926F] rounded-full">
          {slug}
        </span>
      </span>
    </div>
  );
}
