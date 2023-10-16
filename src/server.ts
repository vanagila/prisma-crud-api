import cors from "cors";
import "dotenv/config";
import express from "express";
import { studentsRoutes } from "./routes";

const app = express();

//middllewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/students", studentsRoutes());

app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
);

app.get("/", (_, res) => res.status(200).json({ ok: true }));
