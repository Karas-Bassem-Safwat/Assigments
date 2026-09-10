import { Socket } from "socket.io";

export class ChatGateway {
  register(socket: Socket) {
    socket.on("sendMessage", (data) => {
      console.log({ data });
    });
  }
}

export const chatGateway = new ChatGateway();
 