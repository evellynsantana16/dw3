import {useState, useEffect, useRef} from "react";
//Função traqtar as conversões data falada
function interpretarDataVoz(texto){
    const fala = texto.toLowerCase().trim();
    const hoje = new Date();
    if (fala.includes("Hoje"))
    {
        return hoje.toISOString().split("T")[0];
       
    }
     if(fala.includes("Amanhã") || fala.includes("amanha"))
     {
        const amanha = new Date();
        amanha.setDate(hoje.getDate()+1);
          return amanha.toISOString().split("T")[0];
     }

      if(fala.includes("depois de amanhã") || fala.includes("depois de amanha"))
     {
        const depoisAmanha = new Date();
        depoisAmanha.setDate(depoisAmanha.getDate()+2);
          return depoisAmanha.toISOString().split("T")[0];
     }

//criar const pra colcoar a expressão
const matchDias = fala.match(/daqui a (\d+) dias/);
if(matchDias){
    // 1= indice 1 (dia) 10 = representa  os numeros inteiros de 0 a 9
    const dias = parseInt(matchDias[1], 10);
    const dataFutura = new Date();
    dataFutura.setData(hoje.getDate() + dias);
    return dataFutura.toISOString().split("T")[0];
}
return "";
}// fim função

export function useVoiceRecognition(){
const [textoOuvido, setTextoOuvido] = useState ("");
const [ouvindo, setOuvindo, setSuportado] = useState(true);
const recognitionRef = useRef(null);
useEffect(()=>{
    //verifica se a api esta disponivel no navegador
if(typeof window !== "undefined"){
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if(SpeechRecognition){
    const recognition = new SpeechRecognition();
    //sem isso, na hr de aperta o mic ele cai mt rapido, isso serve pra ele ficar continuo
    recognition.continuos = true;
    //permitir capturar e processar 
    recognition.interim = true;

    recognition.lang = "pt-BR"
  //EVENTO DISPARA QUANDO O AUDIO É CONVERTIDO EM TEXTO
  recognition.onresult = (event) =>{
    let transcricaoFinal = "";
    //acumula todos os trechos da fala confirmados durante a sessao ativa
    for(let i = event.resultindex; i < event.result.length; i++){
        if(event.results[i].isFinal){
            transcricaoFinal += event.results[i][0].transcript + " ";
        }
    }

    if (transcricaoFinal){
        setTextoOuvido(transcricaoFinal.trim());
    }
  };
  recognition.onerror = (event)=>{
    console.error("Erro no reconhecimento de voz", event.error);
    setOuvindo(false);

  };
  //fim da fala 
  recognition.onend = ()=>{
    setOuvindo(false);
  };

  recognition.current = recognition;
}
else{
    setSuportado(false);
}
}
}, []);
//inicia ou interrompe a gravação (liga/desliga)
const iniciarEscuta = () =>{
    if(!recognitionRef.current) return;
    if(ouvindo){
        //se ja estriver ouvindo o click manual encerra a gravação
        recognitionRef.current.stop();
        setOuvindo(false);
    }
    else{
        //limpa todos ops textos e inici a escuta
        setTextoOuvindo("");
        setOuvindo(true);
        recognitionRef.current.start();
    }
};
//função para parar a grvação manualmente
const pararescuta = ()=>{
    if(recognitionRef.current && ouvindo){
        recognitionRef.current.stop();
           setOuvindo(false);
    }
};
//processa a frase capturada e atualiza o estado correspondente baseado na palavra chave
const processarComandoVoz = (
    fala,
    setTitulo,
    setDescricao,
    usuarios = [],
    handleCheckBoxChange) => {
//expressões regulares
const regexTitulo = /(?:titulo|título)\s+(.+)/i;
const regexDescricao = /(?:descricao|descrição)\s+(.+)/i;
const regexData = /(?:data|data limite|prazo)\s+(.+)/i;
const regexParticipante = /(?:adicionar|participantes|adicionar|excluir)\s+(.+)/i;
     };
}

       
     
