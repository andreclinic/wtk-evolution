import axios from "axios";
import formatNumber from "./Helpres/formatNumber";
// import findOrCreateContactService from "./FindOrCreateContactService";
import mapEvolutionToBaileys from "./Helpres/normalizeEvolutionResponse";

/**
 * Função para enviar uma requisição POST para a Evolutio API 2.0
 * @param {Object} data - Dados a serem enviados no corpo da requisição
 *   Exemplo mínimo: { number: "556296655040", text: "Olá" }
 * @returns {Promise<Object>} - Retorna a resposta da API (já mapeada p/ Baileys)
 */

type data = {
  number: string;
  text: string;
};

export async function sendEvolutionMessage(data: data) {
  const endpoint =
    "https://evo.server4you02.chatsimples.com.br/message/sendText/webinovacaochatwoot";
  const apikey = "E0FEAB056BDC-48C9-BD68-0AADB62DFFE2";

  // console.log(":::::::::::::DATA:::::::::::::", data);

  try {
    // console.log(":::::::::::::PASSOU NA FUNÇÃO:::::::::::::");
    // console.log(data);

    // 1. Verifica e formata o 'number' antes de enviar
    data.number = formatNumber(data.number);

    // console.log("Enviando para:", data.number);

    // 2. Faz a chamada à Evolution
    const response = await axios.post(endpoint, data, {
      headers: {
        apikey: apikey,
        "Content-Type": "application/json"
      }
    });
    // console.log(":::::::::::::RESPONSE:::::::::::::", response);
    // console.log(":::::::::::::RESPONSE:::::::::::::", response.data);
    const normalizeBaieys = mapEvolutionToBaileys(response.data);
    return normalizeBaieys;

    // console.log("Resposta da API:", response.data);

    // 3. Converte a resposta da Evolution para um "fake" WebMessageInfo do Baileys
    // const baileysLikeResponse = mapEvolutionToBaileys(response.data);

    // console.log("Message sent");

    // // 4. Retorna o objeto compatível com o restante do sistema
    // return baileysLikeResponse;
  } catch (error) {
    console.error(
      "Erro ao enviar requisição para Evolutio API:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// const sentMessage = await sendEvolutionMessage({
//   number: ticket.contact.number,
//   text: body
// });

// import { sendEvolutionMessage } from "../../services/EvolutionServices/SendEvolutionMessage";
// import { findGroupByJid } from "../EvolutionServicesHelprs/findGroupbyJid";
