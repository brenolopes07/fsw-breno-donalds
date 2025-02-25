import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductHeader from "./components/product-header";

interface ProductsPageProps {
    params: Promise<{ slug: string; productsId: string }>;
}       


const ProductsPage = async ({params}: ProductsPageProps) => {
    const {slug, productsId} = await params;
    const product = await db.product.findUnique({
        where: {
            id: productsId
        }
    });

    if(!product) { 
        return notFound();
    }
    return ( 
    <div>
     <ProductHeader product={product} />
    
    
    <h1>Products Page</h1>
        {slug}
        {productsId}
    </div>
    );
};

export default ProductsPage;