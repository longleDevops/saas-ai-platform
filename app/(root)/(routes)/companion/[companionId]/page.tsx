import prismadb from "@/lib/prismadb"
import CompanionForm from "./components/companion-form"
import { auth, redirectToSignIn } from "@clerk/nextjs"

interface CompanionIdPageProps {
  params: {
    companionId: string
  }
}

{/*This is the main page for companion form, it fetches the data in server-side then pass the props to the client side component*/ }

const page = async ({ params }: CompanionIdPageProps) => {
  //TODO: Check subscription

  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId
    }
  })

  const categories = await prismadb.category.findMany()

  return (
    <CompanionForm
      initialData={companion}
      categories={categories}
    />
  )
}

export default page