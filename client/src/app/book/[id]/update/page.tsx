import { BookServices } from "@/services/book/bookServices";
import { UpdateBookForm } from "@/components/features/book/update/updateBookForm";

export default async function CreateBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const book = await BookServices.readBook(id);

  return (
    <div>
      <UpdateBookForm book={book} />
    </div>
  );
}
