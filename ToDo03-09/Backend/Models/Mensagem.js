import mongoose from "../db/conn.js";
const {Schema} = mongoose;
const MensagemSchema = new Schema({
    tarefa:{
        type: Schema.Types.ObjectId,
        ref: 'Tarefa',
        required: true,
    },
    remetente:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    texto:{
        type:String,
        required:true,
        trim: true
    },
    lidaPor:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    }

    
},{timestamps:true});
const Mensagem = mongoose.model('Mensagem', MensagemSchema);
export default Mensagem;