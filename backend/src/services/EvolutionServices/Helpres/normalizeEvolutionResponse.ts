function normalizeEvolutionResponse(evolutionResponse) {
  // Ajuste para retornar a estrutura com MessageKey
  const messageKey = {
    MessageKey: {
      remoteJid: evolutionResponse.key.remoteJid,
      fromMe: evolutionResponse.key.fromMe,
      id: evolutionResponse.key.id
    }
  };

  // Simular o formato do Message
  const message = {
    Message: {
      extendedTextMessage: {
        text: evolutionResponse.message.conversation || ""
      }
    }
  };

  // Simular o formato do Timestamp como Long
  const messageTimestamp = {
    low: evolutionResponse.messageTimestamp,
    high: 0,
    unsigned: true
  };

  // Retornar o objeto no formato original esperado
  return {
    messageStubParameters: [],
    labels: [],
    userReceipt: [],
    reactions: [],
    pollUpdates: [],
    eventResponses: [],
    key: messageKey, // Formato corrigido para incluir MessageKey
    message: message,
    messageTimestamp: messageTimestamp,
    status: evolutionResponse.status === "PENDING" ? 1 : 2 // Status mapeado
  };
}

export default normalizeEvolutionResponse;
