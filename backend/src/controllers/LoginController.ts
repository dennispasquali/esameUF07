import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
    try {
        const body = req.body;

        if (!body || !body.email || !body.password) {
            return res.status(400).send('Dati obbligatori mancanti');
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.findUnique({
             where: { email: body.email },
        });

        if(!user) {
            return res.status(401).send('email o pwd non corretti');
        }
        const isPasswordValid = await bcrypt.compare(body.password, user.pwd);

        if(!isPasswordValid) {
            return res.status(401).send('email o pwd non corretti');
        }

        const token = jwt.sign(
            { id: user.id.toString(), email: user.email }, 
            process.env.JWT_SECRET!, 
            { expiresIn: '24h' }
        );

        const { pwd, ...userWithoutPassword } = user;

        // Status 201 = Created
        return res.status(201).json({
            message: "Login completato",
            token: token,
            user: userWithoutPassword
        });


    } catch(error: any) {
        const stringaDettaglio = error instanceof Error ? error.message : String(error);
        res.status(500).send("Errore interno: " + stringaDettaglio);
    }
}

