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

    const {name, value} = body;

    if(!userId){
      return new NextResponse('Não Autenticado!', {status: 401});
    }

    if(!name){
      return new NextResponse('Uma cor é necessário!', {status: 400});
    }

    if(!value){
      return new NextResponse('Uma descrição de cor é necessária!', {status: 400});
    }

    if(!params.storeId){
      return new NextResponse('Uma ID da cor é necessária!', {status: 400});  
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


    const color = await prismadb.color.create({
      data:{
        name,
        value,
        storeId: params.storeId
      }
    });

    return NextResponse.json(color);

  }catch(err){
    console.log('[COLORS_POST]', err);
    return new NextResponse('Internal Error', {status: 500});
  }
}

export async function GET(
  req: Request,
  {params}:{params:{storeId: string}}
){
  try{
    if(!params.storeId){
      return new NextResponse('Uma ID da cor é necessária!', {status: 400});  
    }

    const colors = await prismadb.color.findMany({
      where:{
        storeId: params.storeId,
      }
    });

    return NextResponse.json(colors);

  }catch(err){
    console.log('[COLORS_GET]', err);
    return new NextResponse('Internal Error', {status: 500});
  }
}