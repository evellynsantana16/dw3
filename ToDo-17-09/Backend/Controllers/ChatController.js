import Mensagem from "../Models/Mensagem.js";
export default class ChatController
{
    static async getHistory(req, res)
{
    try{
const {TarefaId} = req.params; //vem por parametro, pq n temos formulario
const mensagens = await Mensagem.find({tarefa:TarefaId}).populate('remetente', 'nome email').sort({createdAt:1});
return res.status(200).json({ mensagens});
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar o histórico das mensagens.", error});
    }
}
static async sendMessage(io, socket, data){
    //usou data pq n tem formulario, vem do front e vai ser enviado para o back 
    try{
        const {TarefaId, remetente, texto} = data
        const novaMensagem = await Mensagem.create({
            tarefa:TarefaId,
            remetente: remetente,
            texto
    });

        // Popula o remetente para enviar ao cliente
        const mensagempopulada = await Mensagem.findbyid(novaMensagem._id).populate('remetente', 'nome email');
        // Emite a nova mensagem 
        io.to(`tarefa_${TarefaId}`).emit('novaMensagem', mensagempopulada);
} catch(error){
console.error("Erro ao enviar/salvar mensagem:", error);
socket.emit("chat_error", { message: "Erro ao processar mensagem.", error });//diferença de console eror e socket.emit é que o console é para o
// back e o socket é para o front, ou seja, o front vai receber a mensagem de erro


}//fim try catch

}//fim sendMessage

}//fim classe chatcontroller