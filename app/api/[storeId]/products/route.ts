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

    const {name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived} = body;

    if(!userId){
      return new NextResponse('Não Autenticado!', {status: 401});
    }

    if(!name){
      return new NextResponse('Uma descrição é necessária!', {status: 400});
    }

    if(!images || !images.length){
      return new NextResponse('Uma imagem é necessária!', {status: 400});
    }

    if(!price){
      return new NextResponse('Um preço é necessário!', {status: 400});
    }

    if(!categoryId){
      return new NextResponse('Um Id de categoria é necessário!', {status: 400});
    }

    if(!sizeId){
      return new NextResponse('Um Id de tamanho é necessário!', {status: 400});
    }

    if(!colorId){
      return new NextResponse('Um Id de cor é necessário!', {status: 400});
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


    const product = await prismadb.product.create({
      data:{
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images:{
          createMany:{
            data:[
              ...images.map((image:{url:string})=>image)
            ]
          }
        }
      }
    });

    return NextResponse.json(product);

  }catch(err){
    console.log('[PRODUCTS_POST]', err);
    return new NextResponse('Internal Error', {status: 500});
  }
}

export async function GET(
  req: Request,
  {params}:{params:{storeId: string}}
){
  try{
    
    const {searchParams} = new URL(req.url);
    const categoryId = searchParams.get("categoryId") ||   undefined;
    const colorId = searchParams.get("colorId") ||   undefined;
    const sizeId = searchParams.get("sizeId") ||   undefined;
    const isFeatured = searchParams.get("isFeaturedId");

    if(!params.storeId){
      return new NextResponse('Uma ID da loja é necessária!', {status: 400});  
    }

    const products = await prismadb.product.findMany({
      where:{
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isArchived: false,
        isFeatured : isFeatured ? true : undefined
      },
      include:{
        images: true,
        category: true,
        color: true,
        size: true
      },
      orderBy:{
        createdAt: "desc"
      }
    });

    return NextResponse.json(products);

  }catch(err){
    console.log('[PRODUCTS_GET]', err);
    return new NextResponse('Internal Error', {status: 500});
  }
}