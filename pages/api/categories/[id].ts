import { prisma } from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
   if (req.method !== "GET") {
       return res.status(405).json({ message: "Method not allowed" });
   }

   const { id } = req.query;

   try {
       const category = await prisma.category.findUnique({
           where: {
               id: String(id),
           },
       });
       res.status(200).json(category);
   } catch (error) {
       return res.status(500).json({ message: "Internal server error" });
   }
}