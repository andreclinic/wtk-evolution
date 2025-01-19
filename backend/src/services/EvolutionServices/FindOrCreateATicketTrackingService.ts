import TicketTraking from "../../models/TicketTraking";

interface Params {
  ticketId: number;
  companyId: number;
  whatsappId: number;
  userId?: number | null;
}

const FindOrCreateATicketTrackingService = async ({
  ticketId,
  companyId,
  whatsappId,
  userId
}: Params): Promise<TicketTraking> => {
  // Tenta encontrar um rastreamento existente para o ticket
  let ticketTracking = await TicketTraking.findOne({
    where: { ticketId, companyId }
  });

  // Se não encontrou, cria um novo rastreamento
  if (!ticketTracking) {
    ticketTracking = await TicketTraking.create({
      ticketId,
      companyId,
      whatsappId,
      userId: userId || null,
      queuedAt: null,
      startedAt: null,
      finishedAt: null,
      ratingAt: null,
      rated: false
    });
  }

  return ticketTracking;
};

export default FindOrCreateATicketTrackingService;
