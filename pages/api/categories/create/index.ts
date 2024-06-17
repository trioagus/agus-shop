import { prisma } from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { name } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(200).json(category);
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
