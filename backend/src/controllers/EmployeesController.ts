import prisma from "../prisma";
import { Request, Response } from "express";


interface IEmployee {
  id: number,
  name:string,
  surname:string,
  img:string | null,
  role: string;
  task: string;
}

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const emp = await prisma.employee.findMany({
        include: {
            user: true
        }
    });

    if (!emp) {
      return res.status(404).send("Prodotti non trovati");
    }

    let result:IEmployee[]=[];
    emp.map((e)=>{
        result.push({id: e.id,name: e.user.name,surname:e.user.surname,role: e.role,task: e.task,img:e.user.imgProfile});
    })
    
    res.json(result);
  } catch (error) {
    const stringaDettaglio = error instanceof Error ? error.message : String(error);
    console.error("Errore API Prodotti:", error);
    res.status(500).send(stringaDettaglio);
  }
};
