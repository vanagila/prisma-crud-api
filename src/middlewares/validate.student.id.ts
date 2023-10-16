import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services";

export class CheckIdFormate {
  public async check(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (id.length !== 36) {
      return res.status(400).json({
        ok: false,
        message: "ID invalido",
      });
    }

    const service = new StudentService();

    const studentFound = await service.listStudentById(id);

    if (!studentFound) {
      return res.status(400).json({
        ok: false,
        message: "Aluno nao encontrado",
      });
    }

    return next();
  }
}
