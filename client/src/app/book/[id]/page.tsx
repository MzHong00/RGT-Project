import { Suspense } from "react";

import { BookDetail } from "@/containers/book/bookDetail";
import { LoadingSpinner } from "@/components/common/loadingSpinner";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<LoadingSpinner msg="책 정보 가져오는 중..." />}>
      <BookDetail id={id} />
    </Suspense>
  );
}
