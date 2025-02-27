"use client"

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";
import { Prisma, Product, Restaurant } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


interface ProductDetailtProps {
    product: Prisma.ProductGetPayload<{
        include: {restaurant: {select: {avatarImageUrl: true; name: true } }}
    }>;
}

const ProductDetailt = ( { product }: ProductDetailtProps) => {
    const [quantity, setQuantity] = useState <number> (1);
    const handleDecreaseQuantity = () => { 
        setQuantity((prev) => {
            if (prev > 1) {
                return prev - 1;
            }
            return prev;
        });
    };
    const handleIncreaseQuantity = () => { 
        setQuantity((prev) => prev +1);
    };
    return ( 
        <div className="h-screen flex flex-col ">
            <div className="flex-1 flex flex-col min-h-0 p-5">
                   <div className="flex item-center gap-1.5">
                    <Image src= {product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full"/>
                    <p className="text-xs text-muted-foreground">
                        {product.restaurant.name}
                    </p>
            </div>
            <h2 className="text-xl font-semibold mt-1">
                    {product.name}
            </h2>
            <div className="flex item-center justify-between">
                <h3 className="text-xl font-semibold">
                    {formatCurrency(product.price)}
                </h3>
                <div className="flex items-center gap-3 text-center">
                    <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}>
                        <ChevronLeftIcon/>
                    </Button>
                    <p className="w-4">{quantity}</p>
                    <Button variant="destructive" className="h-8 w-8 rounded-xl " onClick={handleIncreaseQuantity}>
                        <ChevronRightIcon/>
                    </Button>
                </div>                
            </div>

            <div className=" flex-1 overflow-auto mt-4">
                <ScrollArea className="h-full">
                <div className="mt-6 space-y-3">
                    <h4 className="font-semibold">Sobre</h4>
                    <p className=" text-sm text-muted-foreground">{product.description}</p>                                            
                </div>

                <div className="mt-6 space-y-3">
                    <div className=" 5 flex items-center gap-1">
                    <ChefHatIcon size={18}/>
                    <h4 className="font-semibold">Ingredientes</h4>
                </div>
                    <p className=" text-sm text-muted-foreground">{product.description}</p>                                   

                </div>     
                </ScrollArea>   
            </div>    
            </div>
            
            <div className="sticky bottom-0 left-0 w-full p-5">
                <Button className="rounded-full w-full">Adicionar à sacola</Button>
            </div>                     

        </div>
     );
}
 
export default ProductDetailt;