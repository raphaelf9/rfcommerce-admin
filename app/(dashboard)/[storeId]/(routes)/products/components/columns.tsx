"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type ProductColumn = {
  id: string;
  name: string;
  price: String;
  size: String;
  category: String;
  color: String;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "isArchived",
    header: "Arquivado",
  },
  {
    accessorKey: "isFeatured",
    header: "Aparece na loja",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "size",
    header: "Tamanho",
  },
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="h-6 w-6 rounded-full border "
          style={
            {
              //@ts-ignore 
              backgroundColor: row.original.color
            }} />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Data",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
