import { collectionsPath } from '@application/commons/constants';
import fs from './index';

export const RoomService = () => {
  return {
    get: roomId => {
      return fs.collection(collectionsPath.room).doc(roomId);
    },
    create: room => {
      return fs.collection(collectionsPath.room).add(room);
    },
    update: (roomId, room) => {
      return fs.collection(collectionsPath.room).doc(roomId).set(room);
    },
  };
};
