import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/prisma";
import slug from "slug";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    slug: string;
  };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { slug: slugFromQuery } = req.query;

  try {
    const product = await prisma.product.findFirst({
      where: {
        name: slugFromQuery,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const generatedSlug = slug(product.name, { lower: true });

    if (generatedSlug !== slugFromQuery) {
      return res.status(400).json({ message: "Slug does not match product name" });
    }

    const productWithUrl = {
      ...product,
      image: product.image ? `${product.image}` : null,
      category: product.category?.name, 
    };

    return res.status(200).json(productWithUrl);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: "Failed to fetch product" });
  }
}
