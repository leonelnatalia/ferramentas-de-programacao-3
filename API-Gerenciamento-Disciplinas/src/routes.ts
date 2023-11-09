import { Router } from "express";
import CursoController from "./controllers/CursoController";
import DisciplinaController from "./controllers/DisciplinaController";


const routes = Router();

routes.get("/cursos/nivel/:nivel", CursoController.buscarPorNivel);
routes.get("/cursos/nome/:nome", CursoController.buscarPorNome);
routes.delete("/cursos/:id", CursoController.excluir);


routes.get("/disciplinas/nome/:nome", DisciplinaController.buscarPorNome);
routes.get("/disciplinas", DisciplinaController.inserir);

export default routes;