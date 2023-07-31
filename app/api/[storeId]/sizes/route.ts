import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {params}:{params:{sizeId: string, }}
){
  try{

    const {userId} = auth();
    const body = await req.json();

    const {name, value} = body;

    if(!userId){
      return new NextResponse('Não Autenticado!', {status: 401});
    }

    if(!name){
      return new NextResponse('Um tamanho é necessário!', {status: 400});
    }

    if(!value){
      return new NextResponse('Uma descrição é necessária!', {status: 400});
    }

    if(!params.sizeId){
      return new NextResponse('Uma ID do tamanho é necessária!', {status: 400});  
    }

    const storeByUserId = await prismadb.store.findFirst({
      where:{
        id: params.sizeId,
        userId
      }
    });

    if(!storeByUserId){
      return new NextResponse("Não autorizado!", {status: 403});
    }


    const size = await prismadb.size.create({
      data:{
        name,
        value,
        storeId: params.sizeId
      }
    });

    return NextResponse.json(size);

  }catch(err){
    console.log('[SIZE_POST]', err);
    return new NextResponse('Internal Error', {status: 500});
  }
}

export async function GET(
  req: Request,
  {params}:{params:{sizeId: string}}
){
  try{
    if(!params.sizeId){
      return new NextResponse('Uma ID de tamanho é necessária!', {status: 400});  
    }

    const size = await prismadb.size.findMany({
      where:{
        storeId: params.sizeId,
      }
    });

    return NextResponse.json(size);

  }catch(err){
    console.log('[SIZES_GET]', err);
    return new NextResponse('Internal Error', {status: 500});
  }
}