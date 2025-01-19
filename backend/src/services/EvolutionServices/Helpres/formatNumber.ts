/**
 * Formata o número para garantir que seja um JID válido.
 *  - Se `number` tiver `"-"` (indicando padrão de grupo) ou terminar com `@g.us`, trata como grupo.
 *  - Senão, trata como contato individual (adiciona `@s.whatsapp.net` se não existir).
 */
function formatNumber(number) {
  if (!number) {
    throw new Error("O campo 'number' é obrigatório.");
  }

  const trimmedNumber = number.trim();

  // Se já tiver @g.us (grupo)
  if (trimmedNumber.endsWith("@g.us")) {
    return trimmedNumber;
  }

  // Detecta se é potencial grupo (ex.: "556296655040-1633609599")
  if (trimmedNumber.includes("-")) {
    // Se contém um hífen, possivelmente é grupo, mas faltou "@g.us"
    return trimmedNumber.replace(/@.*/, "") + "@g.us";
  }

  // Se não é grupo, então é contato individual:
  if (!trimmedNumber.endsWith("@s.whatsapp.net")) {
    // Remove qualquer sufixo estranho e acrescenta o sufixo padrão
    return trimmedNumber.replace(/@.*/, "") + "@s.whatsapp.net";
  }

  return trimmedNumber;
}

export default formatNumber;
