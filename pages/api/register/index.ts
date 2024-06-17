import { prisma } from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import * as argon2 from "argon2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await argon2.hash(password);

  const emailExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const emailAdmin = process.env.EMAIL_ADMIN;

  let role = emailAdmin === email ? "ADMIN" : ("USER" as "ADMIN" | "USER");

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
