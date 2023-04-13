import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import { ROLES } from '../constants/role.constants.js';
import userModel from '../models/user.model.js';

import { supportHandler } from './support.js';

// import support from './support.js';

const User = userModel;

const authHandler = async (socket, next) => {
  const { token = null } = socket.handshake.auth;
  if (token) {
    const [authType, tokenValue] = token.trim().split(' ');
    if (authType !== 'Bearer' || !tokenValue) {
      return next(new Error('no token'));
    }

    const { secret } = process.env.TOKEN_KEY
    const payload = jwt.verify(tokenValue, secret);
    const id = payload.id.toString();
    const user = await User.findById(id);

    if (!user) {
      return next(new Error('no user found'));
    }

    const u = {
      id,
      role: user?.role,
      isAdmin: user.role === ROLES.ADMIN,
      name: `${user?.firstName} ${user?.lastName}`,
      socketId: socket.id,
      messages: []
    };

    const existingUser = supportHandler.findUserById(id);
    if (!existingUser) {
      supportHandler.users.push(u);
    } else {
      existingUser.socketId = socket.id;
    }
  } else {
    return next(new Error('no token'));
  }

  next();
};

const socket = server => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.use(authHandler);

  const onConnection = socket => {
    supportHandler(io, socket);
  };

  io.on('connection', onConnection);
};

export default socket;
