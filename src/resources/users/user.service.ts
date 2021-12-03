import { usersRepo } from './user.repository';

import { User } from './user.model';

export const usersService = {
  getAll: async (): Promise<User[] | []> => {
    const result = await usersRepo.getAll();
    return result;
  },

  getOne: async (userId: string): Promise<User> => {
    const user = await usersRepo.getOne(userId);
    if (!user) throw new Error('notFound');
    return user;
  },

  create: async ({ name, login, password }: User): Promise<Partial<User>> => {
    if (!name || !login || !password) {
      throw new Error('badRequest');
    }
    const user = await usersRepo.create({ name, login, password });
    if (!user) throw new Error('user not created');
    return user;
  },

  updateOne: async (userId: string, body: User): Promise<User> => {
    const user = await usersRepo.updateOne(userId, body);
    if (!user) throw new Error('notFound');
    return user;
  },

  deleteOne: async (userId: string): Promise<void> => {
    const result = await usersRepo.deleteOne(userId);
    if (!result) throw new Error('notFound');
    // await tasksRepo.deleteUserId(userId);
  },
};
