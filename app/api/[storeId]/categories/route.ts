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

    const {name, billboardId} = body;

    if(!userId){
      return new NextResponse('Não Autenticado!', {status: 401});
    }

    if(!name){
      return new NextResponse('Um nome é necessário!', {status: 400});
    }

    if(!billboardId){
      return new NextResponse('Uma ID de painél é necessária!', {status: 400});
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


    const category = await prismadb.category.create({
      data:{
        name,
        billboardId,
        storeId: params.storeId
      }
    });

    return NextResponse.json(category);

  }catch(err){
    console.log('[CATEGORIES,POST]', err);
    return new NextResponse('Falha Interna', {status: 500});
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

    const categories = await prismadb.category.findMany({
      where:{
        storeId: params.storeId,
      }
    });

    return NextResponse.json(categories);

  }catch(err){
    console.log('[CATEGORIES_GET]', err);
    return new NextResponse('Internal Error', {status: 500});
  }
}