import { db } from "@/lib/prisma";

export const getRestaurantBySlug = async (slug: string) => { 
     const Restaurant = await db.restaurant.findUnique({
       where: {
         slug,
       },
     });
     return Restaurant;
}  