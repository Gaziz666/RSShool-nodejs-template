import { User } from './user.model';

let users: Array<User> = [];
export const usersRepo = {
  getAll: async (): Promise<Array<User>> => users,

  getOne: async (userId: string): Promise<User | undefined> => {
    const user = users.find((item) => item.id === userId);
    return user;
  },

  create: async ({ name, password, login }: User): Promise<User> => {
    const newUser = new User({ name, login, password });
    users.push(newUser);
    return newUser;
  },

  updateOne: async (userId: string, body: User) => {
    const index = users.findIndex((item) => item.id === userId);
    if (index < 0) {
      throw new Error('notFound');
    }
    const keys = Object.keys(body);
    (keys as Array<'name' | 'login' | 'password'>).forEach(
      (key: 'name' | 'login' | 'password') => {
        users[index]![key] = body[key];
      }
    );

    return users[index];
  },

  deleteOne: async (userId: string) => {
    const filteredUsers = users.filter((user) => user.id !== userId);
    if (users.length === filteredUsers.length) {
      throw new Error('notFound');
    }
    users = filteredUsers;
  },
};
