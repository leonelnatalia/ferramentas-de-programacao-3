import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateTableNivel1699384440621 } from "./database/migrations/1699384440621-CreateTableNivel";
import { CreateTableCurso1699384935813 } from "./database/migrations/1699384935813-CreateTableCurso";
import { CreateTableDisciplina1699385443651 } from "./database/migrations/1699385443651-CreateTableDisciplina";
import Curso from "./models/Curso";
import Nivel from "./models/Nivel";
import Disciplina from "./models/Disciplina";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "ifsp",
  database: "db_avaliacao",
  migrationsRun: true, //Executa as migrations.
  synchronize: false,
  logging: false,
  entities: [Curso, Nivel, Disciplina],
  migrations: [CreateTableNivel1699384440621, CreateTableCurso1699384935813, CreateTableDisciplina1699385443651],
  subscribers: [],
});