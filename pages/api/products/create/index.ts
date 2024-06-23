import { NextApiRequest, NextApiResponse } from "next";
import upload from "@/utils/multerConfig";
import { prisma } from "@/prisma/prisma";
import { getToken } from "next-auth/jwt";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface ExtendedNextApiRequest extends NextApiRequest {
  file: Express.Multer.File;
  files: { [fieldname: string]: Express.Multer.File[] };
}

const runMiddleware = (req: ExtendedNextApiRequest, res: NextApiResponse, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await runMiddleware(req, res, upload.single('image'));

  try {
    const { name, description, price, stock, categoryId } = req.body;
    const { filename } = req.file; 

    const imageUrl = `/uploads/${filename}`;

    const parsedPrice = parseInt(price, 10);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parsedPrice,
        stock: parseInt(stock, 10),
        categoryId,
        image: imageUrl, 
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
