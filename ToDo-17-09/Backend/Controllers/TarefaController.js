import { create } from "domain";
import Tarefa from "../Models/Tarefa.js";
import {Types} from "mongoose";
export default class TarefaController{
    static async Create(req, res){
        const{titulo, descricao, dataLimite, situacao, participam} = req.body;
        const UsuarioLogado  = req.user._id;
        if(!titulo || !descricao || !dataLimite || !situacao)
        {
            return res.status(422).json({message: "Todos os dados são obrigatórios"});
        }
        try {
            const tarefa = new Tarefa({
                titulo,
                descricao,
                dataLimite,
                situacao,
                criadoPor: UsuarioLogado,
                participam: Array.isArray(participam) ? participam.map(id => Types.ObjectId(id)) : [],

            });
            const novaTarefa = await tarefa.save();
            const tarefaPopulada = await Tarefa.findById(novaTarefa._id).populate('criadoPor', 'nome email').populate('participam', 'nome email');
            
            res.status(200).json({message:"Tarefa inserida com sucesso", novaTarefa});
            return;
        } catch (error) {
            return res.status(500).json({message:"Problema ao inserir uma tarefa", error});
        }
    }//fim create
    static async getAll(req, res){
        try {
            const tarefas = await Tarefa.find({
                $or: [
                    { criadoPor: req.user._id },
                    { participam: req.user._id }
                ]
            })

            .populate('criadoPor', 'nome')
            .populate('participam', 'nome')
            .sort({createdAt: -1}); // Ordena por data de criação, do mais recente para o mais antigo

            return res.status(200).json({message:"Buscar tarefas com sucesso", tarefas});
        } catch (error) {
            return res.status(500).json({message:"Erro ao buscar todas tarefas", error});
        }

    }//fim getAll
}