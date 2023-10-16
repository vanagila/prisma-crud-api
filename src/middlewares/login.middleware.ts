import { NextFunction, Request, Response } from "express";

export class Login {
  public checkLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Todos os campos devem ser preenchidos",
      });
    }
    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ message: "E-mail inválido.", ok: false });
    }
    next();
  }
}
