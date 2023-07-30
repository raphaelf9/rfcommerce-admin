import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import parse from 'date-fns/parse';
import prismadb from "@/lib/prismadb";
import { ColorsClient } from "./components/client";
import { ColorColumn } from "./components/columns";


const ColorsPage = async ({
  params
}: {
  params: {
    colorId: string;
  }
}) => {

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.colorId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, `dd/MM/yyyy`, { locale: ptBR })
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4  p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
}

export default ColorsPage;