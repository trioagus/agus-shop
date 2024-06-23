import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/prisma";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    page?: string;
    limit?: string;
    search?: string;
  };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { page = "1", limit = "10", search = "" } = req.query;
      const offset = (parseInt(page) - 1) * parseInt(limit);

      let where = {};
      if (search) {
        where = {
          name: {
            contains: search,
          },
        };
      }

      const totalProducts = await prisma.product.count({ where });
      const products = await prisma.product.findMany({
        where,
        include: { category: true },
        skip: offset,
        take: parseInt(limit),
      });

      const productsWithUrl = products.map((product) => {
        return {
          ...product,
          image: product.image ? `${product.image}` : null,
          category: product.category?.name,
        };
      });

      res.setHeader("X-Total-Count", totalProducts.toString());
      res.status(200).json(productsWithUrl);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
