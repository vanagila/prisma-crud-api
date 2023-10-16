import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services";

export class Auth {
  public async checkAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "Token obrigatorio",
      });
    }

    const service = new StudentService();
    const validToken = await service.validateToken(token);

    if (!validToken) {
      return res.status(401).json({
        ok: false,
        message: "Token invalido",
      });
    }

    return next();
  }
}
