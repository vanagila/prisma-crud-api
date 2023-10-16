import { Address as AddressDB, Student as StudentDB } from "@prisma/client";
import { randomUUID } from "crypto";
import { repository } from "../database/prisma.connection";
import { LoginDTO, RegisterStudentDTO, UpdateStudentDTO } from "../dtos";
import { Address, Student } from "../models";

export class StudentService {
  public async listAllStudents(): Promise<Student[]> {
    const studentsDB = await repository.student.findMany({
      orderBy: { fullName: "desc" },
      include: { address: true },
    });

    return studentsDB.map((student) => this.mapToModel(student));
  }

  public async checkEmail(email: string): Promise<boolean> {
    const emailAlreadyUsed = await repository.student.findUnique({
      where: { email: email },
    });

    return !!emailAlreadyUsed;
  }

  public async registerStudent(data: RegisterStudentDTO) {
    const studentDB = await repository.student.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        age: data.age,
      },
    });

    return this.mapToModel(studentDB);
  }

  public async listStudentById(id: string): Promise<Student | undefined> {
    const studentDB = await repository.student.findUnique({
      where: {
        id: id,
      },
    });

    if (!studentDB) return undefined;

    return this.mapToModel({ ...studentDB, address: null });
  }

  public async deleteStudent(id: string): Promise<Student> {
    const studentToDelete = await repository.student.delete({
      where: {
        id: id,
      },
      include: { address: true },
    });

    return this.mapToModel(studentToDelete);
  }

  public async updateStudent(data: UpdateStudentDTO): Promise<Student> {
    const studentUpdated = await repository.student.update({
      where: { id: data.id },
      data: {
        fullName: data.fullName,
        age: data.age,
        password: data.password,
      },
      include: { address: true },
    });

    return this.mapToModel(studentUpdated);
  }

  public async login(data: LoginDTO): Promise<string | null> {
    const studentFound = await repository.student.findUnique({
      where: { email: data.email, password: data.password },
    });

    if (!studentFound) return null;

    const token = randomUUID();

    await repository.student.update({
      where: { id: studentFound.id },
      data: { authToken: token },
    });

    return token;
  }

  public async validateToken(token: string): Promise<boolean> {
    const studentFound = await repository.student.findFirst({
      where: { authToken: token },
    });

    return !!studentFound;
  }

  // trasforma a instancia em um  model no BDD
  private mapToModel(
    studentDB: StudentDB & { address?: AddressDB | null }
  ): Student {
    const address = studentDB?.address
      ? new Address(
          studentDB.address.id,
          studentDB.address.cep,
          studentDB.address.city,
          studentDB.address.neighborhood,
          studentDB.address.uf,
          studentDB.address.number,
          studentDB.address.complement ?? undefined
        )
      : undefined;

    return new Student(
      studentDB.id,
      studentDB.fullName,
      studentDB.email,
      studentDB.password,
      studentDB.age ?? undefined,
      address
    );
  }
}
