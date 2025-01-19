import Ticket from "../../models/Ticket";
import FindOrCreateATicketTrackingService from "./FindOrCreateATicketTrackingService";

interface Params {
  contact: any; // O retorno do findOrCreateContactService
  whatsappId: number; // ID do WhatsApp associado à mensagem
  unreadMessages: number; // Contagem de mensagens não lidas
  companyId: number; // ID da empresa associada
}

const FindOrCreateTicketService = async ({
  contact,
  whatsappId,
  unreadMessages,
  companyId
}: Params): Promise<Ticket> => {
  let ticket = await Ticket.findOne({
    where: {
      contactId: contact.id,
      companyId,
      whatsappId,
      status: ["open", "pending"] // Considera apenas tickets abertos ou pendentes
    },
    order: [["updatedAt", "DESC"]] // Ordena pelos mais recentes
  });

  if (ticket) {
    // Atualiza o ticket existente
    await ticket.update({
      unreadMessages,
      whatsappId
    });
  } else {
    // Cria um novo ticket caso não exista
    ticket = await Ticket.create({
      contactId: contact.id,
      status: "pending", // Status inicial
      isGroup: contact.isGroup, // Define se é grupo
      unreadMessages,
      whatsappId,
      companyId
    });

    // Cria ou associa o rastreamento ao ticket
    await FindOrCreateATicketTrackingService({
      ticketId: ticket.id,
      companyId,
      whatsappId
    });
  }

  return ticket;
};

export default FindOrCreateTicketService;
