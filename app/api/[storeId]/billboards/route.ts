import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {params}:{params:{storeId: string}}
){
  try{

    const {userId} = auth();
    const body = await req.json();

    const {label, imageUrl} = body;

    if(!userId){
      return new NextResponse('Não Autenticado!', {status: 401});
    }

    if(!label){
      return new NextResponse('Uma descrição é necessária!', {status: 400});
    }

    if(!imageUrl){
      return new NextResponse('Uma URL de imagem é necessária!', {status: 400});
    }

    if(!params.storeId){
      return new NextResponse('Uma ID da loja é necessária!', {status: 400});  
    }

    const storeByUserId = await prismadb.store.findFirst({
      where:{
        id: params.storeId,
        userId
      }
    });

    if(!storeByUserId){
      return new NextResponse("Não autorizado!", {status: 403});
    }


    const billboard = await prismadb.billboard.create({
      data:{
        label,
        imageUrl,
        storeId: params.storeId
      }
    });

    return NextResponse.json(billboard);

  }catch(err){
    console.log('[BILLBOARDS_POST]', err);
    return new NextResponse('Internal Error', {status: 500});
  }
}

export async function GET(
  req: Request,
  {params}:{params:{storeId: string}}
){
  try{
    if(!params.storeId){
      return new NextResponse('Uma ID da loja é necessária!', {status: 400});  
    }

    const billboards = await prismadb.billboard.findMany({
      where:{
        storeId: params.storeId,
      }
    });

    return NextResponse.json(billboards);

  }catch(err){
    console.log('[BILLBOARDS_GET]', err);
    return new NextResponse('Internal Error', {status: 500});
  }
}