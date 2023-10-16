import { NextFunction, Request, Response } from "express";

export class ValidateStudentData {
  public validateData(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos.", ok: false });
    }

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ message: "E-mail inválido.", ok: false });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Senha deve ter 6 caracteres ou mais",
        ok: false,
      });
    }

    return next();
  }
}
