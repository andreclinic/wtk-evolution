import { getIO } from "../../libs/socket";
import Message from "../../models/Message";

interface MessageData {
  body: string;
  fromMe: boolean;
  read: boolean;
  mediaUrl?: string | null;
  mediaType?: string | null;
  ticketId: number;
  contactId: number;
}

const CreateMessageService = async (
  messageData: MessageData
): Promise<Message> => {
  const { body, fromMe, read, mediaUrl, mediaType, ticketId, contactId } =
    messageData;

  // 1. Cria a mensagem no banco de dados
  const message = await Message.create({
    body,
    fromMe,
    read,
    mediaUrl,
    mediaType,
    ticketId,
    contactId
  });

  // 2. Notifica o frontend via Socket.IO
  const io = getIO();
  io.to(ticketId.toString()).emit("appMessage", {
    action: "create",
    message
  });

  return message;
};

export default CreateMessageService;
