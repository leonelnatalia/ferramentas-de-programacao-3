import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Curso from "../models/Curso";
import { Like } from "typeorm";

export default {
  async excluir(request: Request, response: Response) {
    console.log("buscar por excluir por codigo do curso");

    const { id } = request.params;
    console.log(request.params);
    console.log(id);

    const cursoRepository = AppDataSource.getRepository(Curso);

    const curso = await cursoRepository.findOne({
      where: {
        codigo: +id,
      },
      relations: ["disciplinas"]
    });
    console.log(curso);

    if(curso){
      if(curso.disciplinas.length == 0){
        await cursoRepository.remove(curso);

      } else{
        return response.status(406).json({erro: "Curso não pode ser excluído!"});
      }
    } else{
      return response.status(404).json({erro: "Curso não encontrado!"});
    }

    return response.status(204).json(curso);
  },

  async buscarPorNivel(request: Request, response: Response) {
    console.log("buscar por nível");

    const { nivel } = request.params;
    console.log(request.params);
    console.log(nivel);

    const cursoRepository = AppDataSource.getRepository(Curso);

    const cursos = await cursoRepository.find({
      where: {
        nivel: {
          codigo: +nivel,
        },
      },
      relations: ["nivel"]
    });
    console.log(cursos);

    return response.json(cursos);
  },

  async buscarPorNome(request: Request, response: Response) {
    console.log("buscar por nome");

    const { nome } = request.params;
    console.log(request.params);
    console.log(nome);

    const cursoRepository = AppDataSource.getRepository(Curso);

    const cursos = await cursoRepository.find({
      where: {
        nome: Like(`%${nome}%`)
      },
      relations: ["nivel", "disciplinas"]
    });
    console.log(cursos);

    return response.json(cursos);
  }
};
