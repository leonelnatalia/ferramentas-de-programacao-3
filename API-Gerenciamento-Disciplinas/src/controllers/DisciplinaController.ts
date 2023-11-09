import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Like } from "typeorm";
import Disciplina from "../models/Disciplina";
import Curso from "../models/Curso";

export default {

  async inserir(request: Request, response: Response) {
    console.log("inserir");

    console.log(request.body);
    const { nome, cursoCodigo } = request.body;

    const cursoRepository = AppDataSource.getRepository(Curso);
    const curso = await cursoRepository.findOne({
      where: {
        codigo: cursoCodigo
      }
    });

    if(curso){
      const disciplinaRepository = AppDataSource.getRepository(Disciplina);
      const disciplina = disciplinaRepository.create({
        nome,
        curso,
      });
      
      await disciplinaRepository.save(disciplina);
      return response.status(201).json(disciplina);

    }

    return response.status(404).json({ erro: "Curso não existe!!"});
  },
  
  async buscarPorNome(request: Request, response: Response) {
    console.log("buscar por nome");

    const { nome } = request.params;
    console.log(request.params);
    console.log(nome);

    const cursoRepository = AppDataSource.getRepository(Disciplina);

    const disciplinas = await cursoRepository.find({
      where: {
        nome: Like(`%${nome}%`)
      },
      relations: {
        curso: {
          nivel: true
        }
      }
    });
    console.log(disciplinas);

    const resultado = disciplinas.map( (disciplina) => {

      return {
        codigoDisciplina: disciplina.codigo,
        nomeDisciplina: disciplina.nome,
        nomeCurso: disciplina.curso.nome,
        nivelCurso: disciplina.curso.nivel.nome
      }

    })

    return response.json(resultado);
  }
};
