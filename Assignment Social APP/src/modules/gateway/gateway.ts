import { Server as httpServer } from "http";
import { Server, Socket } from "socket.io";
import redisClient from "../../db/redis.connection";
import { connectedSocketsKey } from "../../utils/redis/redis.service";
import { chatGateway } from "../chat/chat.gateway";

const connectedSockets: Map<string, string[]> = new Map();

export const intializeSocketIo = (httpServer: httpServer) => {
  const io = new Server(httpServer);
  io.use((socket, next) => {
    try {
      socket.handshake.headers.authorization;
      next();
    } catch (error) {
      console.log("error: ", error);
    }
  });

  io.on("connect", (socket: Socket) => {
    registerNewUser(socket);
    socket.on("login_success", (data) => {
      console.log({ data });
    });

    socket.on("disconnect", () => {
      revokeUser(socket);
      console.log("new connection detected ==>", socket.id);
    });

    socket.emit("user_data", socket.user);

    chatGateway.register(socket);
  });
};

const registerNewUser = async (socket: Socket) => {
  let userSockets: string | null | string[] = await redisClient.get(
    connectedSocketsKey(socket.user.id),
  );

  if (userSockets) {
    userSockets = JSON.parse(userSockets);
    await redisClient.set(
      connectedSocketsKey(socket.user.id),
      JSON.stringify([socket.id, ...(userSockets as [])]),
    );
  } else {
    await redisClient.set(
      connectedSocketsKey(socket.user.id),
      JSON.stringify([socket.id]),
    );
  }
};

const revokeUser = async (socket: Socket) => {
  let userSockets = await redisClient.get(connectedSocketsKey(socket.user.id));

  let newUserSockets = JSON.parse(userSockets as string) as string[];

  newUserSockets = newUserSockets.filter((ele) => {
    return ele != socket.id;
  });

  if (newUserSockets.length == 0) {
    await redisClient.del(connectedSocketsKey(socket.id));
  } else {
    await redisClient.set(
      connectedSocketsKey(socket.id),
      JSON.stringify(newUserSockets),
    );
  }
};
