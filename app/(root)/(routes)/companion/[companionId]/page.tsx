import prismadb from "@/lib/prismadb"

interface CompanionIdPageProps{
  params:{
    companionId:string
  }
}

const page = async ({params}:CompanionIdPageProps) => {
  //TODO: Check subscription

  const companion = await prismadb.companion.findUnique({
    where:{
      id:params.companionId
    }
  })

  const categories = await prismadb.category.findMany()

  return (
    <div>hello companion</div>
  )
}

export default page