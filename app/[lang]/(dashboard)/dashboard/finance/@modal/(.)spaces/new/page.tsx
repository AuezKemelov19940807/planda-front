"use client";

import NewSpaceForm from "@/components/dashboard/finance/new-space-form";
import MainModal from "@/components/ui/main-modal";
import { useRouter } from "next/navigation";

export default function NewSpacePage() {
  const router = useRouter();
  return (
    <MainModal open onClose={() => router.back()} maxWidth="max-w-lg">
      <NewSpaceForm />
    </MainModal>
  );
}
