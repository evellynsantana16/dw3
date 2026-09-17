import {Router} from "express";
import TarefaController from "../Controllers/TarefaController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js";

const routesTarefa = new Router();

routesTarefa.post("/create", UserMiddleware, TarefaController.Create);//o middle fica entre a rota e o controller, 
// para que ele seja executado antes do controller. Se o middleware não chamar next(), o controller não será executado.
routesTarefa.get("/getAll", UserMiddleware, TarefaController.getAll);

export default routesTarefa;