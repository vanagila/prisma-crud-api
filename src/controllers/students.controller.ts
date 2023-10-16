//controller so possui metodos e nao propriedades
import { Request, Response } from "express";
import { StudentService } from "../services/";

export class StudentsController {
  public async register(req: Request, res: Response) {
    const { fullName, email, password, age } = req.body;

    const service = new StudentService();

    const emailAlreadyUsed = await service.checkEmail(email);

    if (emailAlreadyUsed) {
      return res.status(400).json({
        ok: false,
        message: "E-mail já cadastrado",
      });
    }

    const newStudent = await service.registerStudent({
      fullName: fullName,
      email: email,
      password: password,
      age: age,
    });

    return res.status(201).json({
      ok: true,
      message: "Aluno cadastrado com sucesso",
      data: newStudent.toJson(),
    });
  }

  public async listAll(req: Request, res: Response) {
    const service = new StudentService();

    const studentsDB = await service.listAllStudents();

    return res.status(200).json({
      ok: true,
      message: "Alunos listados com sucesso",
      data: studentsDB,
    });
  }

  public async listById(req: Request, res: Response) {
    const { id } = req.params;

    const service = new StudentService();

    const studentDB = await service.listStudentById(id);

    if (!studentDB) {
      return res.status(404).json({
        ok: false,
        message: "Aluno não encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Aluno encontrado",
      data: studentDB.toJson(),
    });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const service = new StudentService();

    const deletedStudent = await service.deleteStudent(id);

    return res.status(200).json({
      ok: true,
      message: "Aluno excluido",
      data: deletedStudent.toJson(),
    });
  }

  public async update(req: Request, res: Response) {
    const { fullName, age, password } = req.body;
    const { id } = req.params;

    const service = new StudentService();
    const studentUpdated = await service.updateStudent({
      id,
      fullName,
      age,
      password,
    });

    return res.status(200).json({
      ok: true,
      message: "Aluno atualizado",
      data: studentUpdated.toJson(),
    });
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const service = new StudentService();

    const token = await service.login({
      email: email,
      password: password,
    });

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "Credenciais invalidas",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Login efetuado",
      data: { token },
    });
  }
}
