import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductHeader from "./components/product-header";
import ProductDetailt from "./components/product-details";

interface ProductsPageProps {
    params: Promise<{ slug: string; productsId: string }>;
}       


const ProductsPage = async ({params}: ProductsPageProps) => {
    const {slug, productsId} = await params;
    const product = await db.product.findUnique({
        where: {
            id: productsId
        },
        include: {restaurant: {
            select: {name: true, avatarImageUrl: true, slug: true}
        }}
    });

    if(!product) { 
        return notFound();
    }
    if(product.restaurant.slug.toUpperCase !== slug.toUpperCase) {
        return notFound();
    };
    return ( 
    <div>
     <ProductHeader product={product} />
     <ProductDetailt product={product}></ProductDetailt>
    
    </div>
    );
};

export default ProductsPage;