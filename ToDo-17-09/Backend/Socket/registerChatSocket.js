import ChatController from "../Controllers/ChatController.js";
export default function registerChatSocket(io, socket) {
    //entrar em uma sala específica (de uma tarefa)pessoas que estão fznd a mesma tarefa e desejam coversar 
    socket.on("join_task", (tarefaId) => {
        socket.join(`tarefa_${tarefaId}`),
        console.log('socket ${socket.id} entrou no chat da tarefinha_${tarefaId}');
    });

    //enviar mensagem
    socket.on("sendMessage", async (data) => {
        ChatController.sendMessage(io, socket, data);
    });

    //sair do chat/sala
    socket.on("Leave_task", (tarefaId) => {
        socket.leave(`tarefa_${tarefaId}`);
        console.log(`socket ${socket.id} saiu do chat da tarefinha_${tarefaId}`);
    });
}