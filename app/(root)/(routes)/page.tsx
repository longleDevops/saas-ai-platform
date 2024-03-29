import { SearchInput } from "@/components/search-input"
import prismadb from "@/lib/prismadb"
import Categories from "@/components/categories";
import { Companions } from "@/components/companions";
interface RootPageProps {
  // searchParams: are nextjs conventions using to extract info from the search params
  searchParams: {
    categoryId: string;
    name: string;
  }
}
const RootPage = async ({
  searchParams
}: RootPageProps) => {
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: searchParams.name
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  })

  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  )
}

export default RootPage
