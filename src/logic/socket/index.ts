import { io } from "socket.io-client";

 export const appSocket = io("http://localhost:8000");