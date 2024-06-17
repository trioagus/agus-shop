import { prisma } from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.query;
  try {
    const category = await prisma.category.update({
      where: {
        id: String(id),
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
