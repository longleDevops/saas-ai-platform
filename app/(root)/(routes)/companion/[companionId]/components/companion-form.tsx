"use client"

import { Category, Companion } from "@prisma/client"

interface CompanionFormProps{
  initialData: Companion | null
  categories: Category[]
}

const CompanionForm = ({initialData,categories}:CompanionFormProps) => {
  return (
    <div>
      companion-form
    </div>
  )
}

export default CompanionForm