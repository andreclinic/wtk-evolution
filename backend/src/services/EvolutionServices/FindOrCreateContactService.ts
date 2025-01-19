// backend/src/services/ContactServices/FindOrCreateContactService.ts

import Contact from "../../models/Contact";

/**
 * Busca um contato pelo número ou cria um novo se não existir.
 * @param {string} number - Número do contato (formato: "556281762590").
 * @param {number} companyId - ID da empresa.
 * @returns {Promise<Contact>} - O contato encontrado ou criado.
 */
async function findOrCreateContactService(
  number: string,
  companyId: number
): Promise<Contact> {
  try {
    let contact = await Contact.findOne({
      where: { number, companyId }
    });

    if (!contact) {
      // Se o contato não existir, cria um novo
      contact = await Contact.create({
        name: "", // Nome vazio, pode ser atualizado posteriormente
        number,
        companyId
      });
    }

    return contact;
  } catch (error) {
    console.error("Erro ao buscar ou criar contato:", error);
    throw error;
  }
}

export default findOrCreateContactService;
