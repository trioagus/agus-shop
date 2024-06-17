import { prisma } from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    if(req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}