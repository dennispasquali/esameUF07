import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerNewUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (
      !body ||
      !body.email ||
      !body.password ||
      !body.name ||
      !body.surname ||
      !body.prefix ||
      !body.telephoneNumber ||
      !body.country ||
      !body.cap ||
      !body.city ||
      !body.street ||
      !body.civic
    ) {
      return res.status(400).send("Dati obbligatori mancanti");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        pwd: hashedPassword,
        name: body.name,
        surname: body.surname,
        customers: {
          create: {
            phonePrefix: body.prefix,
            phoneNumber: body.telephoneNumber,
            street: body.street,
            civic: body.civic,
            city: {
              connectOrCreate: {
                where: {
                  name_cap: {
                    name: body.city,
                    cap: body.cap,
                  },
                },
                create: {
                  name: body.city,
                  cap: body.cap,
                  nation: {
                    connectOrCreate: {
                      where: { name: body.country },
                      create: { name: body.country },
                    },
                  },
                },
              },
            },
          },
        },
      },
      include: {
        customers: true,
      },
    });

    const token = jwt.sign(
      { id: newUser.id.toString(), email: newUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" },
    );

    const { pwd, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      message: "Registrazione completata",
      token: token,
      user: userWithoutPassword,
    });
  } catch (error: any) {
    const stringaDettaglio =
      error instanceof Error ? error.message : String(error);
    res.status(500).send("Errore interno: " + stringaDettaglio);
  }
};
