import { BackButton } from "@/components/common/backButton";
import { BookServices } from "@/services/book/bookServices";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;

  const book = await BookServices.readBook(id);

  return {
    title: `책 - ${book.title} | ${book.author}`,
  };
}

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav>
        <BackButton>목록으로</BackButton>
      </nav>
      {children}
    </>
  );
}
