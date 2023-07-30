import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function GET(
  req: Request,
  {params}:{params:{colorId: string}}
){
  try{
    if(!params.colorId){
      return new NextResponse('O ID da cor é necessário', {status: 400});
    }
    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      }
    });

    return NextResponse.json(color);

  }catch(err){
    console.log('[COLOR_GET]', err);
    return new NextResponse("Falha interna", {status: 500});
  }
}

export async function PATCH(
  req: Request,
  {params}:{params:{storeId: string, colorId: string}}
){
  try{

    const {userId} = auth();
    const body = await req.json();

    const {name, value} = body;

    if(!userId){
      return new NextResponse('Não autenticado', {status:401});
    }

    if(!name){
      return new NextResponse('Uma descrição de cor é necessária!', {status: 400});
    }

    if(!value){
      return new NextResponse('Uma descrição é necessária!', {status: 400});
    }

    if(!params.colorId){
      return new NextResponse('O ID da cor é necessário', {status: 400});
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

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId
      },
      data:{
        name,
        value
      }
    });

    return NextResponse.json(color);

  }catch(err){
    console.log('[COLOR_PATCH]', err);
    return new NextResponse("Falha interna", {status: 500});
  }
};


export async function DELETE(
  req: Request,
  {params}:{params:{storeId: string, colorId: string}}
){
  try{

    const {userId} = auth();
      if(!userId){
      return new NextResponse('Não autenticado', {status:401});
    }

    if(!params.colorId){
      return new NextResponse('O ID da cor é necessário', {status: 400});
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

    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      }
    });

    return NextResponse.json(color);

  }catch(err){
    console.log('[COLOR_DELETE]', err);
    return new NextResponse("Falha interna", {status: 500});
  }
}