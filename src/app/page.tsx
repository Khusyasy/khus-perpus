import { Card, Typography } from '@/material-tailwind';
import NavbarDefault from './NavbarDefault';
import prisma from '@/db';
import BookCard from '@/components/BookCard';
import BooksContainer from '@/components/BooksContainer';

export default async function Home() {
  const newestBooks = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8,
  });
  const recommendedBooks = await prisma.book.findMany({
    orderBy: {
      Rating: {
        _count: 'desc',
      },
    },
    take: 8,
  });

  return (
    <div className="p-4 flex flex-col justify-center items-center bg-light-green-300">
      <NavbarDefault />
      <Card className="h-full w-full overflow-scroll mt-4 p-4 max-w-screen-xl bg-light-green-100">
        <Typography variant="h4" color="blue-gray">
          Brand New
        </Typography>
        <BooksContainer books={newestBooks} />
      </Card>
      <Card className="h-full w-full overflow-scroll mt-4 p-4 max-w-screen-xl bg-light-green-100">
        <Typography variant="h4" color="blue-gray">
          Recommended
        </Typography>
        <BooksContainer books={recommendedBooks} />
      </Card>
    </div>
  );
}
