import axios from "axios";

/**
 * Função para obter dados de um grupo específico na Evolution API
 * @param groupJid Ex: "556296655040-1633609599@g.us"
 * @returns Dados do grupo (id, subject, pictureUrl, participants, etc.)
 */
export async function findGroupByJid(groupJid: string) {
  // Sugestão: você pode manter esses valores em variáveis de ambiente (.env) ou em config:
  const EVO_BASE_URL = "https://evo.server4you02.chatsimples.com.br";
  const EVO_INSTANCE = "webinovacaochatwoot";
  const EVO_API_KEY = "E0FEAB056BDC-48C9-BD68-0AADB62DFFE2";
  // Monta a URL com base na URL base + endpoint + instance + query
  const endpoint = `${EVO_BASE_URL}/group/findGroupInfos/${EVO_INSTANCE}?groupJid=${encodeURIComponent(
    groupJid
  )}`;

  try {
    const response = await axios.get(endpoint, {
      headers: {
        apikey: EVO_API_KEY
      }
    });

    return response.data; // objeto contendo { id, subject, participants, ... }
  } catch (error) {
    console.error(
      "Erro ao buscar dados do grupo Evolution:",
      error.response?.data || error.message
    );
    throw error;
  }
}
// import { findGroupByJid } from "../EvolutionServicesHelprs/findGroupbyJid";
