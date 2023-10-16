import { Router } from "express";
import { StudentsController } from "../controllers";
import { CheckIdFormate, Login, ValidateStudentData } from "../middlewares";
import { Auth } from "../middlewares/auth.middleware";
export const studentsRoutes = () => {
  const router = Router();

  const controller = new StudentsController();
  const validateStudent = new ValidateStudentData();
  const validateId = new CheckIdFormate();
  const login = new Login();
  const auth = new Auth();

  // cadastrar
  router.post("/", [validateStudent.validateData], controller.register);

  // logar
  router.post("/login", [login.checkLogin], controller.login);

  // listar pelo id
  router.get("/:id", [auth.checkAuth, validateId.check], controller.listById);

  // listar todos
  router.get("/", [auth.checkAuth], controller.listAll);

  //editar
  router.put("/:id", [auth.checkAuth, validateId.check], controller.update);

  // deletar
  router.delete("/:id", [auth.checkAuth, validateId.check], controller.delete);

  return router;
};
