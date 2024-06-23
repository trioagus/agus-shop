import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import upload from "@/utils/multerConfig";
import { prisma } from "@/prisma/prisma";
import fs from "fs";
import path from "path";

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
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.query;

  await runMiddleware(req, res, upload.single("image"));

  try {
    const { name, description, price, stock, categoryId } = req.body;
    let image = "";

    const existingProduct = await prisma.product.findUnique({
      where: { id: String(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Hapus gambar lama jika ada gambar baru
    if (req.file) {
      if (existingProduct.image) {
        const oldImagePath = path.join(process.cwd(), "public", existingProduct.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Failed to delete old image:", err);
          }
        });
      }
      image = `/uploads/${req.file.filename}`; // Simpan path gambar baru
    } else {
      image = existingProduct.image as string; // Pertahankan path gambar lama jika tidak ada gambar baru
    }

    const parsedPrice = parseInt(price, 10);

    const updatedProduct = await prisma.product.update({
      where: { id: String(id) },
      data: {
        name,
        description,
        price: parsedPrice,
        stock: parseInt(stock, 10),
        categoryId,
        image, // Simpan path gambar baru atau lama
      },
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
