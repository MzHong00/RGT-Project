import { CreateBookForm } from "@/components/features/book/create/createBookForm";

export const metadata = {
  title: "책 생성",
};

export default function CreateBookPage() {
  return (
    <div>
      <CreateBookForm />
    </div>
  );
}
